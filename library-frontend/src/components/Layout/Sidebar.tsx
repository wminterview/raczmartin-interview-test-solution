import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full
          w-3/4 lg:w-1/5 flex-shrink-0
          bg-white shadow-lg lg:shadow-none
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-50
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>

        <div className="p-4 mt-10 lg:mt-4">
          <ul className="space-y-3">
            <li
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleNavigate("/")}
            >
              Dashboard
            </li>
            <li
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleNavigate("/books")}
            >
              Books
            </li>
            <li
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleNavigate("/books/new")}
            >
              Create new book
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
