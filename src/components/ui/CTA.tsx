import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { SITE } from "@/lib/constants";

export function CTA({ title = "Have a DPDP question that needs a plan?" }: { title?: string }) {
  return (
    <section className="section--ink cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__inner">
          <p className="eyebrow">Get in touch</p>
          <h2 className="h2" id="cta-title">{title}</h2>
          <p className="lede">
            Tell me what you’re working on. I read every message myself and will tell you honestly whether I can help.
          </p>
          <div className="cta__row">
            <Button href={`mailto:${SITE.email}`} variant="primary">{SITE.email}</Button>
            <Button href="/contact" variant="outline-inv" arrow={false}>Other ways to reach me</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
