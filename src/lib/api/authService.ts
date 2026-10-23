// src/lib/api/authService.ts
import { apiClient } from "./client";

const TOKEN_KEY = "brinto_token";
const USER_KEY = "brinto_user";
const LEGACY_STORAGE_KEY = "brinto_auth";

export interface BrintoUser {
  _id?: string;
  name?: string;
  user_name?: string;
  phone?: string;
  email?: string;
  role?: string | string[];
  user_id?: string;
  status?: number;
  id?: string;
  login_platform?: string;
}

export interface AuthState {
  user: BrintoUser;
  token: string;
}

/**
 * Authenticates a user by mobile number directly with the Brinto API using apiClient.
 */
export async function loginWithMobile(mobile: string): Promise<AuthState | null> {
  try {
    const json = await apiClient("/api/users/auth-mobile", {
      method: "POST",
      body: JSON.stringify({
        mobile,
        isInputMobile: false,
        login_platform: "web",
      }),
    });

    if (json?.success && json?.data) {
      const user: BrintoUser = json.data.user || json.data;
      const token: string = json.data.token || json.token || "";
      return { user, token };
    }
    return null;
  } catch (err) {
    console.error("loginWithMobile error:", err);
    return null;
  }
}

/** Backward-compatible alias for loginWithMobile */
export const fetchBrintoUser = loginWithMobile;

export function saveAuth(state: AuthState) {
  try {
    localStorage.setItem(TOKEN_KEY, state.token ?? "");
    localStorage.setItem(USER_KEY, JSON.stringify(state.user ?? {}));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("brinto:auth-changed"));
    }
  } catch (err) {
    console.error("saveAuth error:", err);
  }
}

export function getAuth(): AuthState | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);
    if (userRaw) {
      return {
        user: JSON.parse(userRaw) as BrintoUser,
        token: token ?? "",
      };
    }
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AuthState;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("brinto:auth-changed"));
    }
  } catch (err) {
    console.error("clearAuth error:", err);
  }
}

export function isLoggedIn(): boolean {
  return getAuth() !== null;
}
