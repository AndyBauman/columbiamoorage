"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { BOAT_LENGTHS, LAUNCH, RIG_LENGTHS, RIGS } from "@/lib/data";
import { formatMoney, quoteLaunch, quoteStay } from "@/lib/pricing";
import { submitInquiry } from "@/lib/submit-inquiry";
import type { LaunchTier } from "@/lib/types";
import { cn } from "@/lib/cn";
import { useBooking } from "@/components/booking-provider";

export function ReservationModal() {
  const { open, session, closeReservation } = useBooking();

  return (
    <AnimatePresence>
      {open ? <ModalDialog key={session} onClose={closeReservation} /> : null}
    </AnimatePresence>
  );
}

function ModalDialog({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const { draft, update, applyDates, applyRig } = useBooking();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState("");

  const stayQuote = quoteStay(draft);
  const launchQuote = quoteLaunch(draft);

  useEffect(() => {
    const node = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    node?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab" || !node) return;
      const items = [
        ...node.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea"),
      ].filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Add the name for the reservation.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Use a real email so the host can confirm.";
    }
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Add a phone number.";
    if (draft.calculatorMode === "stay" && draft.checkIn && draft.checkOut && draft.checkOut <= draft.checkIn) {
      next.dates = "Check-out needs to be after check-in.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setFormError("");
    try {
      const result = await submitInquiry({
        intent: draft.calculatorMode,
        contact: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || undefined,
        },
        note: note.trim() || undefined,
        draft,
        quote: draft.calculatorMode === "stay" ? stayQuote : launchQuote,
        submittedAt: new Date().toISOString(),
      });
      setReference(result.reference);
      setStep(3);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-river/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={reduce ? undefined : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: 12 }}
        className="max-h-[100svh] w-full overflow-y-auto rounded-t-3xl bg-driftwood p-5 text-ink shadow-2xl outline-none sm:max-h-[90svh] sm:max-w-xl sm:rounded-3xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-amber uppercase">
              {step === 3 ? "Request received" : `Step ${step} of 2`}
            </p>
            <h2 id={titleId} className="mt-1 font-serif text-3xl text-river">
              {step === 3
                ? "You are on the list"
                : draft.calculatorMode === "stay"
                  ? "Reserve this stay"
                  : "Reserve this pass"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-river/10"
            aria-label="Close reservation form"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {step === 1 && (
          <div className="mt-6">
            {draft.calculatorMode === "stay" ? (
              <SummaryRows
                rows={[
                  [stayQuote.title, stayQuote.durationLabel],
                  ["Rack rate", formatMoney(stayQuote.accommodationRack)],
                  ...(stayQuote.volumeSavings > 0
                    ? [["Volume discount", `−${formatMoney(stayQuote.volumeSavings)}`] as const]
                    : []),
                  ...(stayQuote.loyaltySavings > 0
                    ? [["Loyalty rate", `−${formatMoney(stayQuote.loyaltySavings)}`] as const]
                    : []),
                  ...stayQuote.addonLines.map((line) => [line.label, formatMoney(line.amount)] as const),
                  ...(draft.checkIn ? [["Dates", `${draft.checkIn} → ${draft.checkOut || "open"}`] as const] : []),
                ]}
                total={formatMoney(stayQuote.total)}
              />
            ) : (
              <SummaryRows
                rows={[
                  [launchQuote.title, draft.launchTier === "annual" ? "Unlimited" : "Single launch"],
                  [
                    "Compared with day fees",
                    `${launchQuote.launches}${launchQuote.launches >= 40 ? "+" : ""} × ${formatMoney(LAUNCH.dayRate)} = ${formatMoney(launchQuote.dailyCost)}`,
                  ],
                  ["Break-even", `${launchQuote.breakEvenLaunches} launches at today’s rate`],
                ]}
                total={formatMoney(launchQuote.total)}
              />
            )}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-6 w-full rounded-full bg-river px-5 py-3.5 text-sm font-semibold text-white hover:bg-pine"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit();
            }}
          >
            <Field label="Name" error={errors.name}>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className={inputClass}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  className={inputClass}
                />
              </Field>
            </div>

            {draft.calculatorMode === "stay" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Rig type">
                    <select
                      value={draft.rig}
                      onChange={(event) => applyRig(event.target.value)}
                      className={inputClass}
                    >
                      {RIGS.map((rig) => (
                        <option key={rig.id} value={rig.id}>
                          {rig.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Rig length">
                    <select
                      value={draft.rigLength}
                      onChange={(event) => update({ rigLength: event.target.value })}
                      className={inputClass}
                    >
                      {RIG_LENGTHS.map((length) => (
                        <option key={length} value={length}>
                          {length}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Check-in" error={errors.dates}>
                    <input
                      type="date"
                      value={draft.checkIn}
                      onChange={(event) => applyDates(event.target.value, draft.checkOut)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Check-out">
                    <input
                      type="date"
                      value={draft.checkOut}
                      min={draft.checkIn || undefined}
                      onChange={(event) => applyDates(draft.checkIn, event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Boat length, if you are launching">
                  <select
                    value={draft.boatLength}
                    onChange={(event) => update({ boatLength: event.target.value })}
                    className={inputClass}
                  >
                    {BOAT_LENGTHS.map((length) => (
                      <option key={length} value={length}>
                        {length}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            ) : (
              <>
                <Field label="Membership tier">
                  <div className="grid grid-cols-2 gap-2">
                    {(["day", "annual"] as LaunchTier[]).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => update({ launchTier: tier })}
                        className={cn(
                          "rounded-xl border px-3 py-3 text-sm font-semibold",
                          draft.launchTier === tier
                            ? "border-amber bg-amber/10 text-river"
                            : "border-river/10 bg-white text-muted",
                        )}
                      >
                        {tier === "day" ? `$10 day pass` : `$129 annual`}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Boat length">
                  <select
                    value={draft.boatLength}
                    onChange={(event) => update({ boatLength: event.target.value })}
                    className={inputClass}
                  >
                    {BOAT_LENGTHS.map((length) => (
                      <option key={length} value={length}>
                        {length}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred launch date">
                  <input
                    type="date"
                    value={draft.checkIn}
                    onChange={(event) => update({ checkIn: event.target.value })}
                    className={inputClass}
                  />
                </Field>
              </>
            )}

            <Field label="Note for the host">
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Rig quirks, early launch, seasonal dates…"
              />
            </Field>

            <div className="sr-only" aria-hidden="true">
              <label>
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </label>
            </div>

            {formError && <p className="text-sm text-sunset">{formError}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border border-river/15 px-5 py-3 text-sm font-semibold text-river"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-full bg-amber px-5 py-3 text-sm font-semibold text-river hover:bg-sunset disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send reservation request"}
              </button>
            </div>
            <p className="text-center text-xs text-muted">
              No payment is taken. A host confirms availability at this rate.
            </p>
          </form>
        )}

        {step === 3 && (
          <div className="mt-6">
            <p className="text-sm leading-relaxed text-muted">
              {name.split(" ")[0]}, your {draft.calculatorMode === "stay" ? "stay" : "pass"} request
              is in. We will reply at {email} to confirm availability before anything is charged.
            </p>
            <p className="mt-6 text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
              Reference
            </p>
            <p className="mt-1 font-mono text-3xl tracking-wider text-river">{reference}</p>
            <dl className="mt-6 space-y-2 rounded-2xl bg-white p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Request</dt>
                <dd className="text-right font-medium text-river">
                  {draft.calculatorMode === "stay" ? stayQuote.title : launchQuote.title}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Quoted total</dt>
                <dd className="font-medium text-river">
                  {formatMoney(draft.calculatorMode === "stay" ? stayQuote.total : launchQuote.total)}
                </dd>
              </div>
              {draft.calculatorMode === "stay" && draft.checkIn && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Dates</dt>
                  <dd className="text-river">
                    {draft.checkIn}
                    {draft.checkOut ? ` → ${draft.checkOut}` : ""}
                  </dd>
                </div>
              )}
              {draft.calculatorMode === "launch" && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Boat</dt>
                  <dd className="text-river">{draft.boatLength}</dd>
                </div>
              )}
            </dl>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-river px-5 py-3.5 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-river/10 bg-white px-3 py-2.5 text-sm text-ink outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-xs font-semibold tracking-wide text-muted uppercase">
      {label}
      {children}
      {error && <span className="mt-1 block text-xs font-medium normal-case text-sunset">{error}</span>}
    </label>
  );
}

function SummaryRows({
  rows,
  total,
}: {
  rows: readonly (readonly [string, string])[];
  total: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <dl className="space-y-2 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted">{label}</dt>
            <dd className="text-right font-medium text-river">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-end justify-between border-t border-river/10 pt-4">
        <p className="text-sm text-muted">Quoted total</p>
        <p className="font-serif text-3xl text-river">{total}</p>
      </div>
    </div>
  );
}
