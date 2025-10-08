"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="auth-container">
      <h1>Welcome to My App</h1>
      {user ? (
        <>
          <p>Hello, <strong>{user.name}</strong> 👋</p>
          <button onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
        </>
      ) : (
        <p>Please login or register to continue</p>
      )}
    </div>
  );
}
