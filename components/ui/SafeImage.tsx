import { cn } from "@/lib/utils";

type SafeImageProps = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
};

export function SafeImage({
  src,
  alt,
  fit = "cover",
  priority = false,
  className,
}: SafeImageProps) {
  return (
    // Imagens locais grandes: sem o otimizador do Next, para evitar 404/null.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "absolute inset-0 h-full w-full",
        fit === "contain" ? "object-contain p-4" : "object-cover object-center",
        className,
      )}
    />
  );
}
