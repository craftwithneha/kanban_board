// DraggableCard.tsx
import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function DraggableCard({ item, columnId }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: { item, columnId },
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="touch-none"
    >
      <TaskCard task={item} />
    </div>
  );
}
