export type AccommodationId = "rv" | "cabin" | "tent";
export type Duration = "night" | "week" | "month";
export type AddonId = "moorage" | "wellness" | "firewood" | "tackle";
export type CalculatorMode = "stay" | "launch";
export type LaunchTier = "day" | "annual";

export type BookingDraft = {
  calculatorMode: CalculatorMode;
  accommodation: AccommodationId;
  duration: Duration;
  quantity: number;
  checkIn: string;
  checkOut: string;
  rig: string;
  rigLength: string;
  returningGuest: boolean;
  addons: AddonId[];
  launches: number;
  launchTier: LaunchTier;
  boatLength: string;
};

export type LineItem = {
  label: string;
  amount: number;
};

export type StayQuote = {
  mode: "stay";
  title: string;
  durationLabel: string;
  accommodationRack: number;
  accommodationCharge: number;
  volumeSavings: number;
  loyaltySavings: number;
  addonLines: LineItem[];
  addonTotal: number;
  total: number;
  totalSavings: number;
};

export type LaunchQuote = {
  mode: "launch";
  tier: LaunchTier;
  launches: number;
  dayRate: number;
  peakRate: number;
  annualPrice: number;
  dailyCost: number;
  peakCost: number;
  breakEvenLaunches: number;
  peakBreakEvenLaunches: number;
  savingsNow: number;
  savingsAtPeak: number;
  total: number;
  title: string;
};

export type InquiryPayload = {
  intent: CalculatorMode;
  contact: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  note?: string;
  draft: BookingDraft;
  quote: StayQuote | LaunchQuote;
  submittedAt: string;
};
