"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const progressMap = {
    "/": 0,
    "/dashboard": 20,
    "/lesson": 40,
    "/quiz": 70,
    "/completion": 100,
  };
  const progress = progressMap[pathname] || 0;

  return (
    <>
      <nav className="navbar">
        
        {/* Logo / brand */}
        <div className="nav-logo">
          <Link href="/">Zyqentra</Link>
        </div>

        {/* Hamburger */}
        <div
        style={{marginRight:"1.7rem"}}
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>


        {/* Links */}
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            href="/lesson"
            className={pathname === "/lesson" ? "active" : ""}
          >
            Lesson
          </Link>
          <Link
            href="/codeeditor"
            className={pathname === "/codeeditor" ? "active" : ""}
          >
            CodeLab
          </Link>
          <Link
            href="/subscribe"
            className={pathname === "/subscribe" ? "active" : ""}
          >
            Pro
          </Link>

          {user ? (
            <button onClick={logout} className="logout-btn" style={{fontSize:"0.7rem", marginTop:"0px", marginRight:"1.7rem"}}>
              Logout
            </button>
          ) : (
            <Link
              href="/signup"
              className={pathname === "/signup" ? "active" : ""}
            >
              SignUp/Login
            </Link>
          )}
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}
