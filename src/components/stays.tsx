"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ACCOMMODATIONS } from "@/lib/data";
import type { AccommodationId } from "@/lib/types";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/pricing";
import { Photo } from "@/components/photo";
import { useBooking } from "@/components/booking-provider";

const FILTERS: { id: "all" | AccommodationId; label: string }[] = [
  { id: "all", label: "All stays" },
  { id: "rv", label: "RV sites" },
  { id: "cabin", label: "Glamping cabins" },
  { id: "tent", label: "Tent & overland" },
];

export function Stays() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const { setAccommodation } = useBooking();
  const stays =
    filter === "all"
      ? ACCOMMODATIONS
      : ACCOMMODATIONS.filter((stay) => stay.id === filter);

  return (
    <section id="stays" className="scroll-mt-28 bg-driftwood py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
              Ways to stay
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-river sm:text-5xl">
              Three ways to wake up on the river
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Full hookups for the rig you actually drive, cabins if you flew in with
              rods, and lawn pads if the point is the water and a fire.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter stays">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  filter === item.id
                    ? "bg-river text-white"
                    : "bg-stone text-river hover:bg-river/10",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {stays.map((stay, index) => (
            <article
              key={stay.id}
              className={cn(
                "group overflow-hidden rounded-3xl border border-river/10 bg-white shadow-[0_24px_60px_-40px_rgba(13,31,24,0.45)]",
                stays.length === 3 && index === 0 ? "lg:col-span-7" : "lg:col-span-5",
                stays.length < 3 && "lg:col-span-6",
              )}
            >
              <div className={cn("relative", index === 0 && stays.length === 3 ? "h-80" : "h-64")}>
                <Photo
                  src={stay.image}
                  alt={stay.name}
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-river/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 text-[11px] font-semibold tracking-[0.22em] text-white uppercase">
                  {stay.eyebrow}
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl text-river">{stay.name}</h3>
                  <p className="shrink-0 text-right">
                    <span className="block font-serif text-2xl text-river">
                      {formatMoney(stay.nightly)}
                    </span>
                    <span className="text-xs text-muted">per night</span>
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stay.summary}</p>
                {stay.gallery && stay.gallery.length > 1 ? (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {stay.gallery.map((src, photoIndex) => (
                      <div
                        key={src}
                        className="relative h-20 overflow-hidden rounded-xl sm:h-24"
                      >
                        <Photo
                          src={src}
                          alt={`${stay.name}, view ${photoIndex + 1}`}
                          sizes="160px"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stay.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-stone px-2.5 py-1 text-[11px] font-semibold tracking-wide text-pine uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 grid gap-2 text-sm text-ink sm:grid-cols-2">
                  {stay.specs.map((spec) => (
                    <li key={spec} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setAccommodation(stay.id);
                    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-sunset"
                >
                  Price this stay
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
