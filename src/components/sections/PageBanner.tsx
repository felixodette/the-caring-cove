import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

const PageBanner = ({ title, breadcrumb }: PageBannerProps) => (
  <section className="relative bg-navy py-24 overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full -translate-x-1/3 -translate-y-1/4" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full -translate-x-1/4 translate-y-1/4" />
    <div className="absolute top-12 right-8 grid grid-cols-6 gap-1.5">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      ))}
    </div>
    <div className="absolute top-1/3 right-1/4">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/50">
        <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="3" />
        <path d="M5 19l7-7 7 7" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
    <div className="absolute bottom-1/3 left-1/4">
      <svg width="16" height="16" className="text-primary animate-pulse">
        <polygon points="8,0 10,6 16,8 10,10 8,16 6,10 0,8 6,6" fill="currentColor" />
      </svg>
    </div>
    <div className="absolute top-1/2 right-12 w-6 h-6 border-2 border-primary/30 rounded-full" />

    <div className="container mx-auto text-center relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold text-navy-foreground mb-4">{title}</h1>
      <div className="flex items-center justify-center gap-2 text-navy-foreground/80 text-sm">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span>{breadcrumb}</span>
      </div>
    </div>
  </section>
);

export default PageBanner;
