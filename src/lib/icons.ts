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
