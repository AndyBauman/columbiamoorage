"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AccommodationId,
  AddonId,
  BookingDraft,
  CalculatorMode,
} from "@/lib/types";
import { nightsBetween } from "@/lib/pricing";

const defaultDraft: BookingDraft = {
  calculatorMode: "stay",
  accommodation: "rv",
  duration: "night",
  quantity: 3,
  checkIn: "",
  checkOut: "",
  rig: "travel-trailer",
  rigLength: "20–30 ft",
  returningGuest: false,
  addons: [],
  launches: 10,
  launchTier: "annual",
  boatLength: "16–20 ft",
};

type BookingContextValue = {
  draft: BookingDraft;
  open: boolean;
  session: number;
  update: (partial: Partial<BookingDraft>) => void;
  setAccommodation: (id: AccommodationId) => void;
  setMode: (mode: CalculatorMode) => void;
  toggleAddon: (id: AddonId) => void;
  applyDates: (checkIn: string, checkOut: string) => void;
  applyRig: (rig: string) => void;
  openReservation: (partial?: Partial<BookingDraft>) => void;
  closeReservation: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function datesToStay(checkIn: string, checkOut: string): Partial<BookingDraft> {
  if (!checkIn || !checkOut || checkOut <= checkIn) {
    return { checkIn, checkOut };
  }
  const nights = nightsBetween(checkIn, checkOut);
  if (nights >= 28) {
    return {
      checkIn,
      checkOut,
      duration: "month",
      quantity: Math.min(6, Math.max(1, Math.round(nights / 30))),
    };
  }
  if (nights >= 7 && nights % 7 === 0) {
    return {
      checkIn,
      checkOut,
      duration: "week",
      quantity: Math.min(8, nights / 7),
    };
  }
    return {
      checkIn,
      checkOut,
      duration: "night",
      quantity: Math.min(27, Math.max(1, nights)),
    };
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(defaultDraft);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);

  const value = useMemo<BookingContextValue>(() => {
    const update = (partial: Partial<BookingDraft>) => {
      setDraft((current) => ({ ...current, ...partial }));
    };

    return {
      draft,
      open,
      session,
      update,
      setAccommodation: (id) => {
        setDraft((current) => ({
          ...current,
          accommodation: id,
          calculatorMode: "stay",
          rig:
            id === "cabin"
              ? "cabin"
              : id === "tent"
                ? "tent"
                : current.rig === "cabin" || current.rig === "tent"
                  ? "travel-trailer"
                  : current.rig,
          rigLength: id === "cabin" || id === "tent" ? "No rig" : current.rigLength,
        }));
      },
      setMode: (mode) => update({ calculatorMode: mode }),
      toggleAddon: (id) => {
        setDraft((current) => ({
          ...current,
          addons: current.addons.includes(id)
            ? current.addons.filter((item) => item !== id)
            : [...current.addons, id],
        }));
      },
      applyDates: (checkIn, checkOut) => {
        setDraft((current) => ({ ...current, ...datesToStay(checkIn, checkOut) }));
      },
      applyRig: (rig) => {
        setDraft((current) => ({
          ...current,
          rig,
          accommodation: rig === "cabin" ? "cabin" : rig === "tent" ? "tent" : "rv",
          rigLength: rig === "cabin" || rig === "tent" ? "No rig" : current.rigLength,
        }));
      },
      openReservation: (partial) => {
        if (partial) {
          setDraft((current) => ({ ...current, ...partial }));
        }
        setSession((current) => current + 1);
        setOpen(true);
      },
      closeReservation: () => setOpen(false),
    };
  }, [draft, open, session]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
