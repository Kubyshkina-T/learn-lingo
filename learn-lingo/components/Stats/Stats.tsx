import css from "@/components/Stats/Stats.module.css";

export default function Stats() {
  return (
    <section className={css.statsSection}>
      <div className={css.statsItem}>
        <span className={css.statsNumber}>32,000+</span>
        <span className={css.statsLabel}>Experienced tutors</span>
      </div>

      <div className={css.statsItem}>
        <span className={css.statsNumber}>300,000+</span>
        <span className={css.statsLabel}>5-star tutor reviews</span>
      </div>

      <div className={css.statsItem}>
        <span className={css.statsNumber}>120+</span>
        <span className={css.statsLabel}>Subjects taught</span>
      </div>

      <div className={css.statsItem}>
        <span className={css.statsNumber}>200+</span>
        <span className={css.statsLabel}>Tutor nationalities</span>
      </div>
    </section>
  );
}
