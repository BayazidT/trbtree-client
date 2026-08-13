import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "../../lib/auth/backend";
import type { UserProfile } from "../../types/auth.types";

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching user profile...");
    const accessToken = request.cookies.get("token")?.value;
    console.log("Access Token:", accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: `Not authenticated!!! ${request.cookies}` },
        { status: 401 }
      );
    }

    const response = await backendFetch("public/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to retrieve profile" },
        { status: response.status }
      );
    }

    const profile: UserProfile = await response.json();

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile error:", error);

    return NextResponse.json(
      { message: "Authentication service unavailable" },
      { status: 500 }
    );
  }
}