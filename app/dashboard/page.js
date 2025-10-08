"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/auth.css";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) return <p className="auth-page">Loading...</p>;

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome, {user.name}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
