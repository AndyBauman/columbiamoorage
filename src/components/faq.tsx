"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-driftwood py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            FAQ
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-river sm:text-5xl">
            The practical answers
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Hookups, the ramp, the July rate, and what a request actually does. If your
            rig or boat is an edge case, put it in the reservation note by choosing the
            closest size — a host will confirm.
          </p>
        </div>
        <div className="divide-y divide-river/10 border-y border-river/10">
          {FAQS.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-serif text-xl text-river">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-amber transition-transform",
                      expanded && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
