"use client";

import { Anchor, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV, SITE } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useBooking } from "@/components/booking-provider";

export function Header() {
  const { openReservation } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeAndGo() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-river text-driftwood">
        <p className="mx-auto hidden max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center text-[11px] tracking-wide text-driftwood/90 md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          {SITE.conditions}
        </p>
        <div className="overflow-hidden py-2 md:hidden">
          <div className="ticker flex w-max gap-10 text-[11px] tracking-wide text-driftwood/90">
            <span className="flex items-center gap-2 px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {SITE.conditions}
            </span>
            <span className="px-4" aria-hidden="true">
              {SITE.conditions}
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-river/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5 text-driftwood">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/50 bg-pine">
              <Anchor className="h-4 w-4 text-amber" aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-lg tracking-tight">Columbia</span>
              <span className="block text-[10px] tracking-[0.28em] text-driftwood/70">
                MOORAGE
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-driftwood/80 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() =>
                openReservation({ calculatorMode: "launch", launchTier: "annual" })
              }
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-amber hover:text-amber"
            >
              Buy Launch Pass
            </button>
            <button
              type="button"
              onClick={() => openReservation({ calculatorMode: "stay" })}
              className="rounded-full bg-amber px-4 py-2 text-sm font-semibold text-river transition-colors hover:bg-sunset"
            >
              Book Your Stay
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-b border-white/10 bg-pine/95 backdrop-blur-xl lg:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeAndGo}
              className="rounded-xl px-3 py-3 text-sm text-driftwood hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              closeAndGo();
              openReservation({ calculatorMode: "launch", launchTier: "annual" });
            }}
            className="mt-2 rounded-full border border-white/25 px-4 py-3 text-sm font-medium text-white"
          >
            Buy Launch Pass
          </button>
          <button
            type="button"
            onClick={() => {
              closeAndGo();
              openReservation({ calculatorMode: "stay" });
            }}
            className="rounded-full bg-amber px-4 py-3 text-sm font-semibold text-river"
          >
            Book Your Stay
          </button>
        </nav>
      </div>
    </header>
  );
}
