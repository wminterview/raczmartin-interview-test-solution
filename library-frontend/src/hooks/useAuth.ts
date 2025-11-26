import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthResponse } from "../types";
import {
  login,
  logout,
  signup,
  validate,
  type LoginBody,
  type SignupBody,
} from "../lib/auth";
import { useAuthContext } from "../context/AuthContext";
import { setApiAccessToken } from "../services/api";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setAccessToken } = useAuthContext();

  return useMutation<AuthResponse, Error, LoginBody>({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data.data);
      setAccessToken(data.data.token);
      setApiAccessToken(data.data.token);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const { setAccessToken } = useAuthContext();

  return useMutation<AuthResponse, Error, SignupBody>({
    mutationFn: signup,
    onSuccess: (data) => {
      // store user+token in query cache
      queryClient.setQueryData(["auth"], data.data);
      setAccessToken(data.data.token);
      setApiAccessToken(data.data.token);
    },
  });
}

export function useValidate() {
  const { setAccessToken } = useAuthContext();

  return useQuery<AuthResponse, Error>({
    queryKey: ["auth"],
    queryFn: async () => {
      const data = await validate();
      setAccessToken(data.data.token);
      setApiAccessToken(data.data.token);

      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { setAccessToken } = useAuthContext();

  return useMutation<{ success: boolean }, Error>({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
      setApiAccessToken(null);
      queryClient.setQueryData(["auth"], null);
    },
  });
}
