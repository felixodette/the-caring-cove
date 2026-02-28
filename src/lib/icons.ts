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
} from "lucide-react";

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
};

export function getIcon(name: string) {
  return contentIcons[name] ?? Heart;
}
