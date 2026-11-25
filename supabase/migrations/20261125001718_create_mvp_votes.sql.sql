/*
# Create MVP votes table (single-tenant, no auth)

1. New Tables
- `mvp_votes`
  - `id` (uuid, primary key)
  - `player_id` (text, not null) — identifies the 2026/27 player (e.g. "worwa", "malasinski", "roberts")
  - `player_name` (text, not null) — display name of the voted player
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `mvp_votes`.
- Grant CRUD to `anon` + `authenticated` so the anon-key frontend can read/write.
- Allow anon + authenticated CRUD because votes are intentionally shared/public for the live demo.
3. Notes
- Each vote is one row; live percentages are computed by counting rows per player_id.
- Anyone can vote; the table is intentionally public/shared (single-tenant demo).
*/

CREATE TABLE IF NOT EXISTS mvp_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id text NOT NULL,
  player_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mvp_votes ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON mvp_votes TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_mvp_votes" ON mvp_votes;
CREATE POLICY "anon_select_mvp_votes"
ON mvp_votes FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_mvp_votes" ON mvp_votes;
CREATE POLICY "anon_insert_mvp_votes"
ON mvp_votes FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_mvp_votes" ON mvp_votes;
CREATE POLICY "anon_delete_mvp_votes"
ON mvp_votes FOR DELETE
TO anon, authenticated USING (true);
