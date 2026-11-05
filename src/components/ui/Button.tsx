import Link from "next/link";
import { ArrowUpRight } from "./Icons";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "paper" | "outline-inv" | "secondary";
  arrow?: boolean;
  external?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  external,
  className = "",
  target,
  rel,
  style,
  onClick,
}: Props) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? <ArrowUpRight /> : null}
    </>
  );

  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        target={target || (href.startsWith("http") ? "_blank" : undefined)}
        rel={rel || (href.startsWith("http") ? "noopener noreferrer" : undefined)}
        style={style}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} style={style} onClick={onClick}>
      {inner}
    </Link>
  );
}
