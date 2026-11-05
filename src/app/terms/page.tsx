import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing access to and use of the DPDP MatriX website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow fade-up">Legal</p>
          <h1 className="title">
            <span className="line"><span style={{ ["--i" as string]: 0 }}>Terms &amp;</span></span>
            <span className="line"><span style={{ ["--i" as string]: 1 }}>Conditions<span className="accent">.</span></span></span>
          </h1>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container legal">
          <div className="legal__meta">
            <span>Last updated <b>{terms.updated}</b></span>
          </div>
          <div className="legal__main" style={{ gridColumn: "1 / -1" }}>
            {terms.sections.map((s, i) => (
              <Reveal key={s.heading}>
                <section className="legal__sec">
                  <span className="legal__num">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{s.heading}</h2>
                  <div className="legal__body"><p>{s.body.includes("ameer@dpdpmatrix.in") ? (
                    <>{s.body.split("ameer@dpdpmatrix.in")[0]}<a href="mailto:ameer@dpdpmatrix.in">ameer@dpdpmatrix.in</a>{s.body.split("ameer@dpdpmatrix.in")[1]}</>
                  ) : s.body}</p></div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
