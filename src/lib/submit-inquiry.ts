import type { InquiryPayload } from "@/lib/types";

type InquiryResponse = {
  ok: boolean;
  reference?: string;
  error?: string;
};

export async function submitInquiry(payload: InquiryPayload) {
  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: InquiryResponse | null = null;
  try {
    data = (await response.json()) as InquiryResponse;
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok || !data.reference) {
    throw new Error(data?.error ?? "We could not send your request. Please try again.");
  }

  return { reference: data.reference };
}
