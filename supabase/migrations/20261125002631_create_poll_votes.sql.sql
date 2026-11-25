/*
# Create fan poll votes table (single-tenant, no auth)

1. New Tables
- `poll_votes`
  - `id` (uuid, primary key)
  - `poll_id` (text, not null) — identifies which poll (e.g. "poll_atmosphere")
  - `option_id` (text, not null) — identifies the chosen option within the poll
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `poll_votes`.
- Grant CRUD to `anon` + `authenticated` so the anon-key frontend can read/write.
- Allow anon + authenticated CRUD because poll votes are intentionally shared/public.
3. Notes
- Each vote is one row; live percentages are computed by counting rows per option_id.
- Anyone can vote once per poll (enforced client-side; the table is intentionally public).
*/

CREATE TABLE IF NOT EXISTS poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id text NOT NULL,
  option_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON poll_votes TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_poll_votes" ON poll_votes;
CREATE POLICY "anon_select_poll_votes"
ON poll_votes FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_poll_votes" ON poll_votes;
CREATE POLICY "anon_insert_poll_votes"
ON poll_votes FOR INSERT
TO anon, authenticated WITH CHECK (true);
