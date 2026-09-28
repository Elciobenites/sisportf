import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  title?: string;
};

function BaseIcon({
  className,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function SqlServerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M5 10c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.6" />
    </BaseIcon>
  );
}

export function PythonIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M9 4.5h5.2c2 0 2.8.8 2.8 2.6v2.7H11c-2.3 0-3.5 1-3.5 3.1V15H6.2C4.5 15 4 14.2 4 12.6V8.7C4 6.3 5.6 4.5 9 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15 19.5H9.8C7.8 19.5 7 18.7 7 16.9v-2.7h6c2.3 0 3.5-1 3.5-3.1V9h1.3c1.7 0 2.2.8 2.2 2.4v3.9c0 2.4-1.6 4.2-5 4.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="10" cy="7.2" r="0.7" fill="currentColor" />
      <circle cx="14" cy="16.8" r="0.7" fill="currentColor" />
    </BaseIcon>
  );
}

export function NodeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M12 3.2 19.4 7.4v8.4L12 20.8 4.6 15.8V7.4L12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 8v8" stroke="currentColor" strokeWidth="1.6" />
    </BaseIcon>
  );
}

export function PowerBiIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 16v3M10 12v7M14 8v11M18 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </BaseIcon>
  );
}

export function EtlIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="5" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14.5" y="14" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.5 7.5h3.2a3 3 0 0 1 3 3V14"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M14.2 12.6 16.7 14l-2.5 1.4" stroke="currentColor" strokeWidth="1.6" />
    </BaseIcon>
  );
}

export function WarehouseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M4 10.5 12 5l8 5.5V19H4v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 19v-5h6v5" stroke="currentColor" strokeWidth="1.6" />
    </BaseIcon>
  );
}

export function BigDataIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.5" cy="16" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="16.2" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 8.8 14.7 8M8.6 10.1 8 14.2M15.6 9.2 15.2 14M9.3 15.5h4.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </BaseIcon>
  );
}

const iconMap = {
  "sql-server": SqlServerIcon,
  python: PythonIcon,
  nodejs: NodeIcon,
  "power-bi": PowerBiIcon,
  etl: EtlIcon,
  "data-warehouse": WarehouseIcon,
  "big-data": BigDataIcon,
} as const;

export function StackIcon({
  id,
  className,
}: {
  id: keyof typeof iconMap;
  className?: string;
}) {
  const Icon = iconMap[id];
  return <Icon className={className} />;
}
