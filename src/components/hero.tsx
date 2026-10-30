"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarRange, ShieldCheck } from "lucide-react";
import { LAUNCH, PHOTOS, RIG_LENGTHS, RIGS } from "@/lib/data";
import { cn } from "@/lib/cn";
import { Photo } from "@/components/photo";
import { useBooking } from "@/components/booking-provider";
import { formatMoney } from "@/lib/pricing";

const PROOF = [
  "Full 30/50A Hookups",
  "Private Boat Ramp",
  "24/7 Tackle & Bait",
  "Riverfront Wellness",
];

export function Hero() {
  const reduce = useReducedMotion();
  const { draft, update, applyDates, applyRig, setMode, openReservation } = useBooking();
  const stayTab = draft.calculatorMode === "stay";

  function jumpToQuote() {
    setMode("stay");
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="relative isolate flex min-h-[calc(100svh-6.75rem)] overflow-hidden bg-river text-driftwood">
      <Photo
        src={PHOTOS.hero}
        alt="Still alpine water and ridgelines in the kind of light Columbia River mornings hold"
        priority
        sizes="100vw"
        className="scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-river/95 via-river/55 to-river/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-river/80 via-transparent to-river/30" />

      <div className="relative mx-auto grid w-full flex-1 items-center gap-10 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <motion.div
          initial={reduce ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            Pacific Northwest riverfront
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Where the Columbia River Meets{" "}
            <span className="italic text-amber">Effortless Basecamp Living</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-driftwood/85 sm:text-lg">
            A private ramp, full-hookup sites, and a cedar-quiet place to sleep between
            steelhead alarms. Built for people who take the river seriously and the rest
            of camp lightly.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {PROOF.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-md"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="rounded-3xl border border-white/40 bg-driftwood p-3 text-ink shadow-[0_30px_80px_-36px_rgba(0,0,0,0.65)]"
        >
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-stone p-1">
            <button
              type="button"
              onClick={() => setMode("stay")}
              className={cn(
                "rounded-xl px-3 py-3 text-sm font-semibold transition-colors",
                stayTab ? "bg-white text-river shadow-sm" : "text-muted hover:text-river",
              )}
            >
              RV & Glamping Stays
            </button>
            <button
              type="button"
              onClick={() => setMode("launch")}
              className={cn(
                "rounded-xl px-3 py-3 text-sm font-semibold transition-colors",
                !stayTab ? "bg-white text-river shadow-sm" : "text-muted hover:text-river",
              )}
            >
              Express Boat Launch
            </button>
          </div>

          {stayTab ? (
            <div className="space-y-4 px-2 py-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-semibold tracking-wide text-muted uppercase">
                  Check-in
                  <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-river/10 bg-white px-3 py-2.5">
                    <CalendarRange className="h-4 w-4 text-amber" aria-hidden="true" />
                    <input
                      type="date"
                      value={draft.checkIn}
                      onChange={(event) => applyDates(event.target.value, draft.checkOut)}
                      className="w-full bg-transparent text-sm font-medium text-ink outline-none"
                    />
                  </span>
                </label>
                <label className="block text-xs font-semibold tracking-wide text-muted uppercase">
                  Check-out
                  <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-river/10 bg-white px-3 py-2.5">
                    <CalendarRange className="h-4 w-4 text-amber" aria-hidden="true" />
                    <input
                      type="date"
                      value={draft.checkOut}
                      min={draft.checkIn || undefined}
                      onChange={(event) => applyDates(draft.checkIn, event.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-ink outline-none"
                    />
                  </span>
                </label>
              </div>
              <label className="block text-xs font-semibold tracking-wide text-muted uppercase">
                Rig, cabin, or tent
                <select
                  value={draft.rig}
                  onChange={(event) => applyRig(event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-river/10 bg-white px-3 py-2.5 text-sm font-medium text-ink outline-none"
                >
                  {RIGS.map((rig) => (
                    <option key={rig.id} value={rig.id}>
                      {rig.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-semibold tracking-wide text-muted uppercase">
                Length
                <select
                  value={draft.rigLength}
                  onChange={(event) => update({ rigLength: event.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-river/10 bg-white px-3 py-2.5 text-sm font-medium text-ink outline-none"
                >
                  {RIG_LENGTHS.map((length) => (
                    <option key={length} value={length}>
                      {length}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={jumpToQuote}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-river px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine"
              >
                Jump to live quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="space-y-3 px-2 py-5">
              <p className="px-1 text-sm leading-relaxed text-muted">
                Day launches are {formatMoney(LAUNCH.dayRate)} through June. In{" "}
                {LAUNCH.peakMonth} the day rate moves to {formatMoney(LAUNCH.peakRate)}.
                Lock unlimited launches at {formatMoney(LAUNCH.annualPrice)} before that.
              </p>
              <button
                type="button"
                onClick={() =>
                  openReservation({ calculatorMode: "launch", launchTier: "day" })
                }
                className="flex w-full items-center justify-between rounded-2xl border border-river/10 bg-white px-4 py-4 text-left transition-colors hover:border-amber"
              >
                <span>
                  <span className="block text-sm font-semibold text-river">Instant day pass</span>
                  <span className="mt-1 block text-xs text-muted">One boat, one launch</span>
                </span>
                <span className="font-serif text-2xl text-river">{formatMoney(LAUNCH.dayRate)}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  openReservation({ calculatorMode: "launch", launchTier: "annual" })
                }
                className="flex w-full items-center justify-between rounded-2xl border border-amber bg-amber/10 px-4 py-4 text-left"
              >
                <span>
                  <span className="block text-sm font-semibold text-river">
                    Early-bird annual pass
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    Unlimited launches, locked before July
                  </span>
                </span>
                <span className="font-serif text-2xl text-river">
                  {formatMoney(LAUNCH.annualPrice)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("launch");
                  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-river"
              >
                Compare the break-even
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
