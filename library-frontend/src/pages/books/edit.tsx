/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "../../layouts/AuthLayout";
import { useParams } from "react-router-dom";
import type { FormValues } from "../../types";
import BookForm from "../../components/Books/BookForm";
import { useBook, useUpdateBook } from "../../hooks/useBooks";

export default function EditBookPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { data: book, isLoading, isError, error } = useBook(id as string);

  const updateMutation = useUpdateBook(id as string);

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
