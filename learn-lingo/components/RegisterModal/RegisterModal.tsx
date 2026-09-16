"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import css from "./RegisterModal.module.css";

type RegisterModalProps = {
  onClose: () => void;
};

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterModal({ onClose }: RegisterModalProps) {
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
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close registration modal"
        >
          ×
        </button>

        <h2 className={css.title}>Registration</h2>

        <p className={css.description}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder="Name" {...register("name")} />

            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div>
            <input type="email" placeholder="Email" {...register("email")} />

            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
