"use client";

import { Check, Minus, Plus } from "lucide-react";
import { ACCOMMODATIONS, ADDONS, LAUNCH } from "@/lib/data";
import type { Duration } from "@/lib/types";
import { cn } from "@/lib/cn";
import { durationNoun, formatMoney, quoteLaunch, quoteStay } from "@/lib/pricing";
import { useBooking } from "@/components/booking-provider";

const DURATIONS: { id: Duration; label: string; max: number }[] = [
  { id: "night", label: "Nightly", max: 27 },
  { id: "week", label: "Weekly", max: 8 },
  { id: "month", label: "Monthly", max: 6 },
];

export function Calculator() {
  const { draft, update, setMode, setAccommodation, toggleAddon, openReservation } =
    useBooking();
  const stayQuote = quoteStay(draft);
  const launchQuote = quoteLaunch(draft);
  const duration = DURATIONS.find((item) => item.id === draft.duration) ?? DURATIONS[0];

  return (
    <section id="calculator" className="scroll-mt-28 bg-driftwood py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            Pricing calculator
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-river sm:text-5xl">
            Build the rate. Then lock it.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Weekly and monthly stays discount themselves. Returning guests and early
            seasonal commitments take another 12% off the stay. Launch math is just
            as plain: day rate versus unlimited.
          </p>
        </div>

        <div className="mt-8 inline-flex rounded-full bg-stone p-1" role="tablist" aria-label="Calculator mode">
          <button
            type="button"
            role="tab"
            aria-selected={draft.calculatorMode === "stay"}
            onClick={() => setMode("stay")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold",
              draft.calculatorMode === "stay" ? "bg-river text-white" : "text-muted",
            )}
          >
            Stay customizer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={draft.calculatorMode === "launch"}
            onClick={() => setMode("launch")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold",
              draft.calculatorMode === "launch" ? "bg-river text-white" : "text-muted",
            )}
          >
            Launch membership
          </button>
        </div>

        {draft.calculatorMode === "stay" ? (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.7fr)]">
            <div className="space-y-6">
              <fieldset>
                <legend className="text-sm font-semibold text-river">Accommodation</legend>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {ACCOMMODATIONS.map((stay) => {
                    const selected = draft.accommodation === stay.id;
                    return (
                      <button
                        key={stay.id}
                        type="button"
                        onClick={() => setAccommodation(stay.id)}
                        aria-pressed={selected}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition-colors",
                          selected
                            ? "border-amber bg-white shadow-[0_16px_40px_-28px_rgba(217,119,6,0.8)]"
                            : "border-river/10 bg-white/70 hover:border-river/25",
                        )}
                      >
                        <span className="block text-sm font-semibold text-river">{stay.name}</span>
                        <span className="mt-2 block font-serif text-2xl text-river">
                          {formatMoney(stay.nightly)}
                          <span className="ml-1 font-sans text-xs font-medium text-muted">/ night</span>
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {formatMoney(stay.weekly)} weekly · {formatMoney(stay.monthly)} monthly
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="rounded-3xl border border-river/10 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-river">Duration</p>
                  <div className="flex rounded-full bg-stone p-1">
                    {DURATIONS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          update(
                            draft.duration === item.id
                              ? { duration: item.id }
                              : { duration: item.id, quantity: 1 },
                          )
                        }
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold",
                          draft.duration === item.id ? "bg-river text-white" : "text-muted",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <button
                    type="button"
                    aria-label="Decrease duration"
                    onClick={() => update({ quantity: Math.max(1, draft.quantity - 1) })}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-river/15"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min={1}
                      max={duration.max}
                      value={Math.min(duration.max, draft.quantity)}
                      aria-valuetext={durationNoun(draft.duration, draft.quantity)}
                      onChange={(event) => update({ quantity: Number(event.target.value) })}
                      className="w-full accent-amber"
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted">
                      <span>1</span>
                      <span className="font-semibold text-river">
                        {durationNoun(draft.duration, draft.quantity)}
                      </span>
                      <span>{duration.max}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Increase duration"
                    onClick={() =>
                      update({ quantity: Math.min(duration.max, draft.quantity + 1) })
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-river/15"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 text-xs text-muted">
                  Seven nights on this slider use the weekly rate. Choose Monthly for a seasonal stay.
                </p>
              </div>

              <button
                type="button"
                aria-pressed={draft.returningGuest}
                onClick={() => update({ returningGuest: !draft.returningGuest })}
                className={cn(
                  "flex w-full items-start gap-4 rounded-3xl border p-5 text-left",
                  draft.returningGuest
                    ? "border-amber bg-amber/10"
                    : "border-river/10 bg-white",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors",
                    draft.returningGuest ? "bg-amber" : "bg-river/15",
                  )}
                >
                  <span
                    className={cn(
                      "h-4 w-4 rounded-full bg-white transition-transform",
                      draft.returningGuest && "translate-x-5",
                    )}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-river">
                    Returning guest / VIP early lock-in
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    Past renters and early seasonal commitments hold a loyalty rate — 12% off the stay.
                  </span>
                </span>
              </button>

              <fieldset>
                <legend className="text-sm font-semibold text-river">Add-ons</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {ADDONS.map((addon) => {
                    const selected = draft.addons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={cn(
                          "flex cursor-pointer gap-3 rounded-2xl border p-4",
                          selected ? "border-amber bg-white" : "border-river/10 bg-white/70",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-1 accent-amber"
                        />
                        <span>
                          <span className="block text-sm font-semibold text-river">{addon.name}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-muted">
                            {addon.detail}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            <aside className="rounded-3xl bg-river p-6 text-driftwood lg:sticky lg:top-32">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-amber uppercase">
                Live summary
              </p>
              <h3 className="mt-2 font-serif text-3xl text-white">{stayQuote.title}</h3>
              <p className="mt-1 text-sm text-driftwood/70">{stayQuote.durationLabel}</p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt>Rack rate</dt>
                  <dd>{formatMoney(stayQuote.accommodationRack)}</dd>
                </div>
                {stayQuote.volumeSavings > 0 && (
                  <div className="flex justify-between gap-4 text-amber">
                    <dt>Volume discount</dt>
                    <dd>−{formatMoney(stayQuote.volumeSavings)}</dd>
                  </div>
                )}
                {stayQuote.loyaltySavings > 0 && (
                  <div className="flex justify-between gap-4 text-amber">
                    <dt>Loyalty rate, 12%</dt>
                    <dd>−{formatMoney(stayQuote.loyaltySavings)}</dd>
                  </div>
                )}
                {stayQuote.addonLines.map((line) => (
                  <div key={line.label} className="flex justify-between gap-4">
                    <dt className="max-w-[14rem]">{line.label}</dt>
                    <dd>{formatMoney(line.amount)}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-5">
                <p className="text-sm text-driftwood/70">Total</p>
                <p className="font-serif text-4xl text-white">{formatMoney(stayQuote.total)}</p>
              </div>
              {stayQuote.totalSavings > 0 && (
                <p className="mt-2 text-sm text-amber">
                  You save {formatMoney(stayQuote.totalSavings)} against nightly rack.
                </p>
              )}
              <button
                type="button"
                onClick={() => openReservation({ calculatorMode: "stay" })}
                className="mt-6 w-full rounded-full bg-amber px-5 py-3.5 text-sm font-semibold text-river hover:bg-sunset"
              >
                Lock In This Custom Rate
              </button>
              <p className="mt-3 text-center text-xs text-driftwood/60">
                Request only. No payment due now.
              </p>
            </aside>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.7fr)]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-river/10 bg-white p-6">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm font-semibold text-river">How many times do you launch per year?</p>
                  <p className="font-serif text-5xl text-river">
                    {draft.launches}
                    {draft.launches >= 40 ? "+" : ""}
                  </p>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={draft.launches}
                  aria-valuetext={`${draft.launches}${draft.launches >= 40 ? " or more" : ""} launches`}
                  onChange={(event) => update({ launches: Number(event.target.value) })}
                  className="mt-6 w-full accent-amber"
                />
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>1 launch</span>
                  <span>40+</span>
                </div>
                <p className="mt-5 rounded-2xl bg-amber/10 px-4 py-3 text-sm leading-relaxed text-river">
                  Peak-season day rate increases to {formatMoney(LAUNCH.peakRate)} per launch
                  starting in {LAUNCH.peakMonth}. The annual membership stays{" "}
                  {formatMoney(LAUNCH.annualPrice)} if you lock it now.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => update({ launchTier: "day" })}
                  className={cn(
                    "rounded-3xl border p-5 text-left",
                    draft.launchTier === "day" ? "border-river bg-white" : "border-river/10 bg-white/60",
                  )}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Pay as you go</p>
                  <p className="mt-3 font-serif text-4xl text-river">{formatMoney(launchQuote.dailyCost)}</p>
                  <p className="mt-1 text-sm text-muted">
                    {launchQuote.launches} × {formatMoney(LAUNCH.dayRate)} today
                  </p>
                  <p className="mt-4 text-sm text-sunset">
                    Same season at the July rate: {formatMoney(launchQuote.peakCost)}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => update({ launchTier: "annual" })}
                  className={cn(
                    "rounded-3xl border p-5 text-left",
                    draft.launchTier === "annual"
                      ? "border-amber bg-amber/10"
                      : "border-river/10 bg-white/60",
                  )}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-amber uppercase">
                    Unlimited annual
                  </p>
                  <p className="mt-3 font-serif text-4xl text-river">{formatMoney(LAUNCH.annualPrice)}</p>
                  <p className="mt-1 text-sm text-muted">Every launch, all year</p>
                  <ul className="mt-4 space-y-2">
                    {LAUNCH.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-river">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            </div>

            <aside className="rounded-3xl bg-river p-6 text-driftwood lg:sticky lg:top-32">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-amber uppercase">
                Break-even
              </p>
              <h3 className="mt-2 font-serif text-3xl leading-tight text-white">{launchQuote.title}</h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-driftwood/60">Break-even launch count</dt>
                  <dd className="mt-1 font-serif text-4xl text-white">
                    {launchQuote.breakEvenLaunches}
                    <span className="ml-2 font-sans text-sm text-driftwood/70">at $10</span>
                  </dd>
                  <dd className="text-xs text-driftwood/60">
                    {launchQuote.peakBreakEvenLaunches} launches once the day rate is $12
                  </dd>
                </div>
                <div className="border-t border-white/15 pt-4">
                  <dt className="text-driftwood/60">Annual dollar savings</dt>
                  <dd className="mt-1 font-serif text-3xl text-amber">
                    {launchQuote.savingsNow > 0
                      ? formatMoney(launchQuote.savingsNow)
                      : formatMoney(0)}
                  </dd>
                  <dd className="mt-1 text-xs leading-relaxed text-driftwood/70">
                    {launchQuote.savingsNow > 0
                      ? `Versus paying $${LAUNCH.dayRate} each time. At the July rate you save ${formatMoney(launchQuote.savingsAtPeak)}.`
                      : `${launchQuote.breakEvenLaunches - launchQuote.launches} more launch${launchQuote.breakEvenLaunches - launchQuote.launches === 1 ? "" : "es"} and the annual pass is cheaper than day fees.`}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => openReservation({ calculatorMode: "launch" })}
                className="mt-6 w-full rounded-full bg-amber px-5 py-3.5 text-sm font-semibold text-river hover:bg-sunset"
              >
                {draft.launchTier === "annual" ? "Lock In Annual Pass" : "Reserve a Day Pass"}
              </button>
              <p className="mt-3 text-center text-xs text-driftwood/60">
                Request only. No payment due now.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
