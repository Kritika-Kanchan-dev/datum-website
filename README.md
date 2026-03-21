# 🗃️ Datum — The Data Science Club

> Official website of **Datum**, the Data Science Club of GLA University, Mathura.  
> Built with React + Vite, Tailwind CSS, Supabase, and Cloudinary.

---

## ✨ Features

- 🌗 **Dark / Light theme** toggle
- 📱 **Fully responsive** on all screen sizes
- 🏠 **Landing page** — Hero, Skills marquee, Roadmap, Events preview, Testimonials
- 👥 **Team page** — Hierarchical layout (President → VP → GS, Head → Co-Head → Members), skills & bio per member
- 📅 **Events page** — Upcoming events with Register button, past events with category filter, prize pool & fee display
- 🖼️ **Gallery** — Masonry grid, tag filters, keyboard-navigable lightbox — 100% powered by uploaded images
- ℹ️ **About page** — Vision, Mission, Values, Stats
- 🔐 **Admin portal** — Password-protected portal to manage Events, Team, and Gallery with direct Cloudinary image upload (drag & drop)

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite                   |
| Styling    | Tailwind CSS v3                   |
| Routing    | React Router DOM v6               |
| Database   | Supabase (PostgreSQL)             |
| Storage    | Cloudinary                        |
| Icons      | Lucide React                      |
| Backend    | Node.js + Express (REST API)      |

---

## 📁 Project Structure

```
datum/                          ← Frontend
├── public/
│   └── logo.png                ← Club logo
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   └── ThemeContext.jsx     ← Dark/Light toggle
│   ├── pages/
│   │   ├── Home.jsx            ← Landing page
│   │   ├── About.jsx           ← Vision & Mission
│   │   ├── Team.jsx            ← Team members (live from DB)
│   │   ├── Events.jsx          ← Events (live from DB)
│   │   ├── Gallery.jsx         ← Gallery (live from DB)
│   │   └── Admin.jsx           ← Admin portal
│   └── utils/
│       ├── supabase.js         ← Supabase CRUD helpers
│       └── data.js             ← Static data (roadmap, testimonials)
├── .env.example
├── index.html
├── tailwind.config.js
└── vite.config.js

datum-backend/                  ← Backend (optional)
├── src/
│   ├── config/
│   │   ├── supabase.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── events.js
│   │   ├── team.js
│   │   └── gallery.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── events.js
│   │   ├── team.js
│   │   └── gallery.js
│   └── index.js
├── schema.sql
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- A free [Supabase](https://supabase.com) account
- A free [Cloudinary](https://cloudinary.com) account

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-username/datum.git
cd datum
npm install
```

---

### Step 2 — Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=datum_unsigned
VITE_ADMIN_PASSWORD=your-admin-password
```

---

### Step 3 — Supabase Database Setup

1. Go to [supabase.com](https://supabase.com) → open your project
2. Click **SQL Editor** in the left sidebar → **New query**
3. Paste and run the following:

```sql
create table if not exists events (
  id            uuid        default gen_random_uuid() primary key,
  title         text        not null,
  description   text,
  date          date        not null,
  time          text,
  location      text,
  category      text        default 'Workshop',
  image         text,
  register_link text,
  tag           text        default 'EVENT',
  is_upcoming   boolean     default true,
  prize_pool    text,
  fee_gla       text,
  fee_other     text,
  created_at    timestamptz default now()
);

create table if not exists team_members (
  id          uuid        default gen_random_uuid() primary key,
  name        text        not null,
  role        text        not null,
  year        text,
  team        text,
  avatar      text,
  photo_url   text,
  color       text,
  linkedin    text,
  github      text,
  bio         text,
  skills      text[]      default '{}',
  order_index integer     default 0,
  created_at  timestamptz default now()
);

create table if not exists gallery (
  id         uuid        default gen_random_uuid() primary key,
  src        text        not null,
  caption    text,
  tag        text        default 'Event',
  created_at timestamptz default now()
);

alter table events       enable row level security;
alter table team_members enable row level security;
alter table gallery      enable row level security;

create policy "Public read events"       on events       for select using (true);
create policy "Public read team_members" on team_members for select using (true);
create policy "Public read gallery"      on gallery      for select using (true);

create policy "Allow insert events"       on events       for insert with check (true);
create policy "Allow update events"       on events       for update using (true);
create policy "Allow delete events"       on events       for delete using (true);
create policy "Allow insert team_members" on team_members for insert with check (true);
create policy "Allow update team_members" on team_members for update using (true);
create policy "Allow delete team_members" on team_members for delete using (true);
create policy "Allow insert gallery"      on gallery      for insert with check (true);
create policy "Allow update gallery"      on gallery      for update using (true);
create policy "Allow delete gallery"      on gallery      for delete using (true);
```

---

### Step 4 — Cloudinary Upload Preset

1. Log in to [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload Presets → Add upload preset**
3. Set **Preset name** to `datum_unsigned`
4. Set **Signing Mode** to **Unsigned**
5. Set **Folder** to `datum`
6. Click **Save**

---

### Step 5 — Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔑 Where to Find Environment Values

| Variable | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon/public key |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary → Dashboard (top of page) |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | You create it — name it `datum_unsigned` |
| `VITE_ADMIN_PASSWORD` | You choose — any password you want |

---

## 🔐 Admin Portal

Access at `/admin`. Password is whatever you set in `VITE_ADMIN_PASSWORD`.

| Section | Actions |
|---|---|
| **Events** | Add / edit / delete. Set `is_upcoming` to show Register button. Supports prize pool, GLA fee, other institution fee. |
| **Team** | Add / edit / delete members. Upload photo via drag & drop. Set bio and skills. |
| **Gallery** | Upload photos via drag & drop → auto-saved to Cloudinary. |

---

## 🖼️ Team Photo Prompt

Use this in **Midjourney**, **DALL-E 3**, or **Adobe Firefly**:

```
Portrait of a young Indian college student, professional headshot,
neon purple and electric blue cyberpunk studio lighting, dark background,
confident expression, wearing dark hoodie or smart casual,
dramatic rim lighting, bokeh background with subtle tech elements,
cinematic composition, shot on Sony A7IV, 85mm lens, f/1.8, sharp focus, 8k
```

Vary rim light per team: Tech → Blue, Events → Pink, Media → Amber, Design → Green, PR → Violet.

---

## 🌐 Deployment

### Frontend → Vercel

```bash
npm run build
```

Push to GitHub → Import on [vercel.com](https://vercel.com) → Add `.env` variables in dashboard → Deploy.

### Backend → Railway or Render

Set all env variables in the platform dashboard. Start command: `node src/index.js`

---

## 📋 Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, skills, roadmap, events preview, testimonials |
| `/about` | Vision, mission, values, stats |
| `/team` | All teams with hierarchical layout, bio & skills per member |
| `/events` | Upcoming (with Register) + past events with filters |
| `/gallery` | Masonry photo gallery with lightbox |
| `/admin` | Password-protected admin portal |

---

## 👥 Teams

Leadership · Tech Team · Event Management · Media & Video · Design Team · PR Team · Datum Alumni Corporate Connect

---

*Built with ❤️ by the Datum Tech Team — GLA University, Mathura*