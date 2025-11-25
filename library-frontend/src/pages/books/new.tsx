import type { FormValues } from "../../types";
import AuthLayout from "../../layouts/AuthLayout";
import BookForm from "../../components/Books/BookForm";
import { useCreateBook } from "../../hooks/useBooks";

export default function NewBookPage() {
  const createBookMutation = useCreateBook();

  const onSubmit = async (values: FormValues) => {
    createBookMutation.mutate(values);
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
