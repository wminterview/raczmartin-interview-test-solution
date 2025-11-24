import React from "react";
import { categories, type Book, type FormValues } from "../../types";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";

export default function BookForm({
  onSubmit,
  initial,
}: {
  onSubmit: (values: FormValues) => void;
  initial: Book | null;
}) {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      category: initial?.category || "Fiction",
      year: initial?.year || new Date().getFullYear(),
      title: initial?.title || "",
      author: initial?.author || "",
      isbn: initial?.isbn || "",
      description: initial?.description || "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        placeholder="Book title"
        {...register("title", { required: true })}
      />
      <Input
        label="Author"
        placeholder="Author name"
        {...register("author", { required: true })}
      />
      <Input label="ISBN" placeholder="ISBN" {...register("isbn")} />
      <Input
        label="Year"
        type="number"
        {...register("year", { valueAsNumber: true })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          {...register("category")}
          className="block w-full rounded-md border-gray-200 px-3 py-2 bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          className="block w-full rounded-md border-gray-200 px-3 py-2 min-h-[120px] bg-white"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting
            ? "Saving..."
            : initial
            ? "Edit Book"
            : "Create Book"}
        </button>
      </div>
    </form>
  );
}
