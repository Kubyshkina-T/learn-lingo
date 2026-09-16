"use client";

import { useEffect, useState } from "react";
import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";

import { db } from "@/lib/firebase";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import TeachersFilters from "@/components/TeachersFilters/TeachersFilters";

import type { Teacher } from "@/app/types/teacher";

const PAGE_SIZE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadTeachers = async (loadMore = false) => {
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

    setIsLoading(false);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const languages = [
    ...new Set(teachers.flatMap((teacher) => teacher.languages)),
  ];

  const levels = [...new Set(teachers.flatMap((teacher) => teacher.levels))];

  const prices = [
    ...new Set(teachers.map((teacher) => teacher.price_per_hour)),
  ].sort((a, b) => a - b);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesLanguage = !language || teacher.languages.includes(language);

    const matchesLevel = !level || teacher.levels.includes(level);

    const matchesPrice = !price || teacher.price_per_hour === Number(price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });

  return (
    <main>
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

      <div>
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => loadTeachers(true)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </main>
  );
}
