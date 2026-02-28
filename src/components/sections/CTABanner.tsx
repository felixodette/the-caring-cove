import Link from "next/link";

const CTABanner = () => (
  <section className="bg-primary py-16">
    <div className="container mx-auto text-center">
      <p className="section-subtitle text-primary-foreground/80">We&apos;re here to support families—near and far</p>
      <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
        Ready to see the 1:1 difference for yourself?
      </h2>
      <Link
        href="/contact"
        className="inline-block bg-navy px-8 py-3 rounded font-semibold text-navy-foreground hover:bg-navy/80 transition-colors"
      >
        Book a Private Tour
      </Link>
    </div>
  </section>
);

export default CTABanner;
