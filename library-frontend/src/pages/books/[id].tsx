/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Book } from "../../types";
import { deleteBook, getBook } from "../../hooks/useBooks";
import toast from "react-hot-toast";
import Button from "../../components/UI/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function BookDetailsPage({
  id,
  navigate,
}: {
  id: string;
  navigate: (to: string) => void;
}) {
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery<Book | null>({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await getBook(id);
      return res?.data?.book ?? res?.book ?? res?.data ?? res ?? null;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => deleteBook(id),
    onSuccess: () => {
      toast.success("Book deleted");

      // Refresh books list
      queryClient.invalidateQueries({ queryKey: ["books"] });

      navigate("/books");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete book");
    },
  });

  if (isLoading)
    return (
      <div className="p-6">
        <div className="text-gray-600">Loading book...</div>
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-red-600">
        Error loading book: {String(error)}
      </div>
    );

  if (!book)
    return <div className="p-6 text-gray-600">No book found for this id.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded shadow p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-1">{book.title}</h1>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <p className="text-sm text-gray-500">{book.category}</p>
          </div>

          <div className="text-right">
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                book.available
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {book.available ? "Available" : "Not Available"}
            </div>
          </div>
        </div>

        {book.isbn && (
          <p className="mt-4 text-sm text-gray-700">
            <strong>ISBN:</strong> {book.isbn}
          </p>
        )}

        {book.year && (
          <p className="mt-1 text-sm text-gray-700">
            <strong>Year:</strong> {book.year}
          </p>
        )}

        {book.description && (
          <div className="mt-4 text-gray-700 whitespace-pre-wrap">
            {book.description}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate("/books")}
          >
            Back
          </Button>

          <Button
            variant="danger"
            size="md"
            disabled={deleteMutation.isPending}
            onClick={async () => {
              const ok = window.confirm(
                "Delete this book? This cannot be undone."
              );
              if (!ok) return;
              deleteMutation.mutate();
            }}
          >
            Delete
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/books/edit/${book.id}`)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
