// Creates the waitlist table in Neon. Usage: npm run db:setup (reads DATABASE_URL from .env).
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.');
  process.exit(1);
}

const sql = neon(url);
const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const statements = schema
  .split(';')
  .map((s) => s.replace(/--.*$/gm, '').trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM waitlist`;
console.log(`waitlist table is ready (${count} rows).`);
