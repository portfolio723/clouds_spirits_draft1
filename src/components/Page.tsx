import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pt-6 sm:pt-10 pb-8 md:pt-24 md:pb-14">
      <p className="label-xs">{label}</p>
      <h1 className="mt-3 text-[32px] md:text-[44px]">{title}</h1>
      {intro ? (
        <p className="mt-3 max-w-[62ch] text-[16px] text-muted-foreground md:text-[17px]">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[26px] md:text-[30px]">{children}</h2>;
}

type NavLink = { to: string; label: string };

export function PageFooterNav({ prev, next }: { prev?: NavLink; next?: NavLink }) {
  return (
    <nav
      aria-label="Draft navigation"
      className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-border py-10 md:mt-28"
    >
      {prev ? (
        <Link
          to={prev.to as "/"}
          className="inline-flex h-12 items-center rounded-xl border border-border-strong bg-background px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface"
        >
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.to as "/"}
          className="inline-flex h-12 items-center rounded-xl bg-primary px-6 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {next.label} →
        </Link>
      ) : null}
    </nav>
  );
}
