import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container">
        <p className="eyebrow fade-up">Error 404</p>
        <p className="nf__code" aria-hidden="true">4<span>0</span>4</p>
        <h1 className="h2" style={{ marginTop: 24 }}>That page doesn’t exist.</h1>
        <p className="lede" style={{ marginTop: 20 }}>The link may be old, or the page may have moved.</p>
        <div className="hero__actions">
          <Button href="/" variant="primary">Back to home</Button>
          <Button href="/contact" variant="ghost">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}
