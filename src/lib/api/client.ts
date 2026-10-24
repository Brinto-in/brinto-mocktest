// src/lib/api/client.ts

export const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta.env.PUBLIC_API_BASE || import.meta.env.PUBLIC_API_BASE_URL || import.meta.env.API_BASE)) ||
  "https://brintoapi.brinto.in";

console.log(`🔌 Connected to API base: ${API_BASE}`);

export function getAuthToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("brinto_token") || "";
  }
  return "";
}

export function getGuestId(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("brinto_guest_id") || "";
  }
  return "";
}

export interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Reusable HTTP client that handles base URL, JSON headers, Authorization Bearer token,
 * and X-Guest-Id header automatically.
 */
export async function apiClient<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = getAuthToken()?.trim();
  const guestId = getGuestId()?.trim();

  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete headers["Authorization"];
  }

  if (guestId) {
    headers["X-Guest-Id"] = guestId;
  } else {
    delete headers["X-Guest-Id"];
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`API error (${res.status}): ${errorText || res.statusText}`);
  }

  const json = await res.json();
  return json;
}
