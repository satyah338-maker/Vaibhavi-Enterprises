import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "ve_admin_session";

export function getSessionToken(): string {
  return process.env.ADMIN_SESSION_TOKEN || "vaibhavi-admin-session-change-me";
}

export async function getAdminSession(): Promise<{ valid: boolean }> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return { valid: value === getSessionToken() };
}

export async function createAdminSession(): Promise<string> {
  return getSessionToken();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session.valid === true;
}

export function adminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123",
  };
}
