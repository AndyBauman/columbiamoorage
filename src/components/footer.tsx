"use client";

import { Anchor } from "lucide-react";
import { NAV, SITE } from "@/lib/data";
import { useBooking } from "@/components/booking-provider";

export function ClosingBand() {
  const { openReservation } = useBooking();

  return (
    <section className="bg-pine py-20 text-driftwood">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            Hold the rate
          </p>
          <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
            The river does not wait on a public ramp.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openReservation({ calculatorMode: "launch", launchTier: "annual" })}
            className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-amber"
          >
            Buy Launch Pass
          </button>
          <button
            type="button"
            onClick={() => openReservation({ calculatorMode: "stay" })}
            className="rounded-full bg-amber px-5 py-3 text-sm font-semibold text-river hover:bg-sunset"
          >
            Book Your Stay
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-river text-driftwood">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-serif text-2xl">
            <Anchor className="h-5 w-5 text-amber" aria-hidden="true" />
            Columbia Moorage
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-driftwood/70">
            Riverfront RV resort, private boat launch, and angler basecamp on the
            Columbia River.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-driftwood/80 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#map" className="text-driftwood/80 hover:text-white">
                Park layout
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-amber uppercase">Reservations</p>
          <p className="mt-4 text-sm text-driftwood/80">
            <a href={`mailto:${SITE.email}`} className="hover:text-white">
              {SITE.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-driftwood/60">{SITE.domain}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-driftwood/50">
          © 2026 Columbia Moorage. Reservation requests are confirmed by email before any payment.
        </p>
      </div>
    </footer>
  );
}
