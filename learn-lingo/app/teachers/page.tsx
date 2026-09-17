"use client";
import css from "@/app/teachers/page.module.css";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth, db } from "@/lib/firebase";

import TeacherCard from "@/components/TeacherCard/TeacherCard";
import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";
import type { Teacher } from "@/app/types/teacher";

const PAGE_SIZE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  const [user, setUser] = useState<User | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isFiltering = Boolean(language || level || price);

  const loadTeachers = async (loadMore = false) => {
    try {
      setIsLoading(true);

      const teachersRef = ref(db);

      const teachersQuery =
        loadMore && lastKey
          ? query(
              teachersRef,
              orderByKey(),
              startAfter(lastKey),
              limitToFirst(PAGE_SIZE),
            )
          : query(teachersRef, orderByKey(), limitToFirst(PAGE_SIZE));

      const snapshot = await get(teachersQuery);

      const newTeachers: Teacher[] = [];
      let newLastKey: string | null = null;

      snapshot.forEach((childSnapshot) => {
        newTeachers.push({
          id: childSnapshot.key!,
          ...childSnapshot.val(),
        });

        newLastKey = childSnapshot.key;
      });

      if (loadMore) {
        setTeachers((prev) => [...prev, ...newTeachers]);
      } else {
        setTeachers(newTeachers);
      }

      setLastKey(newLastKey);

      if (newTeachers.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllTeachers = async () => {
    try {
      const snapshot = await get(ref(db));

      if (!snapshot.exists()) {
        setAllTeachers([]);
        return;
      }

      const teachersArray: Teacher[] = [];

      snapshot.forEach((childSnapshot) => {
        teachersArray.push({
          id: childSnapshot.key!,
          ...childSnapshot.val(),
        });
      });

      setAllTeachers(teachersArray);
    } catch (error) {
      console.error("Error loading all teachers:", error);
    }
  };

  useEffect(() => {
    loadTeachers();
    loadAllTeachers();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setFavoriteIds([]);
        return;
      }

      const savedFavorites = localStorage.getItem(
        `learnlingo-favorites-${currentUser.uid}`,
      );

      if (savedFavorites) {
        setFavoriteIds(JSON.parse(savedFavorites));
      } else {
        setFavoriteIds([]);
      }
    });

    return unsubscribe;
  }, []);

  const languages = [
    ...new Set(allTeachers.flatMap((teacher) => teacher.languages)),
  ];

  const levels = [...new Set(allTeachers.flatMap((teacher) => teacher.levels))];

  const prices = [
    ...new Set(allTeachers.map((teacher) => teacher.price_per_hour)),
  ].sort((a, b) => a - b);

  const teachersToShow = isFiltering ? allTeachers : teachers;

  const filteredTeachers = teachersToShow.filter((teacher) => {
    const matchesLanguage = !language || teacher.languages.includes(language);

    const matchesLevel = !level || teacher.levels.includes(level);

    const matchesPrice = !price || teacher.price_per_hour === Number(price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });

  const handleFavoriteToggle = (teacherId: string) => {
    if (!user) {
      toast.error("This feature is available only for authorized users.");
      return;
    }

    const isFavorite = favoriteIds.includes(teacherId);

    const nextFavorites = isFavorite
      ? favoriteIds.filter((id) => id !== teacherId)
      : [...favoriteIds, teacherId];

    setFavoriteIds(nextFavorites);

    localStorage.setItem(
      `learnlingo-favorites-${user.uid}`,
      JSON.stringify(nextFavorites),
    );

    if (isFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }
  };
  return (
    <main className={css.teachersPage}>
      <div className={css.container}>
        <TeachersFilters
          language={language}
          level={level}
          price={price}
          languages={languages}
          levels={levels}
          prices={prices}
          onLanguageChange={setLanguage}
          onLevelChange={setLevel}
          onPriceChange={setPrice}
        />

        <div className={css.teachersList}>
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isFavorite={favoriteIds.includes(teacher.id)}
              onFavoriteToggle={() => handleFavoriteToggle(teacher.id)}
              selectedLevel={level}
            />
          ))}
        </div>

        {hasMore && !isFiltering && (
          <button
            className={css.buttonLoadMore}
            type="button"
            onClick={() => loadTeachers(true)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </main>
  );
}
