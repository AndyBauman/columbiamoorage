"use client";

import { useState } from "react";
import { MAP_ZONES, type MapZoneId } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useBooking } from "@/components/booking-provider";

const ZONE_CLASS: Record<MapZoneId, string> = {
  river: "left-[4%] top-[82%] h-[14%] w-[92%]",
  ramp: "left-[5%] top-[60%] h-[19%] w-[27%]",
  rv: "left-[5%] top-[6%] h-[24%] w-[58%]",
  expand: "left-[66%] top-[6%] h-[24%] w-[29%]",
  cabins: "left-[5%] top-[34%] h-[22%] w-[42%]",
  kiosk: "left-[34%] top-[60%] h-[19%] w-[29%]",
  wellness: "left-[66%] top-[34%] h-[22%] w-[29%]",
};

export function SiteMap() {
  const [active, setActive] = useState<MapZoneId>("ramp");
  const { setAccommodation, setMode, toggleAddon, openReservation, draft } = useBooking();
  const zone = MAP_ZONES.find((item) => item.id === active) ?? MAP_ZONES[0];

  function useZone() {
    if (active === "rv") {
      setAccommodation("rv");
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (active === "cabins") {
      setAccommodation("cabin");
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (active === "ramp" || active === "river") {
      setMode("launch");
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (active === "kiosk") {
      setMode("stay");
      if (!draft.addons.includes("tackle")) toggleAddon("tackle");
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (active === "wellness") {
      setMode("stay");
      if (!draft.addons.includes("wellness")) toggleAddon("wellness");
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    openReservation({ calculatorMode: "stay" });
  }

  return (
    <section id="map" className="scroll-mt-28 bg-stone py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.7fr)]">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            Park layout
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-river sm:text-5xl">
            Walk the property before you book it
          </h2>
          <div className="relative mt-8 aspect-[16/11] overflow-hidden rounded-[2rem] border border-river/10 bg-[#10241c] shadow-[0_30px_70px_-40px_rgba(13,31,24,0.7)]">
            <svg
              viewBox="0 0 800 520"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <rect width="800" height="520" fill="#163028" />
              <path
                d="M0 340 C120 300 180 390 300 360 C430 328 480 410 620 370 C700 348 760 390 800 360 L800 520 L0 520 Z"
                fill="#0c3d49"
              />
              <path
                d="M0 360 C140 330 200 410 320 378 C450 344 500 424 640 388 C720 368 770 408 800 382"
                fill="none"
                stroke="#d97706"
                strokeOpacity="0.55"
                strokeWidth="2"
              />
              <path
                d="M70 70 H500 V190 H70 Z"
                fill="#1d3b30"
                stroke="#f3efea"
                strokeOpacity="0.18"
              />
              <path d="M90 100 H470" stroke="#f3efea" strokeOpacity="0.25" />
              <path d="M90 130 H470" stroke="#f3efea" strokeOpacity="0.18" />
              <path d="M90 160 H470" stroke="#f3efea" strokeOpacity="0.12" />
              <path
                d="M530 70 H730 V190 H530 Z"
                fill="#1a332b"
                stroke="#d97706"
                strokeOpacity="0.45"
                strokeDasharray="6 6"
              />
              <path d="M380 230 H590 V320 H380 Z" fill="#234237" />
              <path d="M530 230 H730 V310 H530 Z" fill="#2a4034" />
              <circle cx="250" cy="400" r="36" fill="#0e4c5c" />
              <rect x="300" y="378" width="120" height="48" rx="8" fill="#12352c" />
            </svg>

            {(Object.keys(ZONE_CLASS) as MapZoneId[]).map((id) => {
              const item = MAP_ZONES.find((zoneItem) => zoneItem.id === id);
              if (!item) return null;
              const selected = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  aria-pressed={selected}
                  className={cn(
                    "absolute rounded-2xl border px-3 py-2 text-left transition-colors",
                    ZONE_CLASS[id],
                    selected
                      ? "border-amber bg-amber/25 text-white"
                      : "border-white/25 bg-river/40 text-driftwood hover:border-white/60",
                    "overflow-hidden",
                  )}
                >
                  <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase">
                    {item.kicker}
                  </span>
                  <span className="mt-1 hidden font-serif text-sm leading-tight sm:line-clamp-2 sm:block">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted">
            Stylized layout for planning. Site numbers are assigned when a stay is confirmed.
          </p>
        </div>

        <aside className="rounded-3xl bg-white p-6 lg:sticky lg:top-32">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-amber uppercase">
            {zone.kicker}
          </p>
          <h3 className="mt-2 font-serif text-3xl text-river">{zone.name}</h3>
          <p className="mt-2 text-sm font-semibold text-sunset">{zone.price}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{zone.summary}</p>
          <ul className="mt-5 space-y-2">
            {zone.specs.map((spec) => (
              <li key={spec} className="flex gap-2 text-sm text-ink">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                {spec}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={useZone}
            className="mt-6 w-full rounded-full bg-river px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
          >
            {active === "expand" ? "Ask about seasonal sites" : "Use this in your quote"}
          </button>
        </aside>
      </div>
    </section>
  );
}
