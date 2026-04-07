import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, Facebook, Instagram } from "lucide-react";
import { XIcon } from "@/lib/icons";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61582063697356";
const TWITTER_URL = "https://x.com/thecaringcove";
const INSTAGRAM_URL = "https://www.instagram.com/thecaringcove/";

const TopBar = () => (
  <div className="bg-background border-b border-border">
    <div className="container mx-auto flex flex-wrap items-center justify-between py-3 gap-4">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="The Caring Cove"
          width={180}
          height={40}
          className="h-8 w-auto object-contain"
          priority
        />
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs font-semibold text-foreground">Office Hours</p>
            <p className="text-xs text-muted-foreground">Opening Hour 8:00am - 5:00pm</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs font-semibold text-foreground">Email Us</p>
            <p className="text-xs text-muted-foreground">info@thecaringcove.co.ke</p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-3">
        {[
          { Icon: Facebook, href: FACEBOOK_URL, label: "Facebook" },
          { Icon: XIcon, href: TWITTER_URL, label: "X (Twitter)" },
          { Icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
        ].map(({ Icon, href, label }, i) => (
          <a
            key={`${label}-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-navy-foreground hover:bg-primary transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default TopBar;
