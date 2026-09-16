import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
        <button
          type="button"
          className={css.loginButton}
          //   onClick={openLoginModal}
        >
          <Image src="/log-in-01.svg" alt="" width={20} height={20} />
          Log in
        </button>

        <button
          type="button"
          className={css.registrationButton}
          //   onClick={openRegisterModal}
        >
          Registration
        </button>
      </div>
    </header>
  );
}
