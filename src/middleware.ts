import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { firebaseConfig } from "@/shared/config/firebase";

const PUBLIC_PATHS = ["/register", "/login", "/reset"];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: firebaseConfig.apiKey,
    cookieName: "AuthToken",
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to 'true' on https environments
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24,
    },
    cookieSignatureKeys: ["secret1", "secret2"],
    serviceAccount: {
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL!,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    },
    handleValidToken: async ({}, headers) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }
      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
