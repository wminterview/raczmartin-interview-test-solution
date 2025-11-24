/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as api from "../services/api";
import type { User } from "../types";

function setTokenCookie(
  token: string | null,
  maxAgeSeconds = 7 * 24 * 60 * 60
) {
  if (typeof document === "undefined") return;
  if (!token) {
    // expire cookie
    document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax`;
  } else {
    document.cookie = `token=${encodeURIComponent(
      token
    )}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
  }
}

function decodeJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    // base64url -> base64
    const b = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(b);
    return JSON.parse(json);
  } catch (e: any) {
    return null;
  }
}

export function useAuth() {
  function getInitialUser() {
    try {
      const raw = localStorage.getItem("user");
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }

    try {
      const token = api.getToken();
      if (!token) return null;
      const payload = decodeJwt(token);
      if (payload)
        return { id: payload.id, email: payload.email, role: payload.role };
    } catch {
      /* ignore */
    }
    return null;
  }

  const [user, setUser] = useState<User | null>(getInitialUser);

  const login = async (email: string, password: string) => {
    const res = await api.postJSON("/auth/login", { email, password });
    if (res?.data?.token) {
      const token = res.data.token;
      try {
        localStorage.setItem("token", token);
      } catch {
        /* ignore storage errors */
      }
      setTokenCookie(token);
      setUser(res.data.user);
      try {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch {
        /* ignore storage errors */
      }
    }
    return res;
  };

  const register = async (payload: any) => {
    const res = await api.postJSON("/auth/register", payload);
    if (res?.data?.token) {
      const token = res.data.token;
      try {
        localStorage.setItem("token", token);
      } catch {
        /* ignore storage errors */
      }
      setTokenCookie(token);
      setUser(res.data.user);
      try {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch {
        /* ignore storage errors */
      }
    }
    return res;
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
    } catch {
      /* ignore storage errors */
    }
    try {
      localStorage.removeItem("user");
    } catch {
      /* ignore storage errors */
    }
    setTokenCookie(null);
    setUser(null);
  };

  return { user, login, register, logout };
}
