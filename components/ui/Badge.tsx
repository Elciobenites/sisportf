import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/0 px-2.5 py-1 text-[11px] font-medium text-mist",
        className,
      )}
    >
      {children}
    </span>
  );
}
