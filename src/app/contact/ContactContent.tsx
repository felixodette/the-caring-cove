"use client";

import { MapPin, Mail, Phone } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Office address", lines: ["7895 Piermont, Albuquerque, NM 198866, USA"] },
  { icon: Mail, title: "Email Address", lines: ["support@gmail.com", "www.infomar.net"] },
  { icon: Phone, title: "Phone Number", lines: ["+012 (345) 678 99", "+12345678"] },
];

export default function ContactContent() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="section-subtitle">Contact</p>
          <h2 className="section-title">Get in touch</h2>
          <p className="section-desc">
            Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue atpellentesque laoreet
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((c, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{c.title}</h3>
              {c.lines.map((l, j) => (
                <p key={j} className="text-muted-foreground text-sm">{l}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Free consulting</h3>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="email" placeholder="Email" className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Phone" className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" placeholder="Subject" className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <textarea rows={5} placeholder="Your Message" className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <div className="text-center">
              <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded font-semibold text-sm hover:bg-primary/90 transition-colors">
                Submit Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
