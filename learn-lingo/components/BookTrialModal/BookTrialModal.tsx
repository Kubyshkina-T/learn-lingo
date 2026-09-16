"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { Teacher } from "@/app/types/teacher";
import css from "@/components/BookTrialModal/BookTrialModal.module.css";

type BookTrialModalProps = {
  teacher: Teacher;
  onClose: () => void;
};

type FormValues = {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
};

const schema = yup.object({
  reason: yup.string().required("Choose a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export default function BookTrialModal({
  teacher,
  onClose,
}: BookTrialModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className={css.title}>Book trial lesson</h2>

        <p className={css.description}>
          Our experienced tutor will assess your current language level and help
          you choose the right learning path.
        </p>

        <div className={css.teacher}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.avatar}
          />

          <div>
            <span className={css.teacherLabel}>Your teacher</span>

            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={css.reasons}>
            <legend>What is your main reason for learning?</legend>

            <label>
              <input
                type="radio"
                value="Career and business"
                {...register("reason")}
              />
              Career and business
            </label>

            <label>
              <input
                type="radio"
                value="Lesson for kids"
                {...register("reason")}
              />
              Lesson for kids
            </label>

            <label>
              <input
                type="radio"
                value="Living abroad"
                {...register("reason")}
              />
              Living abroad
            </label>

            <label>
              <input
                type="radio"
                value="Exams and coursework"
                {...register("reason")}
              />
              Exams and coursework
            </label>

            <label>
              <input
                type="radio"
                value="Culture travel or hobby"
                {...register("reason")}
              />
              Culture, travel or hobby
            </label>

            {errors.reason && (
              <p className={css.error}>{errors.reason.message}</p>
            )}
          </fieldset>

          <div className={css.fields}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
              />

              {errors.fullName && (
                <p className={css.error}>{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <input type="email" placeholder="Email" {...register("email")} />

              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone number"
                {...register("phone")}
              />

              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className={css.submitButton}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
