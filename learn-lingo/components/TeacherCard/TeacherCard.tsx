import type { Teacher } from "@/app/types/teacher";
import css from "./TeacherCard.module.css";

type TeacherCardProps = {
  teacher: Teacher;
};

export default function TeacherCard({ teacher }: TeacherCardProps) {
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

        <button type="button" className={css.readMore}>
          Read more
        </button>

        <div className={css.levels}>
          {teacher.levels.map((level) => (
            <span key={level} className={css.level}>
              #{level}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={css.favoriteButton}
        aria-label="Add teacher to favorites"
      >
        ♡
      </button>
    </article>
  );
}
