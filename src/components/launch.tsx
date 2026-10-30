"use client";

import { ArrowRight } from "lucide-react";
import { LAUNCH, PHOTOS } from "@/lib/data";
import { formatMoney } from "@/lib/pricing";
import { Photo } from "@/components/photo";
import { useBooking } from "@/components/booking-provider";

const POINTS = [
  {
    figure: formatMoney(LAUNCH.dayRate),
    label: "Day launch through June",
  },
  {
    figure: formatMoney(LAUNCH.annualPrice),
    label: "Unlimited annual, locked now",
  },
  {
    figure: "QR",
    label: "Express ramp check-in for members",
  },
];

export function Launch() {
  const { setMode, openReservation } = useBooking();

  return (
    <section id="launch" className="scroll-mt-28 bg-stone py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div className="relative min-h-[440px] overflow-hidden rounded-[2rem]">
          <Photo
            src={PHOTOS.boat}
            alt="A fishing boat ready for an early launch"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-river/80 via-river/10 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-serif text-3xl text-white">
            Your ramp. Not the public queue.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            Boat launch & moorage
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-river sm:text-5xl">
            On the water while the public ramp is still sorting trailers
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Columbia Moorage keeps a private concrete launch and temporary slips on
            the property. During salmon, steelhead, and sturgeon runs, that is the
            difference between a 4:40 AM start and a 45-minute line.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {POINTS.map((point) => (
              <div key={point.label} className="rounded-2xl bg-white px-4 py-4">
                <dt className="font-serif text-3xl text-river">{point.figure}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted">{point.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setMode("launch");
                document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-river px-5 py-3 text-sm font-semibold text-white hover:bg-pine"
            >
              Run the launch calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() =>
                openReservation({ calculatorMode: "launch", launchTier: "annual" })
              }
              className="rounded-full border border-river/15 px-5 py-3 text-sm font-semibold text-river hover:border-amber"
            >
              Lock the annual pass
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
