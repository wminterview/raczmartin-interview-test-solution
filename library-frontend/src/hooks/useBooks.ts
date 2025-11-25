import type { Book, BooksResponseData, FormValues } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../lib/books";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useBooks(page?: number, limit?: number, search?: string) {
  return useQuery<BooksResponseData>({
    queryKey: ["books", page, search],
    queryFn: async () => {
      const res = await getBooks({ page, limit, search });
      return res.data;
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
  });
}

export function useBook(id: string) {
  return useQuery<Book | null>({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing book ID");
      const res = await getBook(id);
      return res?.data?.book ?? res?.book ?? res?.data ?? res ?? null;
    },
    enabled: !!id,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: FormValues) =>
      createBook({ ...values, year: Number(values.year) }),
    onSuccess: () => {
      toast.success("Book created");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/books");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error) || "Failed to create book");
      }
    },
  });
}

export function useUpdateBook(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: FormValues) =>
      updateBook(id, {
        ...values,
        year: Number(values.year),
      }),

    onSuccess: () => {
      toast.success("Book updated");

      queryClient.invalidateQueries({ queryKey: ["book", id] });
      queryClient.invalidateQueries({ queryKey: ["books"] });

      navigate("/books");
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error) || "Failed to create book");
      }
    },
  });
}

export function useDeleteBook(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => deleteBook(id),
    onSuccess: () => {
      toast.success("Book deleted");

      queryClient.invalidateQueries({ queryKey: ["books"] });

      navigate("/books");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error) || "Failed to create book");
      }
    },
  });
}
