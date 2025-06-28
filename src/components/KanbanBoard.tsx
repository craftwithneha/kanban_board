import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import DraggableCard from "./DragableCard";
import { initialData } from "../data/initials";
import { Star } from "lucide-react";

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData.columns);

  const handleAddTask = (columnId: string, task: unknown) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, task],
      },
    }));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = Object.entries(columns).find(([_, col]) =>
      col.items.find((item) => item.id === active.id)
    );
    const toColumnId = over.id;

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
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2" >
          Kanban board <Star className="w-4 h-4 text-gray-600 " />
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              id={columnId}
              title={column.title}
              onAddTask={(task) => handleAddTask(columnId, task)}
            >
              {column.items.map((item, i) => (
                <DraggableCard
                  key={item.id}
                  item={{ ...item, index: i }}
                  columnId={columnId}
                />
              ))}
            </Column>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
