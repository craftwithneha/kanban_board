import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import DraggableCard from "./DragableCard";
import { initialData } from "../data/initials";
import { Star } from "lucide-react";
import type { Columns, Task } from "../types/types";

const fixTaskTag = (task: Omit<Task, 'tag'> & { tag: string }): Task => ({
  ...task,
  tag: ["Important", "High Priority", "OK", "Processing"].includes(task.tag)
    ? (task.tag as "Important" | "High Priority" | "OK" | "Processing")
    : "Important"
});

const fixedInitialColumns: Columns = Object.fromEntries(
  Object.entries(initialData.columns).map(([colId, col]) => [
    colId,
    {
      ...col,
      items: col.items.map(fixTaskTag)
    }
  ])
);

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(fixedInitialColumns);

  const handleAddTask = (columnId: keyof Columns, task: Task) => {
    console.log("handleAddTask called", columnId, task);
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, task],
      },
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = Object.entries(columns).find(([, col]) =>
      col.items.find((item) => item.id === active.id)
    );
    const toColumnId = over.id as keyof Columns; // ✅ fixed

    if (!fromColumn) return;

    const [fromColumnId, fromCol] = fromColumn;
    const movingItem = fromCol.items.find((item) => item.id === active.id);
    if (!movingItem || fromColumnId === toColumnId) return;

    setColumns((prev) => {
      const newFromItems = fromCol.items.filter(
        (item) => item.id !== active.id
      );
      const newToItems = [...prev[toColumnId].items, movingItem];

      return {
        ...prev,
        [fromColumnId]: { ...fromCol, items: newFromItems },
        [toColumnId]: { ...prev[toColumnId], items: newToItems },
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 p-4 flex items-center gap-2">
          Kanban board <Star className="w-4 h-4 text-gray-600 " />
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              id={columnId}
              title={column.title}
              onAddTask={(task) => handleAddTask(columnId as keyof Columns, task)}
            >
              {column.items.map((item, i) => {
                const safeTag: "Important" | "High Priority" | "OK" | "Processing" | undefined =
                  ["Important", "High Priority", "OK", "Processing"].includes(item.tag as string)
                    ? (item.tag as "Important" | "High Priority" | "OK" | "Processing")
                    : undefined;
                return (
                  <DraggableCard
                    key={item.id}
                    item={{ ...item, tag: safeTag, index: i }}
                    columnId={columnId}
                  />
                );
              })}
            </Column>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
