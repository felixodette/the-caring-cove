"use client";

import { Settings, Headphones, Folder } from "lucide-react";
import Link from "next/link";

const categories = [
  "Digital marketing", "Machine learning", "It management",
  "Loan & Insurance", "Web Design", "Digital Marketing", "IT Consultancy",
];

export default function ServiceDetailsContent() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <img src="/images/service-detail.jpg" alt="IT Management" className="w-full rounded-lg mb-8" />
            <h2 className="text-3xl font-bold text-foreground mb-4">IT management</h2>
            <p className="text-muted-foreground mb-8">
              Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget elementum acondimentum eget, diam. Nam at tortor in tellus interdum sagitliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio. Vivamus laoreet.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">Key benefits</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                { icon: Settings, title: "Flexible Solutions", desc: "Maecenas tempus, tellus eget condime honcus sem quam semper" },
                { icon: Headphones, title: "24/7 Unlimited Support", desc: "Maecenas tempus, tellus eget condime honcus sem quam semper" },
                { icon: Settings, title: "Flexible Solutions", desc: "Maecenas tempus, tellus eget condime honcus sem quam semper" },
                { icon: Headphones, title: "24/7 Unlimited Support", desc: "Maecenas tempus, tellus eget condime honcus sem quam semper" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">More information</h3>
            <div className="space-y-4">
              {[
                { q: "Why we are?", a: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed ipsum. amquam nunc" },
                { q: "What we do for you?", a: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed ipsum. amquam nunc" },
                { q: "100% data security", a: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed ipsum. amquam nunc" },
              ].map((item, i) => (
                <div key={i} className="bg-section-bg p-5 rounded-lg">
                  <h4 className="font-bold text-foreground mb-2">{item.q}</h4>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-primary text-primary-foreground rounded-lg p-6">
              <h4 className="font-bold text-lg mb-4">Category</h4>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <ul className="space-y-3">
                {categories.map((c) => (
                  <li key={c}>
                    <a href="#" className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors py-2 border-b border-border last:border-0">
                      <Folder className="w-4 h-4" /> {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary text-primary-foreground rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">Free consulting</h4>
              <Link href="/contact" className="inline-block bg-navy text-navy-foreground px-6 py-2 rounded font-semibold text-sm mt-2 hover:bg-navy/80 transition-colors">
                Submit Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
