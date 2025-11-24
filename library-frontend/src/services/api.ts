/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )token=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function getToken() {
  // prefer cookie token, fallback to localStorage
  const cookie = getTokenFromCookie();
  if (cookie) return cookie;
  try {
    return localStorage.getItem("token");
  } catch (e: any) {
    return null;
  }
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleRes(res: Response) {
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e: any) {
    /* non-json */
  }
  if (!res.ok) {
    const message = data?.error?.message || data?.message || res.statusText;
    throw new Error(message);
  }
  return data;
}

export async function getJSON(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers: { ...authHeaders() } });
  return handleRes(res);
}

export async function postJSON(path: string, body: any) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  return handleRes(res);
}

export async function putJSON(path: string, body: any) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  return handleRes(res);
}

export async function deleteJSON(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}
