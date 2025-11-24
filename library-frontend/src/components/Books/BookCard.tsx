import React from "react";
import type { Book } from "../../types";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/books/${id}`);
  };

  return (
    <div
      key={book.id}
      className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col shrink-0 min-w-0 cursor-pointer"
      onClick={() => handleClick(book.id)}
    >
      <h2 className="text-lg font-semibold truncate">{book.title}</h2>
      <p className="text-gray-600 text-sm truncate">{book.author}</p>
      <p className="text-gray-500 text-sm">{book.category}</p>
      <p
        className={`mt-2 font-semibold ${
          book.available ? "text-green-600" : "text-red-600"
        }`}
      >
        {book.available ? "Available" : "Not Available"}
      </p>
    </div>
  );
}
