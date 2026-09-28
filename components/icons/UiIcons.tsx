import { cn } from "@/lib/utils";
import type { ProjectIcon } from "@/data/projects";

type IconProps = {
  className?: string;
};

function Base({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        d="M5 16.5V7.8A2.8 2.8 0 0 1 7.8 5h8.4A2.8 2.8 0 0 1 19 7.8v5.4A2.8 2.8 0 0 1 16.2 16H9l-4 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.8 17.5c.4-2.6 2.4-4 4.2-4s3.8 1.4 4.2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.2" cy="8.6" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.2 13.7c1.7.2 3.2 1.4 3.6 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6" y="5.5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 5.5V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8v.7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 11h6M9 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        d="M12 19s-6.5-4.1-8.2-8A4.2 4.2 0 0 1 12 7.4 4.2 4.2 0 0 1 20.2 11c-1.7 3.9-8.2 8-8.2 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 19V5M5 19h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 14.5 12 11l3 2.5 3.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        d="M12 20s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </Base>
  );
}

export function ProcessIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="5" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="14" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 7.5h3.2A2.8 2.8 0 0 1 16 10.3V14" stroke="currentColor" strokeWidth="1.6" />
    </Base>
  );
}

export function ReportIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 4.5h7.2L18 8.4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1-1.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 4.6V8h3.4M8.5 12h7M8.5 15.2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function ResearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 5.5h8.5A1.5 1.5 0 0 1 18 7v12.2l-3.2-1.6L12 19.2l-2.8-1.6L6 19.2V7A1.5 1.5 0 0 1 7.5 5.5H8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function TvIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5.5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20h6M12 17v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function HealthIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8.2v7.6M8.2 12h7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 13V11a7 7 0 0 1 14 0v2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.8" y="12" width="3.4" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="16.8" y="12" width="3.4" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 18.5v.4A2.2 2.2 0 0 1 14.8 21H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M17.6 6.4l-1.4 1.4M7.8 16.2l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Base>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="7" rx="6.5" ry="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 7v10c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6V7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 12c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6" stroke="currentColor" strokeWidth="1.6" />
    </Base>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 3 6 14h6l-1 7 7-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </Base>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V16M8 8h.01M11.5 16v-3.2c0-1.3.9-2.3 2.2-2.3 1.3 0 2.3 1 2.3 2.3V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        d="M9.5 19.5c-4 1.3-4-2-6-2.3M16 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.6 4.6 0 0 0 19.4 6a4.3 4.3 0 0 0-.1-3.2S18 2.5 15.7 4a11.4 11.4 0 0 0-7.4 0C6 2.5 4.7 2.8 4.7 2.8a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.3 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </Base>
  );
}

const projectIcons = {
  users: UsersIcon,
  clipboard: ClipboardIcon,
  heart: HeartIcon,
  chart: ChartIcon,
  map: MapIcon,
  headset: HeadsetIcon,
  process: ProcessIcon,
  health: HealthIcon,
  report: ReportIcon,
  research: ResearchIcon,
  tv: TvIcon,
};

export function ProjectTypeIcon({
  name,
  className,
}: {
  name: ProjectIcon;
  className?: string;
}) {
  const Icon = projectIcons[name] ?? ClipboardIcon;
  return <Icon className={className} />;
}
