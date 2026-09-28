"use client";

import { useEffect, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ProjectImage } from "@/data/projects";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

// Se alguma screenshot expuser CPF, matrícula, nome, telefone, dados médicos,
// senhas, IPs ou strings de conexão, anonimizar antes da publicação.
export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [active, setActive] = useState<ProjectImage | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image) => (
          <figure
            key={image.src}
            className="overflow-hidden rounded-2xl border border-white/8 bg-[#07101f]"
          >
            <button
              type="button"
              className="focus-ring relative block aspect-[16/10] w-full"
              onClick={() => setActive(image)}
            >
              <SafeImage
                src={image.src}
                alt={image.alt}
                fit={image.fit ?? "contain"}
              />
              <span className="sr-only">Ampliar imagem</span>
            </button>
            {image.placeholder ? (
              <figcaption className="px-4 py-3 text-[11px] text-mist">
                Imagem provisória — substitua em /public/projects
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020611]/88 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[90vh] max-w-[min(96vw,1200px)] rounded-xl object-contain"
          />
        </div>
      ) : null}
    </>
  );
}
