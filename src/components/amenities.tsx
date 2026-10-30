import { Droplets, Fish, Flame, Ship } from "lucide-react";
import { AMENITIES } from "@/lib/data";
import { Photo } from "@/components/photo";

const ICONS = {
  ship: Ship,
  fish: Fish,
  droplets: Droplets,
  flame: Flame,
};

export function Amenities() {
  return (
    <section id="amenities" className="scroll-mt-28 bg-river py-24 text-driftwood md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber uppercase">
            Angler amenities
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Why the serious boats stop here
          </h2>
          <p className="mt-4 text-base leading-relaxed text-driftwood/75">
            The high-margin conveniences other launches still treat as a rumor: a ramp
            you do not share with the county, gear at 4:30 AM, a real fillet table, and
            a way to warm back up.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {AMENITIES.map((amenity) => {
            const Icon = ICONS[amenity.icon];
            return (
              <article
                key={amenity.title}
                className="overflow-hidden rounded-3xl border border-white/10 bg-pine"
              >
                <div className="relative h-64">
                  <Photo
                    src={amenity.image}
                    alt={amenity.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/10 to-transparent" />
                  <p className="absolute bottom-4 left-4">
                    <span className="block font-serif text-3xl text-white">{amenity.stat}</span>
                    <span className="text-xs tracking-wide text-driftwood/80 uppercase">
                      {amenity.statLabel}
                    </span>
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-serif text-2xl leading-snug text-white">{amenity.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-driftwood/75">{amenity.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
