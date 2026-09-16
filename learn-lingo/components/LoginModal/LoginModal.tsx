"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import css from "./LoginModal.module.css";

type LoginModalProps = {
  onClose: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup.string().required("Password is required"),
});

export default function LoginModal({ onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      onClose();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      {" "}
      <div className={css.modal}>
        {" "}
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close login modal"
        >
          {" "}
          ×{" "}
        </button>{" "}
        <h2 className={css.title}>Log In</h2>{" "}
        <p className={css.description}>
          {" "}
          Welcome back ! Please enter your credentials to access your account
          and continue your language learning journey.{" "}
        </p>{" "}
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <div>
            {" "}
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />{" "}
            {errors.email && (
              <p className={css.error}> {errors.email.message}</p>
            )}
          </div>{" "}
          <div>
            {" "}
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />{" "}
            {errors.password && (
              <p className={css.error}> {errors.password.message}</p>
            )}
          </div>{" "}
          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {" "}
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
