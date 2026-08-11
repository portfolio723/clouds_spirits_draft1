import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Overview" },
  { to: "/colors", label: "Colors" },
  { to: "/typography", label: "Typography" },
  { to: "/logos", label: "Logos" },
  { to: "/review", label: "Review" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav
        aria-label="Draft sections"
        className="page-shell flex h-16 items-center justify-between gap-6"
      >
        <Link to="/" className="shrink-0 font-display text-[17px] tracking-tight text-foreground">
          Clouds &amp; Spirits
        </Link>

        <ul className="-mx-2 hidden items-center gap-1 overflow-x-auto md:flex">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="inline-flex h-11 items-center rounded-lg px-3 text-[14px] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-surface data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="label-xs hidden shrink-0 sm:inline">Draft 01</span>
      </nav>

      <div className="border-t border-border md:hidden">
        <ul className="page-shell flex items-center gap-1 overflow-x-auto py-2">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="inline-flex h-11 items-center whitespace-nowrap rounded-lg px-3 text-[14px] text-muted-foreground data-[status=active]:bg-surface data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
