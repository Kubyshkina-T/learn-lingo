"use client";

import { useState } from "react";
import type { Teacher } from "@/app/types/teacher";
import BookTrialModal from "@/components/BookTrialModal/BookTrialModal";
import css from "./TeacherCard.module.css";

type TeacherCardProps = {
  teacher: Teacher;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  selectedLevel: string;
};

export default function TeacherCard({
  teacher,
  isFavorite,
  onFavoriteToggle,
  selectedLevel,
}: TeacherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <article className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
      </div>

      <div className={css.content}>
        <div className={css.top}>
          <p className={css.label}>Languages</p>

          <div className={css.info}>
            <span>Lessons online</span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span>⭐ {teacher.rating}</span>

            <span>
              Price / 1 hour: <strong>${teacher.price_per_hour}</strong>
            </span>
          </div>
        </div>

        <h2 className={css.name}>
          {teacher.name} {teacher.surname}
        </h2>

        <div className={css.details}>
          <p>
            <span>Speaks: </span>
            {teacher.languages.join(", ")}
          </p>

          <p>
            <span>Lesson Info: </span>
            {teacher.lesson_info}
          </p>

          <p>
            <span>Conditions: </span>
            {teacher.conditions.join(", ")}
          </p>
        </div>

        {!isExpanded && (
          <button
            type="button"
            className={css.readMore}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={css.expandedContent}>
            <p className={css.experience}>{teacher.experience}</p>

            <div className={css.reviews}>
              {teacher.reviews?.map((review, index) => (
                <div
                  key={`${review.reviewer_name}-${index}`}
                  className={css.review}
                >
                  <div>
                    <strong>{review.reviewer_name}</strong>
                    <span> ⭐ {review.reviewer_rating}</span>
                  </div>

                  <p>{review.comment}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={css.bookButton}
              onClick={() => setIsBookingOpen(true)}
            >
              Book trial lesson
            </button>
          </div>
        )}

        <div className={css.levels}>
          {teacher.levels.map((teacherLevel) => (
            <span
              key={teacherLevel}
              className={`${css.level} ${
                teacherLevel === selectedLevel ? css.levelActive : ""
              }`}
            >
              #{teacherLevel}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${css.favoriteButton} ${
          isFavorite ? css.favoriteActive : ""
        }`}
        onClick={onFavoriteToggle}
        aria-label={
          isFavorite
            ? "Remove teacher from favorites"
            : "Add teacher to favorites"
        }
        aria-pressed={isFavorite}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      {isBookingOpen && (
        <BookTrialModal
          teacher={teacher}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </article>
  );
}
