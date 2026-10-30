import type { AccommodationId, AddonId } from "@/lib/types";

export const SITE = {
  name: "Columbia Moorage",
  domain: "columbiamoorage.com",
  email: "reservations@columbiamoorage.com",
  conditions:
    "Ramp Status: OPEN • Launch Fee: $10/boat • Water Temp: 54°F • Wind: 6 mph W • High Slack Tide: 2:15 PM",
} as const;

export const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80",
  pines: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80",
  fog: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1800&q=80",
  lake: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1800&q=80",
  rv: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1800&q=80",
  cabin: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=80",
  cabinInterior:
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=80",
  tent: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1800&q=80",
  camp: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80",
  boat: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1800&q=80",
  kayak: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  wellness:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
  ridge: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80",
} as const;

export type Rates = {
  nightly: number;
  weekly: number;
  monthly: number;
};

export type Accommodation = {
  id: AccommodationId;
  name: string;
  eyebrow: string;
  summary: string;
  nightly: number;
  weekly: number;
  monthly: number;
  image: string;
  specs: string[];
  tags: string[];
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "rv",
    name: "Spacious Full-Hookup RV Sites",
    eyebrow: "Sites 1–40+",
    summary:
      "Pull-through and back-in pads with 30/50 amp power, water, sewer, and a level place to land after a long tow.",
    nightly: 95,
    weekly: 560,
    monthly: 1995,
    image: PHOTOS.rv,
    specs: [
      "30/50 amp power",
      "Water and sewer",
      "Level concrete or packed pads",
      "Starlink high-speed Wi-Fi",
      "Picnic table and fire ring",
      "Pull-through and back-in",
    ],
    tags: ["30/50A", "Full hookups", "Starlink", "Big rig friendly"],
  },
  {
    id: "cabin",
    name: "Waterfront Glamping Cabins",
    eyebrow: "Turnkey, no tow",
    summary:
      "Cedar cabins for anglers and weekend explorers who want a real bed, a dry place for gear, and the river outside the door.",
    nightly: 175,
    weekly: 1050,
    monthly: 3650,
    image: PHOTOS.cabin,
    specs: [
      "Queen bed and heated cabin",
      "Gear loft and rod storage",
      "Porch facing the water",
      "Shared bathhouse steps away",
      "No rig required",
    ],
    tags: ["Waterfront", "Heated", "Sleeps 2–4"],
  },
  {
    id: "tent",
    name: "Riverside Tent & Overland Sites",
    eyebrow: "Lawn pads",
    summary:
      "Scenic lawn pads a short walk from the water for rooftop tents, weekend campers, and quiet nights under the firs.",
    nightly: 49,
    weekly: 294,
    monthly: 980,
    image: PHOTOS.tent,
    specs: [
      "Level lawn pad",
      "Shared water and power pedestal nearby",
      "Picnic table and fire ring",
      "Steps from the shoreline path",
      "Fits rooftop tents and overland rigs",
    ],
    tags: ["River lawn", "Fire ring", "Overland"],
  },
];

export type Addon = {
  id: AddonId;
  name: string;
  detail: string;
  rates: Rates;
  oncePerNightlyStay: boolean;
};

export const ADDONS: Addon[] = [
  {
    id: "moorage",
    name: "Unlimited Boat Launch & Overnight Moorage",
    detail: "Ramp access and a temporary slip for every night you are on site.",
    rates: { nightly: 32, weekly: 168, monthly: 420 },
    oncePerNightlyStay: false,
  },
  {
    id: "wellness",
    name: "Cold Plunge & Cedar Barrel Sauna",
    detail: "Contrast therapy on the river deck after a long day on the water.",
    rates: { nightly: 24, weekly: 126, monthly: 320 },
    oncePerNightlyStay: false,
  },
  {
    id: "firewood",
    name: "Firewood & S'mores Camp Bundle",
    detail: "Split cedar, kindling, and a s'mores kit delivered to your site.",
    rates: { nightly: 22, weekly: 36, monthly: 64 },
    oncePerNightlyStay: true,
  },
  {
    id: "tackle",
    name: "$25 Smart Tackle & Bait Vending Credit",
    detail: "Leaders, weights, cured roe, and ice from the ramp kiosk — including 4:30 AM.",
    rates: { nightly: 25, weekly: 25, monthly: 25 },
    oncePerNightlyStay: true,
  },
];

export const LAUNCH = {
  dayRate: 10,
  peakRate: 12,
  annualPrice: 129,
  peakMonth: "July",
  perks: [
    "Express QR ramp check-in",
    "Guaranteed truck and trailer parking",
    "Two guest day-passes each month",
  ],
} as const;

export const LOYALTY_RATE = 0.12;

export const RIGS = [
  { id: "class-a", label: "Class A motorhome" },
  { id: "class-b", label: "Class B van" },
  { id: "class-c", label: "Class C motorhome" },
  { id: "travel-trailer", label: "Travel trailer" },
  { id: "fifth-wheel", label: "Fifth wheel" },
  { id: "truck-camper", label: "Truck camper" },
  { id: "cabin", label: "No rig — glamping cabin" },
  { id: "tent", label: "Tent / overland" },
] as const;

export const RIG_LENGTHS = [
  "Under 20 ft",
  "20–30 ft",
  "30–40 ft",
  "40–45 ft",
  "No rig",
] as const;

export const BOAT_LENGTHS = [
  "Under 16 ft",
  "16–20 ft",
  "21–24 ft",
  "25 ft+",
] as const;

export const AMENITIES = [
  {
    title: "Private Concrete Boat Launch & Temporary Moorage",
    copy: "Skip the 45-minute public ramp lines during salmon, steelhead, and sturgeon runs. A private concrete launch and short-term slips sit on the property, not across town.",
    image: PHOTOS.boat,
    icon: "ship" as const,
    stat: "$10",
    statLabel: "per launch today",
  },
  {
    title: "24/7 Automated Tackle, Bait & Ice Vending",
    copy: "Forgot leaders, weights, or cured roe at 4:30 AM? The smart vending kiosk on the ramp carries local Columbia River gear, ice, and bait around the clock.",
    image: PHOTOS.forest,
    icon: "fish" as const,
    stat: "24/7",
    statLabel: "ramp-side kiosk",
  },
  {
    title: "Pro Fish Cleaning Station & High-Pressure Washdown",
    copy: "Covered, well-lit stainless fillet tables with running water, and a high-pressure washdown so the boat goes home as clean as it launched.",
    image: PHOTOS.kayak,
    icon: "droplets" as const,
    stat: "Covered",
    statLabel: "stainless tables",
  },
  {
    title: "Riverfront Cold Plunge & Contrast Therapy",
    copy: "Recover after a long day on the water. Cold plunge tubs and a cedar barrel sauna sit on a deck with an open view of the river.",
    image: PHOTOS.wellness,
    icon: "flame" as const,
    stat: "Cedar",
    statLabel: "sauna & plunge",
  },
];

export const MAP_ZONES = [
  {
    id: "river",
    name: "Columbia River Shoreline",
    kicker: "Open water",
    price: "Steps from every site",
    summary:
      "The working edge of the property. Dawn launches, evening slack tide, and a quiet path between the ramp and the lawns.",
    specs: ["Salmon, steelhead, and sturgeon water", "Shoreline path", "No public-ramp queue"],
  },
  {
    id: "ramp",
    name: "Boat Ramp & Trailer Parking",
    kicker: "Private launch",
    price: "$10 day · $129 annual",
    summary:
      "Concrete ramp with a dedicated truck-and-trailer court. Annual members check in with a QR code and park in the reserved rows.",
    specs: ["Concrete launch", "Trailer parking", "QR express check-in", "$10 until July, then $12"],
  },
  {
    id: "rv",
    name: "RV Row · Sites 1–40+",
    kicker: "Full hookups",
    price: "From $95 / night",
    summary:
      "A long, level row of pull-through and back-in sites with 30/50 amp service, water, sewer, and Starlink at the pedestal.",
    specs: ["Sites 1–40 occupied row", "30/50 amp", "Pull-through & back-in", "Picnic tables"],
  },
  {
    id: "expand",
    name: "Future Expansion Zone",
    kicker: "Next season",
    price: "Seasonal inventory",
    summary:
      "Graded ground held for the next row of full-hookup sites. Ask about seasonal commitments if you want first look when pads open.",
    specs: ["Held for expansion", "Early seasonal inquiries welcome"],
  },
  {
    id: "cabins",
    name: "Glamping Cabins",
    kicker: "Turnkey",
    price: "From $175 / night",
    summary:
      "A short cluster of cedar cabins between the firs and the water. Built for people who fish hard and sleep well.",
    specs: ["Heated cabins", "Porch toward the river", "Rod storage"],
  },
  {
    id: "kiosk",
    name: "Tackle Vending Kiosk",
    kicker: "Ramp-side",
    price: "$25 credit",
    summary:
      "Automated tackle, bait, and ice on the way to the ramp. Stocked for Columbia River methods, available before first light.",
    specs: ["Leaders, weights, cured roe", "Ice", "Open 24/7"],
  },
  {
    id: "wellness",
    name: "Wellness Deck",
    kicker: "Recover",
    price: "From $24 / night",
    summary:
      "Cold plunge tubs and a cedar barrel sauna on a deck above the shoreline. Book it with your stay or ask about day access.",
    specs: ["Cold plunge", "Cedar barrel sauna", "River view"],
  },
] as const;

export type MapZoneId = (typeof MAP_ZONES)[number]["id"];

export const FAQS = [
  {
    q: "What do the full-hookup RV sites include?",
    a: "Each RV site has 30 and 50 amp power, water, sewer, a level pad, a picnic table, and a fire ring. Pull-through and back-in layouts are both on the row. Starlink Wi-Fi covers the park.",
  },
  {
    q: "How does the private boat launch work?",
    a: "Day launches are $10 per boat through June. Starting in July the day rate moves to $12. Pull up, pay or show your annual pass, and launch on the private concrete ramp — you are not waiting in the public line. Temporary moorage can be added to a stay.",
  },
  {
    q: "What does the annual launch membership include?",
    a: "Unlimited launches for $129, locked before the July day-rate increase. Members get express QR check-in, guaranteed truck and trailer parking, and two guest day-passes each month.",
  },
  {
    q: "Can I stay if I am not towing a rig?",
    a: "Yes. Waterfront glamping cabins are turnkey, and the riverside lawn pads fit tents and overland setups. Cabins are the right call if you want a bed and a dry place for gear.",
  },
  {
    q: "Do you offer weekly, monthly, or seasonal rates?",
    a: "Yes. Weekly and monthly stays price below the nightly rack rate automatically. Returning guests and early seasonal commitments can lock an additional 12% loyalty rate. Use the calculator, then send a reservation request.",
  },
  {
    q: "Is the tackle shop actually open before dawn?",
    a: "The kiosk is automated and stocked 24/7 with local Columbia River tackle, bait, and ice. A $25 vending credit can be added to any stay.",
  },
  {
    q: "Are pets welcome?",
    a: "Leashed, well-mannered dogs are welcome on RV and tent sites and must be attended around the ramp, fish station, and wellness deck. Cabins are confirmed pet-by-pet when you request the stay.",
  },
  {
    q: "Is this form a charged booking?",
    a: "No payment is collected here. Your request holds the rate you built and sends a reference code. A host confirms availability by email. Nothing is charged until you accept that confirmation.",
  },
];

export const NAV = [
  { href: "#stays", label: "Ways to Stay" },
  { href: "#launch", label: "Boat Launch & Moorage" },
  { href: "#calculator", label: "Pricing Calculator" },
  { href: "#amenities", label: "Angler Amenities" },
  { href: "#faq", label: "FAQ" },
] as const;
