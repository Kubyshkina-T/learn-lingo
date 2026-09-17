"use client";

import { useState } from "react";
import Image from "next/image";

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
  const [isHeartHovered, setIsHeartHovered] = useState(false);

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

          <div className={css.topRight}>
            <div className={css.info}>
              <span className={css.infoItem}>
                <Image src="/book-open-01.svg" alt="" width={16} height={16} />
                Lessons online
              </span>

              <span className={css.infoItem}>
                Lessons done: {teacher.lessons_done}
              </span>

              <span className={css.infoItem}>⭐ Rating: {teacher.rating}</span>

              <span className={css.infoItem}>
                Price / 1 hour:{" "}
                <strong className={css.price}>${teacher.price_per_hour}</strong>
              </span>
            </div>

            <button
              type="button"
              className={css.favoriteButton}
              onClick={onFavoriteToggle}
              onMouseEnter={() => setIsHeartHovered(true)}
              onMouseLeave={() => setIsHeartHovered(false)}
              aria-label={
                isFavorite
                  ? "Remove teacher from favorites"
                  : "Add teacher to favorites"
              }
              aria-pressed={isFavorite}
            >
              <Image
                src={
                  isFavorite || isHeartHovered ? "/hover.svg" : "/normal.svg"
                }
                alt=""
                width={26}
                height={26}
              />
            </button>
          </div>
        </div>

        <h2 className={css.name}>
          {teacher.name} {teacher.surname}
        </h2>

        <div className={css.details}>
          <p>
            <span>Speaks: </span>
            <span className={css.languages}>
              {teacher.languages.join(", ")}
            </span>
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
                  <div className={css.reviewTop}>
                    <div className={css.reviewAvatar}>
                      {review.reviewer_avatar_url ? (
                        <img
                          src={review.reviewer_avatar_url}
                          alt={review.reviewer_name}
                        />
                      ) : (
                        <span>{review.reviewer_name.charAt(0)}</span>
                      )}
                    </div>

                    <div className={css.reviewInfo}>
                      <strong>{review.reviewer_name}</strong>

                      <span className={css.reviewRating}>
                        ⭐ {review.reviewer_rating}
                      </span>
                    </div>
                  </div>

                  <p className={css.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
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

        {isExpanded && (
          <button
            type="button"
            className={css.bookButton}
            onClick={() => setIsBookingOpen(true)}
          >
            Book trial lesson
          </button>
        )}
      </div>

      {isBookingOpen && (
        <BookTrialModal
          teacher={teacher}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </article>
  );
}
