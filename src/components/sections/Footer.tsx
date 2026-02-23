import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-navy text-navy-foreground">
    <div className="container mx-auto py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-primary">i</span>techie
          </h3>
          <p className="text-navy-foreground/60 text-sm mb-6">
            Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-navy-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["About Us", "Services", "Team", "Pricing", "Blog"].map((l) => (
              <li key={l}>
                <a href="#" className="text-navy-foreground/60 text-sm hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Our Services</h4>
          <ul className="space-y-2">
            {["Web Design", "App Development", "Cloud Service", "IT Management", "Digital Marketing"].map((l) => (
              <li key={l}>
                <a href="#" className="text-navy-foreground/60 text-sm hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Info</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-navy-foreground/60 text-sm">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              123 Street, New York, USA
            </div>
            <div className="flex items-center gap-3 text-navy-foreground/60 text-sm">
              <Phone className="w-4 h-4 shrink-0 text-primary" />
              +012 345 67890
            </div>
            <div className="flex items-center gap-3 text-navy-foreground/60 text-sm">
              <Mail className="w-4 h-4 shrink-0 text-primary" />
              info@itechie.com
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-navy-foreground/10">
      <div className="container mx-auto py-6 text-center text-navy-foreground/40 text-sm">
        © 2024 iTechie. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
