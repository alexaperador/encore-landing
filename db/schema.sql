-- Encore early-access waiting list.
-- Run once in the Neon SQL editor, or with `npm run db:setup`.
CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
