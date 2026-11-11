import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminCredentials, createAdminSession, ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body as { username?: string; password?: string };

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const { username: expectedUsername, password: expectedPassword } = await adminCredentials();

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const sessionValue = await createAdminSession();

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 500 },
    );
  }
}
