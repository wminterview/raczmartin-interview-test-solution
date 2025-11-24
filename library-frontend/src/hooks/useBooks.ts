import { useEffect, useState } from "react";
import type { Book, BooksResponse } from "../types";
import * as api from "../services/api";

export function useBooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .getJSON("/books")
      .then((res) => setBooks(res.data?.books || res))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  return {
    books,
    loading,
    error,
    refresh: async () => {
      setLoading(true);
      try {
        const res = await api.getJSON("/books");
        setBooks(res.data?.books || res);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    },
  };
}

export async function getBook(id: string) {
  return api.getJSON(`/books/${id}`);
}

export async function getBooks(params?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<BooksResponse> {
  const qs = new URLSearchParams();
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return api.getJSON(`/books/${suffix}`);
}

export async function createBook(data: Partial<Book>) {
  return api.postJSON("/books", data);
}

export async function updateBook(id: string, data: Partial<Book>) {
  return api.putJSON(`/books/${id}`, data);
}

export async function deleteBook(id: string) {
  return api.deleteJSON(`/books/${id}`);
}
