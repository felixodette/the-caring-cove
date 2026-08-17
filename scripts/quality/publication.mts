export function publicationAllows(record: {
  publication_state?: string;
  status?: string;
}): boolean {
  const state = record.publication_state ?? record.status;
  return state === "approved";
}

export function claimIsPublic(
  claim: { status: string; expiry?: string },
  now = new Date(),
): boolean {
  if (claim.status !== "approved") return false;
  if (claim.expiry && new Date(claim.expiry) <= now) return false;
  return true;
}

export function payloadHasCrLf(value: string): boolean {
  return /[\r\n]/.test(value);
}
