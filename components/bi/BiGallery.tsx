"use client";

import { useMemo, useState } from "react";
import { BiCard } from "@/components/bi/BiCard";
import { getBiCategories, getBiModels, type BiCategory } from "@/data/bi-models";
import { cn } from "@/lib/utils";

export function BiGallery() {
  const models = getBiModels();
  const categories = getBiCategories();
  const [category, setCategory] = useState<BiCategory | "todos">("todos");

  const visible = useMemo(
    () => (category === "todos" ? models : models.filter((model) => model.category === category)),
    [category, models],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("todos")}
          className={cn(
            "focus-ring rounded-full border px-3 py-1.5 text-sm font-semibold",
            category === "todos"
              ? "border-white bg-white text-navy-950"
              : "border-white/10 bg-white/5 text-mist hover:text-snow",
          )}
        >
          Todos
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "focus-ring rounded-full border px-3 py-1.5 text-sm font-semibold",
              category === item
                ? "border-white bg-white text-navy-950"
                : "border-white/10 bg-white/5 text-mist hover:text-snow",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((model) => (
          <BiCard key={model.slug} model={model} />
        ))}
      </div>
    </div>
  );
}
