# Datum — Data Science Club Website

A full-stack website for the Datum Data Science Club built with React + Vite, Tailwind CSS, Supabase, and Cloudinary.

## 🚀 Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Frontend  | React 18 + Vite          |
| Styling   | Tailwind CSS v3          |
| Routing   | React Router DOM v6      |
| Animation | Framer Motion            |
| Backend   | Node.js + Express (REST) |
| Database  | Supabase (PostgreSQL)    |
| Storage   | Cloudinary               |

## 📁 Project Structure

```
datum/
├── src/
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── About.jsx       # Vision & Mission
│   │   ├── Team.jsx        # Team members
│   │   ├── Events.jsx      # Events (upcoming + past)
│   │   ├── Gallery.jsx     # Photo gallery
│   │   └── Admin.jsx       # Admin portal
│   ├── components/
│   │   └── common/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   └── ThemeContext.jsx # Dark/Light theme
│   └── utils/
│       ├── supabase.js     # DB helpers
│       └── data.js         # Static data
├── tailwind.config.js
├── vite.config.js
└── .env.example
```

## ⚡ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in your Supabase URL, anon key, Cloudinary name, and admin password.

### 3. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Open the **SQL Editor** and run this schema:

```sql
-- Events table
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  date date not null,
  time text,
  location text,
  category text default 'Workshop',
  image text,
  register_link text,
  is_upcoming boolean default true,
  created_at timestamptz default now()
);

-- Team members table
create table team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  year text,
  team text,
  avatar text,
  photo_url text,
  color text,
  linkedin text,
  github text,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- Gallery table
create table gallery (
  id uuid default gen_random_uuid() primary key,
  src text not null,
  caption text,
  tag text default 'Event',
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table events enable row level security;
alter table team_members enable row level security;
alter table gallery enable row level security;

-- Public read policy
create policy "public read" on events for select using (true);
create policy "public read" on team_members for select using (true);
create policy "public read" on gallery for select using (true);

-- Anon write policy (lock this down with service_role in production)
create policy "anon write" on events for all using (true);
create policy "anon write" on team_members for all using (true);
create policy "anon write" on gallery for all using (true);
```

### 4. Set up Cloudinary

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload** and create an **Upload Preset** (set to unsigned)
3. Add your cloud name and preset to `.env`

### 5. Run the Dev Server

```bash
npm run dev
```

## 🔐 Admin Portal

Access the admin portal at `/admin`. Default password: `datum@admin2024`

**Change the password** by setting `VITE_ADMIN_PASSWORD` in `.env`.

From the admin portal you can:
- ✅ Add / edit / delete events (upcoming events show a "Register" button on the Events page)
- ✅ Add / edit / delete team members
- ✅ Add gallery images via Cloudinary URLs

## 📸 Team Photo Prompt

Use this prompt in **Midjourney**, **DALL-E 3**, or **Adobe Firefly** to generate team member photos:

```
Portrait of a young Indian college student, professional headshot,
neon purple and electric blue cyberpunk studio lighting, dark background,
confident expression, wearing dark hoodie or smart casual,
dramatic rim lighting, bokeh background with subtle tech elements,
cinematic composition, shot on Sony A7IV, 85mm lens, f/1.8, sharp focus, 8k
```

**Color variation by team:**
- Tech Team → Purple + Blue rim
- Event Management → Pink + Magenta rim  
- Media & Video → Orange + Amber rim
- Design Team → Green + Teal rim
- PR Team → Violet + Fuchsia rim

## 🌐 Deployment

```bash
npm run build
```

Deploy `dist/` folder to **Vercel**, **Netlify**, or any static host.

## 📋 Pages

| Route     | Description                              |
|-----------|------------------------------------------|
| `/`       | Landing page with hero, skills, roadmap  |
| `/about`  | Vision, mission, values                  |
| `/team`   | All team members by department           |
| `/events` | Upcoming (with register) + past events   |
| `/gallery`| Photo gallery with lightbox              |
| `/admin`  | Password-protected admin portal          |
