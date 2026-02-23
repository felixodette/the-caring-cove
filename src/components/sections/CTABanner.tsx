import Link from "next/link";

const CTABanner = () => (
  <section className="bg-primary py-16">
    <div className="container mx-auto text-center">
      <p className="section-subtitle text-primary-foreground/80">We are here to answer your questions 24/7</p>
      <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
        Need for IT solution services
      </h2>
      <Link
        href="/contact"
        className="inline-block bg-navy px-8 py-3 rounded font-semibold text-navy-foreground hover:bg-navy/80 transition-colors"
      >
        Contact With Us
      </Link>
    </div>
  </section>
);

export default CTABanner;
