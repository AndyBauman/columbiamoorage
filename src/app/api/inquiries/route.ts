import type { InquiryPayload } from "@/lib/types";

function isInquiry(value: unknown): value is InquiryPayload {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<InquiryPayload>;
  const contact = record.contact;
  if (!contact || typeof contact !== "object") return false;
  return (
    (record.intent === "stay" || record.intent === "launch") &&
    typeof contact.name === "string" &&
    contact.name.trim().length > 1 &&
    typeof contact.email === "string" &&
    contact.email.includes("@") &&
    typeof contact.phone === "string" &&
    contact.phone.trim().length > 6
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isInquiry(body)) {
    return Response.json(
      { ok: false, error: "Name, email, and phone are required." },
      { status: 400 },
    );
  }

  const reference = `CM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  // Honeypot: pretend success and skip the webhook.
  if (body.contact.company) {
    return Response.json({ ok: true, reference });
  }

  // Connect a webhook later by setting INQUIRY_WEBHOOK_URL. This is the only line that has to change.
  if (process.env.INQUIRY_WEBHOOK_URL) {
    const forwarded = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, reference }),
    });
    if (!forwarded.ok) {
      return Response.json(
        { ok: false, error: "We could not send your request. Please try again." },
        { status: 502 },
      );
    }
  }

  return Response.json({ ok: true, reference });
}
