/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
let ACCESS_TOKEN: string | null = null;

export function setApiAccessToken(token: string | null) {
  ACCESS_TOKEN = token;
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
  const headers: HeadersInit = {};
  if (ACCESS_TOKEN) headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers,
    credentials: "include",
  });
  return handleRes(res);
}

export async function postJSON(path: string, body: any) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (ACCESS_TOKEN) headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
  console.log(ACCESS_TOKEN);
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    credentials: "include",
  });
  return handleRes(res);
}

export async function putJSON(path: string, body: any) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (ACCESS_TOKEN) headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
    credentials: "include",
  });
  return handleRes(res);
}

export async function deleteJSON(path: string) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (ACCESS_TOKEN) headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });
  return handleRes(res);
}
