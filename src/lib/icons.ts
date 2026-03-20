import {
  Heart,
  Award,
  Home,
  Brain,
  Users,
  Shield,
  UtensilsCrossed,
  TreePine,
  Music,
  ShieldCheck,
  ClipboardList,
  Eye,
  Activity,
  Sparkles,
  Pill,
  MonitorSmartphone,
  Stethoscope,
  MapPin,
  Mail,
  Phone,
  Timer,
  Flower2,
} from "lucide-react";
import React from "react";

/** Letter "r" icon for Respite care - matches reference design */
const LetterR = ({ className }: { className?: string }) =>
  React.createElement(
    "span",
    {
    className: `inline-flex items-center justify-center font-semibold ${className ?? ""}`,
    style: { fontFamily: "system-ui, sans-serif", fontSize: "1.1em" },
    "aria-hidden": true,
    },
    "r",
  );

/** Letter "p" icon for Palliative care - matches reference design */
const LetterP = ({ className }: { className?: string }) =>
  React.createElement(
    "span",
    {
    className: `inline-flex items-center justify-center font-semibold ${className ?? ""}`,
    style: { fontFamily: "system-ui, sans-serif", fontSize: "1.1em" },
    "aria-hidden": true,
    },
    "p",
  );

/** X (formerly Twitter) brand icon (inline SVG). */
export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  );
}

export const contentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  award: Award,
  home: Home,
  brain: Brain,
  users: Users,
  shield: Shield,
  utensils: UtensilsCrossed,
  "tree-pine": TreePine,
  music: Music,
  "shield-check": ShieldCheck,
  "clipboard-list": ClipboardList,
  eye: Eye,
  activity: Activity,
  sparkles: Sparkles,
  pill: Pill,
  "monitor-smartphone": MonitorSmartphone,
  stethoscope: Stethoscope,
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
  timer: Timer,
  "flower-2": Flower2,
  "letter-r": LetterR,
  "letter-p": LetterP,
};

export function getIcon(name: string) {
  return contentIcons[name] ?? Heart;
}
