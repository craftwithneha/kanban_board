import { MessageCircle, Linkedin, Github } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  linkedin?: string;
  github?: string;
  tag?: "Important" | "High Priority" | "OK" | "Processing";
  avatars?: string[];
  comments?: number;
};
const tagStyles: Record<string, string> = {
  Important: "bg-yellow-200 text-yellow-800",
  "High Priority": "bg-red-100 text-red-700",
  OK: "bg-blue-100 text-gray-700",
  Processing: "bg-green-100 text-white-600",
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="relative bg-white rounded p-4 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition cursor-grab">
      {/* Tag */}
     {task.tag && (
  <span
    className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block ${
      tagStyles[task.tag] || "bg-gray-100 text-gray-600"
    }`}
  >
    {task.tag}
  </span>
)}


      {/* Title */}
      <h3 className="font-semibold text-sm text-gray-800">{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center">
        {/* Avatars + Links */}
        <div className="flex items-center gap-2">
          {task.avatars?.slice(0, 1).map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-6 h-6 rounded-full border object-cover"
            />
          ))}
          {task.linkedin && (
            <a href={task.linkedin} target="_blank">
              <Linkedin className="w-4 h-4 text-blue-600 hover:text-blue-800" />
            </a>
          )}
          {task.github && (
            <a href={task.github} target="_blank">
              <Github className="w-4 h-4 text-gray-800 hover:text-black" />
            </a>
          )}
        </div>

        {/* Comments + Date */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {task.date && <span>{task.date}</span>}
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {task.comments ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
