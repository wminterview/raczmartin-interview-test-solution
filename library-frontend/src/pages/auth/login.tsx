/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../components/UI/Input";
import { useAuth } from "../../hooks/useAuth";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage({
  navigate,
}: {
  navigate?: (to: string) => void;
}) {
  const auth = useAuth();
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      await auth.login(values.email, values.password);
      toast.success("Welcome back!");
      if (navigate) navigate("/");
    } catch (e: any) {
      toast.error(e?.message || String(e) || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          placeholder="you@example.com"
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••"
          {...register("password", { required: "Password is required" })}
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Signing in..." : "Sign in"}
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (navigate) navigate("/auth/register");
            }}
            className="text-sm text-blue-600"
          >
            Create account
          </a>
        </div>
      </form>
    </div>
  );
}
