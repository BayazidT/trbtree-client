import { NextResponse, NextRequest } from "next/server";
import { backendFetch } from "@/app/lib/auth/backend";
import { AuthResponse } from "@/app/types/auth.types";
import { useAuthStore } from "@/app/stores/auth-store";

export async function POST(req: NextRequest) {

  // const { loadUser } = useAuthStore();
  const body = await req.json();

  const backendRes = await backendFetch(
    "public/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const data = await backendRes.json();

  // assuming backend returns: { token: "..." }
  const token = data.accessToken;

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  res.cookies.set("refresh_token", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    // path: "/auth/"
    // maxAge: Math.floor(data.expiresIn / 1000),
  } );

  return res;
}