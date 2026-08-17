"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/service" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hidden md:flex items-center gap-1 px-5 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <Link
            href="/contact"
            className="hidden md:block bg-navy px-6 py-4 text-sm font-semibold text-navy-foreground hover:bg-navy/80 transition-colors"
          >
            Book a Private Tour
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden p-4 text-primary-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-primary-foreground/20">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setOpen(false)}
          >
            Book a Private Tour
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
