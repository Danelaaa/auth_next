import bcrypt from "bcryptjs";
import { getNextId,getUsers, saveUsers } from "@/lib/users";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
  }

  const users = getUsers();
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return new Response(JSON.stringify({ error: "Email already registered" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: getNextId(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  return new Response(JSON.stringify({ message: "Registration successful" }), { status: 201 });
}
