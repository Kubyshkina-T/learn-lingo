"use client";

import { useEffect, useId, useRef, useState } from "react";
import RegisterModal from "@/components/RegisterModal/RegisterModal";
import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import LoginModal from "../LoginModal/LoginModal";
import { auth } from "@/lib/firebase";

export default function Header() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 768px)");
    const handleBreakpointChange = () => {
      if (!tablet.matches && menuRef.current?.contains(document.activeElement)) {
        menuButtonRef.current?.focus();
      } else if (
        tablet.matches && document.activeElement === menuButtonRef.current
      ) {
        menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
      setIsMenuOpen(false);
    };
    tablet.addEventListener("change", handleBreakpointChange);
    return () => tablet.removeEventListener("change", handleBreakpointChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const isOutsideMenu = (target: EventTarget | null) =>
      target instanceof Node &&
      !menuRef.current?.contains(target) &&
      !menuButtonRef.current?.contains(target);

    const handlePointerDown = (event: PointerEvent) => {
      if (isOutsideMenu(event.target)) setIsMenuOpen(false);
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (isOutsideMenu(event.target)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className={css.header}>
      <Link className={css.logo} href="/" onClick={closeMenu}>
        <Image src="/ukraine.svg" alt="" width={28} height={28} priority />
        <span>LearnLingo</span>
      </Link>

      <button
        ref={menuButtonRef}
        className={css.menuButton}
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className={css.menuIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        ref={menuRef}
        id={menuId}
        className={`${css.menuPanel} ${isMenuOpen ? css.menuPanelOpen : ""}`}
      >
        <nav className={css.nav}>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/teachers" onClick={closeMenu}>
            Teachers
          </Link>
        </nav>

        <div className={css.auth}>
          {user ? (
            <>
              <Link
                className={css.linkFavorites}
                href="/favorites"
                onClick={closeMenu}
              >
                Favorites
              </Link>

              <span>{user.displayName || user.email}</span>

              <button
                className={css.buttonLogOut}
                type="button"
                onClick={() => {
                  closeMenu();
                  void handleLogout();
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className={css.loginButton}
                type="button"
                onClick={() => {
                  closeMenu();
                  setIsLoginOpen(true);
                }}
              >
                <Image src="/log-in-01.svg" alt="" width={20} height={20} />
                Log in
              </button>

              <button
                className={css.registrationButton}
                type="button"
                onClick={() => {
                  closeMenu();
                  setIsRegisterOpen(true);
                }}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && (
        <RegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}
    </header>
  );
}
