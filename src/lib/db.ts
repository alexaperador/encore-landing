import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { DATABASE_URL } from 'astro:env/server';

let client: NeonQueryFunction<false, false> | null = null;

/**
 * Lazily creates the Neon client. Returns null when DATABASE_URL is missing,
 * so the API can answer with a clear error instead of pretending to succeed.
 * This module is server-only: it is imported exclusively by /api routes.
 */
export function getSql(): NeonQueryFunction<false, false> | null {
  if (!DATABASE_URL) return null;
  client ??= neon(DATABASE_URL);
  return client;
}

export type InsertResult = 'inserted' | 'duplicate';

/** Adds an email to the waitlist. Uses a parameterised query and the UNIQUE constraint for de-duplication. */
export async function addToWaitlist(sql: NeonQueryFunction<false, false>, email: string): Promise<InsertResult> {
  const rows = await sql`
    INSERT INTO waitlist (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `;
  return rows.length > 0 ? 'inserted' : 'duplicate';
}
