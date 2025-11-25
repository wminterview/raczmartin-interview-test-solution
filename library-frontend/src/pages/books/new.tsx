/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import toast from "react-hot-toast";
import { createBook } from "../../hooks/useBooks";
import type { FormValues } from "../../types";
import AuthLayout from "../../layouts/AuthLayout";
import BookForm from "../../components/Books/BookForm";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NewBookPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createBookMutatin = useMutation({
    mutationFn: (values: FormValues) =>
      createBook({ ...values, year: Number(values.year) }),
    onSuccess: () => {
      toast.success("Book created");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/books");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create book");
    },
  });

  const onSubmit = async (values: FormValues) => {
    createBookMutatin.mutate(values);
  };

  return (
    <AuthLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
        <BookForm onSubmit={onSubmit} initial={null} />
      </div>
    </AuthLayout>
  );
}
