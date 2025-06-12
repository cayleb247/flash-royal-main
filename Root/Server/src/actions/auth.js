"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PrismaClient } from "@/generated/prisma/";
import { PrismaD1 } from "@prisma/adapter-d1";

export async function authenticate() {
  const cookieStore = await cookies();

  const adapter = new PrismaD1(env.DB);
  const prisma = new PrismaClient({ adapter });

  const users = await prisma.user.findMany();

  console.log(users);

  cookieStore.set({
    name: "token",
    value: "test",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 2, // 2 days
    path: "/",
  });

  redirect("/menu");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  redirect("/login");
}
