"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/header.css";

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/");
  };

  return (
    <header className={`header ${theme}`}>
      <div className="logo">
        <Link href="/">📚 MyApp</Link>
      </div>

      <nav className="nav-links">
        <button onClick={toggleTheme} className="btn theme-btn">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {loggedIn ? (
          <>
            <span className="welcome-text">Hello, {user?.name || "User"} 👋</span>
            <button onClick={handleLogout} className="btn logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn login-btn">
              Login
            </Link>
            <Link href="/register" className="btn register-btn">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
