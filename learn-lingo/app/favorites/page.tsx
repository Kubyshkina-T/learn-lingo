"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { get, ref } from "firebase/database";

import { auth, db } from "@/lib/firebase";
import TeacherCard from "@/components/TeacherCard/TeacherCard";

import type { Teacher } from "@/app/types/teacher";

import css from "./page.module.css";

export default function FavoritesPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/");
        return;
      }

      setUser(currentUser);

      const savedFavorites = localStorage.getItem(
        `learnlingo-favorites-${currentUser.uid}`,
      );

      const ids: string[] = savedFavorites ? JSON.parse(savedFavorites) : [];

      setFavoriteIds(ids);

      if (ids.length === 0) {
        setTeachers([]);
        setIsLoading(false);
        return;
      }

      const favoriteTeachers = await Promise.all(
        ids.map(async (id) => {
          const snapshot = await get(ref(db, id));

          if (!snapshot.exists()) {
            return null;
          }

          return {
            id,
            ...snapshot.val(),
          } as Teacher;
        }),
      );

      setTeachers(
        favoriteTeachers.filter(
          (teacher): teacher is Teacher => teacher !== null,
        ),
      );

      setIsLoading(false);
    });

    return unsubscribe;
  }, [router]);

  const handleFavoriteToggle = (teacherId: string) => {
    if (!user) {
      return;
    }

    const nextFavorites = favoriteIds.filter((id) => id !== teacherId);

    setFavoriteIds(nextFavorites);

    setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));

    localStorage.setItem(
      `learnlingo-favorites-${user.uid}`,
      JSON.stringify(nextFavorites),
    );
  };

  if (isLoading) {
    return (
      <main className={css.favoritesPage}>
        <div className={css.container}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.favoritesPage}>
      <div className={css.container}>
        <h1 className={css.title}>Favorites</h1>

        {teachers.length === 0 ? (
          <p className={css.empty}>
            You haven&apos;t added any teachers to favorites yet.
          </p>
        ) : (
          <div className={css.teachersList}>
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                isFavorite={favoriteIds.includes(teacher.id)}
                onFavoriteToggle={() => handleFavoriteToggle(teacher.id)}
                selectedLevel=""
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
