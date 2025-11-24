/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import toast from "react-hot-toast";
import { createBook } from "../../hooks/useBooks";
import type { FormValues } from "../../types";
import AuthLayout from "../../layouts/AuthLayout";
import BookForm from "../../components/Books/BookForm";
import { useNavigate } from "react-router-dom";

export default function NewBookPage() {
  const navigate = useNavigate();
  const onSubmit = async (values: FormValues) => {
    try {
      await createBook({ ...values, year: Number(values.year) });
      toast.success("Book created");
      if (navigate) navigate("/books");
    } catch (e: any) {
      toast.error(e?.message || String(e) || "Failed to create book");
    }
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
