import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../components/UI/Input";
import { useAuth } from "../../hooks/useAuth";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage({
  navigate,
}: {
  navigate?: (to: string) => void;
}) {
  const auth = useAuth();
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      await auth.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success("Account created");
      if (navigate) navigate("/");
    } catch (e: any) {
      toast.error(e?.message || String(e) || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          {...register("name", { required: "Name is required" })}
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Creating..." : "Create account"}
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (navigate) navigate("/auth/login");
            }}
            className="text-sm text-blue-600"
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}
