"use client";

import { useState } from "react";
import RegisterModal from "@/components/RegisterModal/RegisterModal";
import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function Header() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className={css.header}>
      <Link className={css.logo} href="/">
        <Image src="/ukraine.svg" alt="" width={28} height={28} priority />
        <span>LearnLingo</span>
      </Link>

      <nav className={css.nav}>
        <Link href="/">Home</Link>
        <Link href="/teachers">Teachers</Link>
      </nav>

      <div className={css.auth}>
        {user ? (
          <>
            <Link href="/favorites">Favorites</Link>

            <span>{user.displayName || user.email}</span>

            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button type="button">Log in</button>

            <button type="button" onClick={() => setIsRegisterOpen(true)}>
              Registration
            </button>
          </>
        )}
      </div>
    </header>
  );
}
