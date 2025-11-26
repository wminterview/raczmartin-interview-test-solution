import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { validate } from "../lib/auth"; // your validate API function
import type { AuthResponse } from "../types";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();

  // useQuery to validate the user
  const { data, isLoading, isError } = useQuery<AuthResponse>({
    queryKey: ["auth", "validate"],
    queryFn: validate,
    retry: false, // don't retry on failure
  });

  useEffect(() => {
    if (!isLoading) {
      if (isError || !data?.data?.user) {
        navigate("/auth/login", { replace: true });
      }
    }
  }, [isLoading, isError, data, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // or a fancy spinner
  }

  return <>{children}</>;
}
