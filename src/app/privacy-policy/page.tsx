import type { Metadata } from "next";
import { Fragment } from "react";
import { Toc } from "@/components/legal/Toc";
import { Reveal } from "@/components/ui/Reveal";
import { policyMeta, policySections, policyVersions, type Block } from "@/lib/policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DPDP MatriX collects, uses, stores and protects personal data, and how Data Principals can exercise their rights under the DPDP Act, 2023.",
  alternates: { canonical: "/privacy-policy" },
};

function Linkify({ text }: { text: string }) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.-]+)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part) ? (
          <a key={i} href={`mailto:${part}`}>{part}</a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        "p" in b ? (
          <p key={i}>{b.p}</p>
        ) : (
          <ul key={i}>
            {b.ul.map((it, j) => (
              <li key={j}>
                {it.lead ? <><b>{it.lead}:</b> </> : null}
                <Linkify text={it.text} />
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

export default function PrivacyPolicyPage() {
  const toc = policySections.map((s) => ({ id: s.id, title: s.title }));
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow fade-up">Legal</p>
          <h1 className="title">
            <span className="line"><span style={{ ["--i" as string]: 0 }}>Privacy <span className="accent">Policy</span></span></span>
          </h1>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container legal">
          <div className="legal__meta">
            <span>Current version <b>{policyMeta.version}</b></span>
            <span>Effective date <b>{policyMeta.effective}</b></span>
            <span>Last reviewed &amp; updated <b>{policyMeta.reviewed}</b></span>
          </div>

          <Toc items={toc} />

          <div className="legal__main">
            {policySections.map((s, i) => (
              <Reveal key={s.id}>
                <section className="legal__sec" id={s.id} aria-labelledby={`${s.id}-h`}>
                  <span className="legal__num">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={`${s.id}-h`}>{s.title}</h2>
                  <div className="legal__body">
                    <Blocks blocks={s.blocks} />
                    {s.id === "version-history" ? (
                      <table className="vtable">
                        <thead>
                          <tr><th scope="col">Version</th><th scope="col">Release date</th><th scope="col">Approved by</th></tr>
                        </thead>
                        <tbody>
                          {policyVersions.map((v) => (
                            <tr key={v.version}><td>{v.version}</td><td>{v.date}</td><td>{v.approvedBy}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
