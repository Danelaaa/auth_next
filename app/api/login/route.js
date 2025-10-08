import bcrypt from "bcryptjs";
import { getUsers } from "@/lib/users";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 400 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 400 });
  }

  const token = generateToken(user);

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
}
