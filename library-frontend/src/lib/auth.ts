import { getJSON, postJSON } from "../services/api";
import type { AuthResponse } from "../types";

export interface LoginBody {
  email: string;
  password: string;
}

export interface SignupBody {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export async function login(data: LoginBody): Promise<AuthResponse> {
  return postJSON("/auth/login", data);
}

export async function signup(data: SignupBody): Promise<AuthResponse> {
  return postJSON("/auth/register", data);
}

export async function validate(): Promise<AuthResponse> {
  return getJSON("/auth/validate");
}

export async function logout(): Promise<{ success: boolean }> {
  return postJSON("/auth/logout", {});
}
