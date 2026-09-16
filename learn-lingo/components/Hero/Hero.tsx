import css from "@/components/Hero/Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className={css.heroContent}>
        <div className={css.heroTextContainer}>
          <h1 className={css.heroTitle}>
            Unlock your potential with the best{" "}
            <span className={css.heroTitleAccent}>language</span> tutors
          </h1>

          <p className={css.heroDescription}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button className={css.buttonHero} type="button">
            Get started!
          </button>
        </div>

        <div className={css.heroImageContainer}>
          <Image
            src="/block.png"
            alt="Girl with laptop"
            width={568}
            height={530}
            priority
          />
        </div>
      </div>
    </section>
  );
}
