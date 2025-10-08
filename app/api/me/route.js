import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getUsers } from "@/lib/users";

export async function GET() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  const decoded = verifyToken(token);

  if (!decoded) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const users = getUsers();
  const user = users.find((u) => u.id === decoded.id);

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}
