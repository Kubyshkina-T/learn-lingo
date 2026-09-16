"use client";

import css from "./TeachersFilters.module.css";

type TeachersFiltersProps = {
  language: string;
  level: string;
  price: string;
  languages: string[];
  levels: string[];
  prices: number[];
  onLanguageChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceChange: (value: string) => void;
};

export default function TeachersFilters({
  language,
  level,
  price,
  languages,
  levels,
  prices,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}: TeachersFiltersProps) {
  return (
    <div className={css.filters}>
      <label className={css.filter}>
        <span>Languages</span>

        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="">All languages</option>

          {languages.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={css.filter}>
        <span>Level of knowledge</span>

        <select value={level} onChange={(e) => onLevelChange(e.target.value)}>
          <option value="">All levels</option>

          {levels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={css.filter}>
        <span>Price</span>

        <select value={price} onChange={(e) => onPriceChange(e.target.value)}>
          <option value="">All prices</option>

          {prices.map((item) => (
            <option key={item} value={item}>
              ${item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
