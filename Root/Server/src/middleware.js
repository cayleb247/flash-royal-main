import { NextResponse } from "next/server";
import { authenticated } from "@/controllers/auth.js";

const protectedRoutes = ["/menu"];

export async function middleware(req) {
  if (!protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const isAuth = await authenticated(req);

  if (isAuth) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}
