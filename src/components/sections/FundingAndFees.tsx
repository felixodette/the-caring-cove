"use client";

import { motion } from "framer-motion";
import siteContent from "@/content/site-content.json";

type FeesRow = {
  package: string;
  standardFrom: number;
  ensuiteFrom: number;
  note: string;
};

const content = (siteContent.servicesPage as {
  fundingAndFees: {
    title: string;
    subtitle: string;
    pricingTitle: string;
    columns: { package: string; standard: string; ensuite: string; note: string };
    rows: FeesRow[];
    disclaimer: string;
  };
}).fundingAndFees;

function formatKsh(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export default function FundingAndFees() {
  return (
    <section
      id="funding-fees"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.25) 0%, transparent 55%)",
      }} />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle text-primary/90">{content.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-primary-foreground/85 max-w-3xl mx-auto">
            {content.pricingTitle}
          </p>
        </motion.div>

        {/* Desktop table */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-navy/90 text-navy-foreground">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold">
                    {content.columns.package}
                  </th>
                  <th className="px-6 py-4 text-sm font-bold">
                    {content.columns.standard}
                  </th>
                  <th className="px-6 py-4 text-sm font-bold">
                    {content.columns.ensuite}
                  </th>
                  <th className="px-6 py-4 text-sm font-bold">
                    {content.columns.note}
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row, i) => (
                  <tr
                    key={row.package}
                    className={
                      i % 2 === 0 ? "bg-white/90" : "bg-white/80"
                    }
                  >
                    <td className="px-6 py-5 font-semibold text-foreground">
                      {row.package}
                    </td>
                    <td className="px-6 py-5 text-foreground font-semibold">
                      <span className="text-muted-foreground font-normal">From{" "}</span>
                      {formatKsh(row.standardFrom)}
                    </td>
                    <td className="px-6 py-5 text-foreground font-semibold">
                      <span className="text-muted-foreground font-normal">From{" "}</span>
                      {formatKsh(row.ensuiteFrom)}
                    </td>
                    <td className="px-6 py-5 text-muted-foreground">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-5 lg:hidden">
          {content.rows.map((row, i) => (
            <motion.div
              key={row.package}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/8 border border-white/12 rounded-2xl p-6 shadow-sm backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-white">
                  {row.package}
                </h3>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/8 border border-white/12 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70 mb-1">
                    {content.columns.standard}
                  </p>
                  <p className="text-white font-bold">
                    <span className="text-primary-foreground/70 font-semibold">From{" "}</span>
                    {formatKsh(row.standardFrom)}
                  </p>
                </div>
                <div className="rounded-xl bg-white/8 border border-white/12 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70 mb-1">
                    {content.columns.ensuite}
                  </p>
                  <p className="text-white font-bold">
                    <span className="text-primary-foreground/70 font-semibold">From{" "}</span>
                    {formatKsh(row.ensuiteFrom)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-primary-foreground/80">{row.note}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-primary-foreground/70 max-w-4xl mx-auto">
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}

