import { Lock, Bell, Search, Settings, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-12 py-6 ring-1 ring-gray-200">
      <div className="text-4xl font-bold">Kanban</div>
      <div className="flex-1 max-w-md mx-4 relative">
        <input
          type="text"
          placeholder="Try searching tasks"
          className="w-full pl-10 pr-4 py-2 rounded-xl   bg-gray-100  outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
      <div className="flex items-center gap-5">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm cursor-pointer">
          <Lock className="w-4 h-4" />
          Share
        </button>
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer"/>
        <User className="w-5 h-5 text-gray-600 cursor-pointer"/>
      </div>
    </header>
  );
}
