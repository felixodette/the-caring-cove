import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { XIcon } from "@/lib/icons";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61582063697356";
const TWITTER_URL = "https://x.com/thecaringcove";
const INSTAGRAM_URL = "https://www.instagram.com/thecaringcove/";

const Footer = () => (
  <footer id="contact" className="bg-navy text-navy-foreground">
    <div className="container mx-auto py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/logo.png"
              alt="The Caring Cove"
              width={200}
              height={44}
              className="h-10 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
            />
          </Link>
          <p className="text-navy-foreground/60 text-sm mb-6">
            Kenya&apos;s most exclusive 1:4 memory care boutique. Guided by UK clinical standards and inspired by the warmth of home, we provide a dignified sanctuary for your loved one in the heart of Karen.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, href: FACEBOOK_URL, label: "Facebook" },
              { Icon: XIcon, href: TWITTER_URL, label: "X (Twitter)" },
              { Icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={`${label}-${i}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Service", href: "/service" },
              { label: "Gallery", href: "/gallery" },
              { label: "FAQ", href: "/faq" },
              // { label: "Blog", href: "/blog" },
              { label: "Contact Us", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-navy-foreground/60 text-sm hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Our Services</h4>
          <ul className="space-y-2">
            {[
              { label: "Memory Care (Alzheimer's & Dementia)", href: "/service#service-0" },
              { label: "Palliative & End-of-Life Care", href: "/service#service-1" },
              { label: "Convalescence & Rehabilitation", href: "/service#service-2" },
              { label: "Skilled Nursing & Complex Care", href: "/service#service-3" },
              { label: "Respite Stays", href: "/service#service-4" },
              { label: "Wellness & Lifestyle", href: "/service#service-5" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-navy-foreground/60 text-sm hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Info</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-navy-foreground/60 text-sm">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              Karen, Nairobi, Kenya
            </div>
            <div className="flex items-center gap-3 text-navy-foreground/60 text-sm">
              <Phone className="w-4 h-4 shrink-0 text-primary" />
              +254 748 583 879
            </div>
            <div className="flex items-center gap-3 text-navy-foreground/60 text-sm">
              <Mail className="w-4 h-4 shrink-0 text-primary" />
              <a href="mailto:info@thecaringcove.co.ke" className="hover:text-primary transition-colors">info@thecaringcove.co.ke</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-navy-foreground/10">
      <div className="container mx-auto py-6 text-center text-navy-foreground/40 text-sm">
        © 2025 The Caring Cove. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
