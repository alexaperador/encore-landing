/**
 * Email validation shared by the browser and the API route,
 * so both sides accept and reject exactly the same addresses.
 */
export const EMAIL_MAX_LENGTH = 255; // matches VARCHAR(255) in the waitlist table

// Pragmatic RFC 5322 subset: one @, a local part without spaces,
// and a domain with at least one dot and a 2+ letter TLD.
const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,63}$/;

export type EmailCheck =
  | { ok: true; email: string }
  | { ok: false; reason: 'required' | 'invalid' | 'tooLong' };

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function checkEmail(raw: unknown): EmailCheck {
  if (typeof raw !== 'string' || raw.trim() === '') return { ok: false, reason: 'required' };
  const email = normalizeEmail(raw);
  if (email.length > EMAIL_MAX_LENGTH) return { ok: false, reason: 'tooLong' };
  const [local = ''] = email.split('@');
  if (local.length > 64 || email.includes('..') || local.startsWith('.') || local.endsWith('.')) {
    return { ok: false, reason: 'invalid' };
  }
  if (!EMAIL_PATTERN.test(email)) return { ok: false, reason: 'invalid' };
  return { ok: true, email };
}

/** Codes returned by POST /api/waitlist. The page maps each one to translated copy. */
export type WaitlistStatus =
  | 'success'
  | 'duplicate'
  | 'invalid'
  | 'required'
  | 'tooLong'
  | 'rateLimited'
  | 'server';

export interface WaitlistResponse {
  status: WaitlistStatus;
}
