// src/lib/authService.ts

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

const AUTH_MOBILE_URL = "https://brintoapi.brinto.in/api/users/auth-mobile";

/**
 * Authenticates a user by mobile number directly with the Brinto API.
 */
export async function loginWithMobile(mobile: string): Promise<AuthState | null> {
  try {
    const res = await fetch(AUTH_MOBILE_URL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        isInputMobile: false,
        login_platform: "web",
      }),
    });

    const json = await res.json();
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
    // Save legacy key for backward compatibility
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
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
  } catch (err) {
    console.error("clearAuth error:", err);
  }
}

export function isLoggedIn(): boolean {
  return getAuth() !== null;
}
