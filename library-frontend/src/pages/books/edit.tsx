/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../../hooks/useBooks";
import type { FormValues } from "../../types";
import toast from "react-hot-toast";
import BookForm from "../../components/Books/BookForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function EditBookPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await getBook(id!);
      return res?.data?.book ?? res?.book ?? res?.data ?? res ?? null;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (values: FormValues) =>
      updateBook(String(book?.id), {
        ...values,
        year: Number(values.year),
      }),

    onSuccess: () => {
      toast.success("Book updated");

      // refresh cached book + books list
      queryClient.invalidateQueries({ queryKey: ["book", id] });
      queryClient.invalidateQueries({ queryKey: ["books"] });

      navigate("/books");
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to edit book");
    },
  });

  const onSubmit = (values: FormValues) => {
    updateMutation.mutate(values);
  };

  if (!book) {
    return (
      <AuthLayout>
        <div className="p-4">
          {isLoading && <div>Loading book data...</div>}
          {isError && (
            <div className="text-red-600">
              Error loading book: {String(error)}
            </div>
          )}
          {!isLoading && !error && (
            <div className="text-gray-600">No book found for this id.</div>
          )}
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Book {book.title}</h2>
        <BookForm onSubmit={onSubmit} initial={book} />
      </div>
    </AuthLayout>
  );
}
