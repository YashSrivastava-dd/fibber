/**
 * Phone-only user identification (no Firebase UID).
 * Use these helpers so system email and doc IDs are consistent across APIs.
 */

export function normalizePhone(phone?: string | null): string {
  return phone ? phone.replace(/\D/g, '') : ''
}

/** Stable system email for checkout/orders, derived only from phone. */
export function systemEmailFromPhone(phone?: string | null): string {
  const digits = normalizePhone(phone)
  return digits ? `phone_${digits}@fiberisefit.com` : ''
}
