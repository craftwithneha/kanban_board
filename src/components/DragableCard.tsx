// DraggableCard.tsx
import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

type DraggableCardProps = {
  item: {
    id: string;
    title: string;
    description?: string;
    date?: string;
    linkedin?: string;
    github?: string;
    tag?: "Important" | "High Priority" | "OK" | "Processing";
    avatars?: string[];
    comments?: number;
    index: number;
  };
  columnId: string;
};

export default function DraggableCard({ item, columnId }: DraggableCardProps) {
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
