import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, Facebook, Twitter, Instagram } from "lucide-react";

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
            <p className="text-xs font-semibold text-foreground">Office time</p>
            <p className="text-xs text-muted-foreground">Opening Hour 9:00am - 10:00pm</p>
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
        {[Facebook, Twitter, Instagram].map((Icon, i) => (
          <a key={i} href="#" className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-navy-foreground hover:bg-primary transition-colors">
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default TopBar;
