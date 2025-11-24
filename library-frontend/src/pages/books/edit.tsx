import React, { useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../../hooks/useBooks";
import type { Book, FormValues } from "../../types";
import toast from "react-hot-toast";
import BookForm from "../../components/Books/BookForm";

export default function EditBookPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getBook(id as string)
      .then((res) => {
        const payload = res?.data?.book ?? res?.book ?? res?.data ?? res;
        if (!cancelled) setBook(payload || null);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateBook(String(book?.id), {
        ...values,
        year: Number(values.year),
      });
      toast.success("Book edited");
      if (navigate) navigate("/books");
    } catch (e: any) {
      toast.error(e?.message || String(e) || "Failed to edit book");
    }
  };

  if (!book) {
    return (
      <AuthLayout>
        <div className="p-4">
          {loading && <div>Loading book data...</div>}
          {error && (
            <div className="text-red-600">Error loading book: {error}</div>
          )}
          {!loading && !error && (
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
