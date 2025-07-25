import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import React from "react";
import type { Task } from "../types/types.ts";

type ColumnProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  onAddTask?: (task: Task) => void;
};

export default function Column({ id, title, children, onAddTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  const [adding, setAdding] = useState(false);
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    date: "",
    tag: "Important",
    avatars: ["/avatars/avatar.png"],
    linkedin: "",
    comments: 0
  });

  const handleSubmit = () => {
    console.log("handleSubmit called", task, onAddTask);
    if (!task.title) return;

    onAddTask?.({
      ...task,
      id: Date.now().toString(),
      tag: task.tag || "Important",
      avatars: task.avatars && task.avatars.length > 0 ? task.avatars : ["/avatars/avatar.png"],
      linkedin: task.linkedin || "",
      comments: typeof task.comments === "number" ? task.comments : 0
    });

    setTask({ id: "", title: "", description: "", date: "", tag: "Important", avatars: ["/avatars/avatar.png"], linkedin: "", comments: 0 });
    setAdding(false);
  };

  return (
    <div className="w-full sm:w-1/3 px-2">
      <div className="bg-gray-100 rounded-xl p-4 min-h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
  {title} ({React.Children.count(children)})
</h2>

          
          <button onClick={() => setAdding(!adding)} className="text-gray-900 bg-blue-200 p-2 rounded-2xl cursor-pointer">
            <Plus className="w-5 h-5" />
          </button>
        </div>

       {adding && (
  <div
    className="mb-4 bg-white p-4 rounded-lg shadow-sm text-sm ring-1 ring-gray-200 border-gray-200 animate-fade-in space-y-2"
    style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}
  >
    <input
      placeholder="Project Name"
      className="w-full  border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
      value={task.title}
      onChange={(e) => setTask({ ...task, title: e.target.value })}
    />
    <textarea
      placeholder="Description"
      className="w-full border border-gray-300 p-2 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
      rows={2}
      value={task.description}
      onChange={(e) => setTask({ ...task, description: e.target.value })}
    />
    <input
      type="date"
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
      value={task.date}
      onChange={(e) => setTask({ ...task, date: e.target.value })}
    />

    <div className="flex gap-4 py-2">
      <button
        className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium"
        style={{ pointerEvents: "auto" }}
        onClick={handleSubmit}
      >
        Add Task
      </button>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
        onClick={() => {
          setAdding(false);
          setTask({ id: "", title: "", description: "", date: "", tag: "Important", avatars: ["/avatars/avatar.png"], linkedin: "", comments: 0 });
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}


        <div ref={setNodeRef} className="space-y-4 min-h-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
}
