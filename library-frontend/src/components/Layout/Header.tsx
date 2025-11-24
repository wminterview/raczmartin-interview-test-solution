import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white px-6 py-3 flex items-center justify-between">
      {/* Mobile hamburger */}
      <button className="lg:hidden p-2 mr-3" onClick={toggleSidebar}>
        <Menu size={28} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-800">MyLibrary</span>
      </div>
    </header>
  );
}
