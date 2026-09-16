import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import css from "@/app/page.module.css";
export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <Hero />
        <Stats />
      </div>
    </main>
  );
}
