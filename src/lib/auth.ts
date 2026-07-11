const STORAGE_KEY = "brinto_auth";

export interface BrintoUser {
  _id?: string;
  user_name?: string;
  phone?: string;
  email?: string;
  role?: string;
  user_id?: string;
  status?: number;
  id?: string;
}

export interface AuthState {
  user: BrintoUser;
  token: string;
}

const AUTH_API = "https://api.brinto.in/user/auth-mobile";

/** Calls the Brinto auth-mobile API for a 10-digit mobile number. */
export async function fetchBrintoUser(mobile: string): Promise<AuthState | null> {
  try {
    const res = await fetch(AUTH_API, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "*/*" },
      body: JSON.stringify({ mobile, isInputMobile: false }),
    });
    const json = await res.json();
    if (json?.success && json?.data?.user) {
      return { user: json.data.user as BrintoUser, token: json.data.token ?? "" };
    }
    return null;
  } catch (err) {
    console.log("[v0] auth-mobile fetch error:", err);
    return null;
  }
}

export function saveAuth(state: AuthState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.log("[v0] saveAuth error:", err);
  }
}

export function getAuth(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.log("[v0] clearAuth error:", err);
  }
}

export function isLoggedIn(): boolean {
  return getAuth() !== null;
}
