import { ACCOMMODATIONS, ADDONS, LAUNCH, LOYALTY_RATE, type Rates } from "@/lib/data";
import type {
  AccommodationId,
  BookingDraft,
  Duration,
  LaunchQuote,
  StayQuote,
} from "@/lib/types";

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const start = checkIn.split("-").map(Number);
  const end = checkOut.split("-").map(Number);
  if (start.length !== 3 || end.length !== 3) return 0;
  const utcStart = Date.UTC(start[0], start[1] - 1, start[2]);
  const utcEnd = Date.UTC(end[0], end[1] - 1, end[2]);
  return Math.round((utcEnd - utcStart) / 86_400_000);
}

export function accommodationById(id: AccommodationId) {
  const match = ACCOMMODATIONS.find((item) => item.id === id);
  if (!match) throw new Error(`Unknown accommodation: ${id}`);
  return match;
}

export function durationNoun(duration: Duration, quantity: number) {
  const noun =
    duration === "night" ? "night" : duration === "week" ? "week" : "month";
  return `${quantity} ${noun}${quantity === 1 ? "" : "s"}`;
}

function scaleRate(rates: Rates, duration: Duration, quantity: number) {
  if (duration === "night") {
    const weeks = Math.floor(quantity / 7);
    const remainder = quantity % 7;
    const charge = weeks * rates.weekly + remainder * rates.nightly;
    const rack = quantity * rates.nightly;
    return { charge, rack, savings: rack - charge };
  }

  if (duration === "week") {
    const charge = quantity * rates.weekly;
    const rack = quantity * 7 * rates.nightly;
    return { charge, rack, savings: rack - charge };
  }

  const charge = quantity * rates.monthly;
  const rack = quantity * 30 * rates.nightly;
  return { charge, rack, savings: rack - charge };
}

function periodRate(rates: Rates, duration: Duration, quantity: number) {
  if (duration === "night") return rates.nightly;
  if (duration === "week") return rates.weekly * quantity;
  return rates.monthly * quantity;
}

export function quoteStay(draft: BookingDraft): StayQuote {
  const stay = accommodationById(draft.accommodation);
  const quantity = Math.max(1, draft.quantity);
  const scaled = scaleRate(stay, draft.duration, quantity);
  const loyaltySavings = draft.returningGuest
    ? Math.round(scaled.charge * LOYALTY_RATE)
    : 0;

  const addonLines = ADDONS.filter((addon) => draft.addons.includes(addon.id)).map(
    (addon) => {
      const amount = addon.oncePerNightlyStay
        ? periodRate(addon.rates, draft.duration, quantity)
        : scaleRate(addon.rates, draft.duration, quantity).charge;
      return { label: addon.name, amount };
    },
  );

  const addonTotal = addonLines.reduce((sum, line) => sum + line.amount, 0);

  return {
    mode: "stay",
    title: stay.name,
    durationLabel: durationNoun(draft.duration, quantity),
    accommodationRack: scaled.rack,
    accommodationCharge: scaled.charge,
    volumeSavings: scaled.savings,
    loyaltySavings,
    addonLines,
    addonTotal,
    total: scaled.charge - loyaltySavings + addonTotal,
    totalSavings: scaled.savings + loyaltySavings,
  };
}

export function quoteLaunch(draft: BookingDraft): LaunchQuote {
  const launches = Math.min(40, Math.max(1, draft.launches));
  const dailyCost = launches * LAUNCH.dayRate;
  const peakCost = launches * LAUNCH.peakRate;
  const breakEvenLaunches = Math.ceil(LAUNCH.annualPrice / LAUNCH.dayRate);
  const peakBreakEvenLaunches = Math.ceil(LAUNCH.annualPrice / LAUNCH.peakRate);
  const annual = draft.launchTier === "annual";

  return {
    mode: "launch",
    tier: draft.launchTier,
    launches,
    dayRate: LAUNCH.dayRate,
    peakRate: LAUNCH.peakRate,
    annualPrice: LAUNCH.annualPrice,
    dailyCost,
    peakCost,
    breakEvenLaunches,
    peakBreakEvenLaunches,
    savingsNow: dailyCost - LAUNCH.annualPrice,
    savingsAtPeak: peakCost - LAUNCH.annualPrice,
    total: annual ? LAUNCH.annualPrice : LAUNCH.dayRate,
    title: annual ? "Unlimited Annual Launch Membership" : "Express Day Launch Pass",
  };
}

export function quoteFor(draft: BookingDraft): StayQuote | LaunchQuote {
  return draft.calculatorMode === "stay" ? quoteStay(draft) : quoteLaunch(draft);
}
