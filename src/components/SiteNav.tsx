import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import navLogo from "@/assets/2.png";

const items = [
  { to: "/", label: "Overview" },
  { to: "/colors", label: "Colors" },
  { to: "/typography", label: "Typography" },
  { to: "/logos", label: "Logos" },
  { to: "/review", label: "Review" },
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav
        aria-label="Draft sections"
        className="page-shell flex min-h-[72px] sm:min-h-[80px] py-2 items-center justify-between gap-4"
      >
        <Link to="/" className="shrink-0 flex items-center" onClick={() => setMenuOpen(false)}>
          <img
            src={navLogo}
            alt="Clouds & Spirits"
            className="h-10 sm:h-14 w-auto max-w-[200px] sm:max-w-[240px] object-contain object-left"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="-mx-2 hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="inline-flex h-11 items-center rounded-lg px-3.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-surface data-[status=active]:text-foreground data-[status=active]:font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="label-xs hidden shrink-0 sm:inline">Draft 01</span>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Drawer */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="page-shell space-y-1">
            <div className="mb-2 flex items-center justify-between px-3 py-1.5">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </span>
              <span className="label-xs">Draft 01</span>
            </div>
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center rounded-xl px-4 text-[15px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground data-[status=active]:bg-primary/10 data-[status=active]:font-medium data-[status=active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal ScrollBar for quick mobile tapping */}
      <div className="border-t border-border md:hidden overflow-x-auto bg-surface/50">
        <ul className="page-shell flex items-center gap-1 py-1.5 min-w-max">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="inline-flex h-9 items-center whitespace-nowrap rounded-lg px-3 text-[13px] text-muted-foreground data-[status=active]:bg-primary/10 data-[status=active]:font-medium data-[status=active]:text-primary"
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
