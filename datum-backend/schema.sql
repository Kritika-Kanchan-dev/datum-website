-- ============================================================
--  DATUM — Data Science Club
--  Supabase SQL Schema
--  Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── Enable UUID extension ───────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Events Table ────────────────────────────────────────────
create table if not exists events (
  id            uuid        default gen_random_uuid() primary key,
  title         text        not null,
  description   text,
  date          date        not null,
  time          text,
  location      text,
  category      text        default 'Workshop'
                            check (category in ('Workshop','Competition','Talk','Series','Other')),
  image         text,
  register_link text,
  tag           text        default 'EVENT',
  is_upcoming   boolean     default true,
  created_at    timestamptz default now()
);

-- ── Team Members Table ──────────────────────────────────────
create table if not exists team_members (
  id          uuid        default gen_random_uuid() primary key,
  name        text        not null,
  role        text        not null,
  year        text,
  team        text        not null
              check (team in ('Leadership','Tech Team','Event Management','Media & Video','Design Team','PR Team')),
  avatar      text,           -- 2-letter initials fallback
  photo_url   text,           -- Cloudinary URL
  color       text,           -- tailwind gradient class
  linkedin    text,
  github      text,
  order_index integer     default 0,
  created_at  timestamptz default now()
);

-- ── Gallery Table ───────────────────────────────────────────
create table if not exists gallery (
  id         uuid        default gen_random_uuid() primary key,
  src        text        not null,
  caption    text,
  tag        text        default 'Event'
             check (tag in ('DataThon','Workshop','Talk','Team','Event')),
  created_at timestamptz default now()
);

-- ── Row Level Security (RLS) ────────────────────────────────
-- Public can read everything
alter table events        enable row level security;
alter table team_members  enable row level security;
alter table gallery       enable row level security;

create policy "Public read events"
  on events for select using (true);

create policy "Public read team"
  on team_members for select using (true);

create policy "Public read gallery"
  on gallery for select using (true);

-- NOTE: Write operations are handled server-side via
--       the service role key (bypasses RLS).
--       Never expose the service key to the frontend.

-- ── Indexes ─────────────────────────────────────────────────
create index if not exists events_date_idx       on events (date desc);
create index if not exists events_upcoming_idx   on events (is_upcoming);
create index if not exists team_order_idx        on team_members (order_index);
create index if not exists gallery_created_idx   on gallery (created_at desc);

-- ── Sample Seed Data (optional) ─────────────────────────────
-- Uncomment to insert test data:

/*
insert into events (title, description, date, location, category, is_upcoming, tag) values
  ('DataThon 3.0', 'Our biggest datathon yet — 400+ participants, ₹2L prize pool.', '2025-09-20', 'Main Auditorium', 'Competition', true, 'FLAGSHIP'),
  ('Deep Learning Bootcamp', '2-day intensive bootcamp on CNNs, RNNs, and Transformers.', '2025-08-05', 'CS Lab, Block B', 'Workshop', true, 'WORKSHOP');

insert into team_members (name, role, team, avatar, order_index) values
  ('Arjun Kapoor',   'President',          'Leadership',        'AK', 1),
  ('Neha Singh',     'Vice President',     'Leadership',        'NS', 2),
  ('Rishi Verma',    'General Secretary',  'Leadership',        'RV', 3),
  ('Divya Nair',     'Tech Head',          'Tech Team',         'DN', 10),
  ('Shubham Tiwari', 'Tech Co-Head',       'Tech Team',         'ST', 11);
*/
