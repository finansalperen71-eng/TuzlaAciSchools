type IconProps = {
  className?: string;
};

// Ortak çizim dili: stroke tabanlı, dolgusuz, keskin uçlar.
const shared = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: false,
};

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M12 11v6" />
      <path d="M12 7.5v.01" />
    </svg>
  );
}

export function NewspaperIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="4" y="5" width="16" height="14" />
      <path d="M7 9h6" />
      <path d="M7 12.5h6" />
      <path d="M7 16h4" />
      <path d="M16 9h1" />
    </svg>
  );
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="4" y="5" width="16" height="14" />
      <circle cx="9" cy="10" r="1.4" />
      <path d="M4 16.5 9.5 12 14 15.5 20 10.5" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M12 4 14.4 9.6 20.5 10.2 15.8 14.2 17.2 20.2 12 16.9 6.8 20.2 8.2 14.2 3.5 10.2 9.6 9.6Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M5 4h4l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 15v4a1 1 0 0 1-1 1C11.5 20 4 12.5 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M5 5 19 19" />
      <path d="M19 5 5 19" />
    </svg>
  );
}
