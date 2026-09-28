import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  download?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-[#e8f1ff] text-navy-950 hover:bg-white shadow-[0_10px_30px_-16px_rgba(232,241,255,0.85)]",
    secondary:
      "border border-white/15 bg-white/0 text-snow hover:border-white/30 hover:bg-white/5",
    ghost: "text-blue-soft hover:text-cyan-soft",
  }[variant];

  const classes = cn(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
    styles,
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("/#") || download) {
    return (
      <a href={href} className={classes} download={download || undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
