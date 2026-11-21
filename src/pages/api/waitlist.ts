import type { APIRoute } from 'astro';
import { addToWaitlist, getSql } from '@/lib/db';
import { checkEmail, type WaitlistResponse, type WaitlistStatus } from '@/lib/email';

// This endpoint runs on the server for every request; the rest of the site is static.
export const prerender = false;

const MAX_BODY_BYTES = 2_048;
const RATE_LIMIT = { windowMs: 60_000, max: 8 };

// Best-effort, per-instance rate limiting. For multi-instance deployments,
// add a shared limiter at the edge (e.g. your host's firewall rules).
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

function reply(status: WaitlistStatus, httpStatus: number): Response {
  const body: WaitlistResponse = { status };
  return new Response(JSON.stringify(body), {
    status: httpStatus,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // JSON only: browsers cannot send it cross-site without a CORS preflight,
  // which this endpoint never grants. That keeps plain-form CSRF out.
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return reply('invalid', 415);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return reply('invalid', 413);

  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    // Some hosts do not expose the client address; fall back to a shared bucket.
  }
  if (rateLimited(ip)) return reply('rateLimited', 429);

  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return reply('invalid', 413);
    payload = JSON.parse(text);
  } catch {
    return reply('invalid', 400);
  }

  const { email, website } = (payload ?? {}) as { email?: unknown; website?: unknown };

  // Honeypot: a field people never see. Bots that fill it are turned away without storing anything.
  if (typeof website === 'string' && website.trim() !== '') return reply('invalid', 400);

  const check = checkEmail(email);
  if (!check.ok) return reply(check.reason, 422);

  const sql = getSql();
  if (!sql) {
    console.error('[waitlist] DATABASE_URL is not set. See README → Neon configuration.');
    return reply('server', 503);
  }

  try {
    const result = await addToWaitlist(sql, check.email);
    return result === 'inserted' ? reply('success', 201) : reply('duplicate', 409);
  } catch (error) {
    // Log the failure without the address itself.
    console.error('[waitlist] Database error:', error instanceof Error ? error.message : error);
    return reply('server', 500);
  }
};

export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST' } });
