// ── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS = [
  { label: 'Web Development',    icon: '🌐', color: 'from-blue-500 to-cyan-500' },
  { label: 'Backend Development',icon: '⚙️', color: 'from-emerald-500 to-teal-500' },
  { label: 'Frontend Development',icon:'🎨', color: 'from-violet-500 to-purple-500' },
  { label: 'UI/UX Design',       icon: '✦',  color: 'from-pink-500 to-rose-500' },
  { label: 'Graphic Design',     icon: '🖌️', color: 'from-orange-500 to-amber-500' },
  { label: 'Video Editing',      icon: '🎬', color: 'from-red-500 to-pink-500' },
  { label: 'Content Writing',    icon: '✍️', color: 'from-lime-500 to-green-500' },
  { label: 'Public Speaking',    icon: '🎤', color: 'from-yellow-500 to-orange-500' },
  { label: 'AI / Machine Learning',icon:'🤖',color: 'from-indigo-500 to-blue-500' },
  { label: 'App Development',    icon: '📱', color: 'from-cyan-500 to-sky-500' },
  { label: 'Marketing',          icon: '📣', color: 'from-fuchsia-500 to-pink-500' },
]

// ── Roadmap ──────────────────────────────────────────────────────────────────
export const ROADMAP = [
  {
    date: 'February 2022',
    title: 'Datum Founded',
    description: 'Datum — The Official Data Science Club of GLA University was established under the Department of Computer Engineering & Applications. First event: CNN Workshop with hands-on deep learning.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    date: 'April 2023',
    title: 'Project-X Workshop',
    description: 'Organized a live Face Recognition project-building workshop, mentored by industry expert Rohit Pahwa (Ducat). Students built ML projects from scratch in real-time.',
    color: 'from-violet-500 to-purple-400',
  },
  {
    date: 'October 2024',
    title: 'GenAI + IoT Workshop',
    description: 'Collaborated with the CS Department to deliver a full-day hands-on workshop on Generative AI and IoT integration, led by Dr. Ram Manohar Nisarg.',
    color: 'from-pink-500 to-rose-400',
  },
  {
    date: 'November 2024',
    title: 'Crack the Code',
    description: 'Launched a placement simulation initiative for 1st & 2nd year students — mock OA tests, technical interviews, and expert Q&A sessions to prepare for real company hiring.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    date: 'October 2025',
    title: 'Devi@thon 2025',
    description: 'Co-organized a national-level hackathon with a ₹5,00,000+ prize pool, featuring AI/ML tracks, industry partners, and 3 days of innovation at GLA University.',
    color: 'from-amber-500 to-orange-400',
  },
  {
    date: 'January 2026 & Beyond',
    title: 'AI Battle Arena & Growth',
    description: 'Hosting AI Battle Arena at Technavaya TechFest 2026 — automated AI competitions, national outreach, and building the next chapter of Datum.',
    color: 'from-indigo-500 to-blue-400',
    upcoming: true,
  },
]

// ── Past Events ──────────────────────────────────────────────────────────────
export const PAST_EVENTS = [
  {
    id: 1,
    title: 'Devi@thon 2025 — National Level Hackathon',
    date: '2025-10-09',
    category: 'Competition',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
    description: 'A national-level multi-day hackathon (Oct 9–11) where students built innovative tech solutions to real-world problem statements. Featured AI/ML tracks, industry partner problems, mentorship, networking, and final presentations. Prize pool: ₹5,00,000+.',
    location: 'GLA University Campus, Mathura, Uttar Pradesh',
    tag: 'FLAGSHIP',
    time: 'Multi-day',
  },
  {
    id: 2,
    title: 'Workshop — Own Your Identity in Web3',
    date: '2025-11-11',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    description: 'A power-packed workshop themed around innovation, digital identity, Web3, and future tech skills. Covered practical strategies for building your presence in the decentralised web.',
    location: 'Room 3042, AB-12, GLA University, Mathura',
    tag: 'WORKSHOP',
    time: '10:00 AM – 03:00 PM',
    fee: '₹49',
  },
  {
    id: 3,
    title: 'W3M AI Meetup',
    date: '2025-09-15',
    category: 'Talk',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    description: 'An AI-focused technical meetup covering practical AI tools for hackathons, Web3 deep-dive sessions, internship opportunities, placement preparation, and hands-on project guidance. Designed to help students gain industry-ready skills.',
    location: 'IBM Hall, GLA University, Mathura',
    tag: 'TALK',
    time: '10:00 AM – 1:30 PM',
  },
  {
    id: 4,
    title: 'Internal Smart India Hackathon 2025',
    date: '2025-08-29',
    category: 'Competition',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    description: 'Internal round of Smart India Hackathon (Aug 29–31) where students ideated, designed, and implemented innovative solutions for real-world national problems. Focus on creativity, coding, and large-scale innovation.',
    location: 'Academic Block XI, Mathura Campus',
    tag: 'HACKATHON',
    time: 'Multi-day',
  },
  {
    id: 5,
    title: 'Hack & Viz 2.0 — 30 Hours Hackathon Challenge',
    date: '2025-04-19',
    category: 'Competition',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
    description: 'A 30-hour continuous team-based hackathon (Apr 19–20) focused on coding, collaboration, and innovative problem solving. Participants built solutions with mentoring and on-ground support throughout.',
    location: 'CSED Block XI, Mathura Campus',
    tag: 'HACKATHON',
    time: '30-hour continuous',
  },
  {
    id: 6,
    title: 'Crack the Code — Placement Experience Initiative',
    date: '2024-11-22',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',
    description: 'Real-time placement simulation for 1st & 2nd year students — included Online Assessment tests, Technical Face-to-Face mock interviews, interactive Q&A with industry experts, and goodies/prizes.',
    location: 'GLA University Campus, Mathura',
    tag: 'WORKSHOP',
    time: '3:00 PM – 6:00 PM',
    fee: '₹50',
  },
  {
    id: 7,
    title: 'Hands-on Workshop — GenAI + IoT',
    date: '2024-10-19',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    description: 'Practical workshop on Generative AI and Internet of Things integration. Covered real-world IoT systems, GenAI applications, and implementation guidance. Speaker: Dr. Ram Manohar Nisarg (Master Trainer).',
    location: 'IoT Lab, CSED Ground Floor, GLA University, Mathura',
    tag: 'WORKSHOP',
    time: '10:00 AM – 5:00 PM',
  },
  {
    id: 8,
    title: 'Project-X — Hands-on Face Recognition Workshop',
    date: '2023-04-21',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
    description: 'Live project-building workshop where participants implemented a Face Recognition system from scratch using Machine Learning. Included hands-on coding, real-time demo, and guided mentorship by Rohit Pahwa (Technical Business Development Manager, Ducat).',
    location: 'AB-1, Room 406, GLA University, Mathura',
    tag: 'WORKSHOP',
    time: '3:00 PM – 6:00 PM',
    fee: '₹30 (Free for first 50)',
  },
  {
    id: 9,
    title: 'Workshop on Convolutional Neural Networks',
    date: '2022-02-26',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
    description: 'Hands-on workshop on building CNNs from scratch, covering Deep Learning and Computer Vision fundamentals, followed by a technical quiz. Resource persons: Yash Pathak and Vaibhav Srivastava. Participants received E-certificates.',
    location: 'GLA University Campus, Mathura',
    tag: 'WORKSHOP',
    time: '4:00 PM onwards',
    fee: '₹30 (Abacus members) / ₹40 (Others)',
  },
]

// ── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    role: 'Final Year CSE',
    avatar: 'AM',
    color: 'from-violet-500 to-indigo-500',
    quote: 'Datum completely changed my trajectory. The ML bootcamp and mentorship I got here landed me a data analyst role at a unicorn startup before I even graduated.',
  },
  {
    name: 'Priya Sharma',
    role: '3rd Year AI & DS',
    avatar: 'PS',
    color: 'from-pink-500 to-rose-500',
    quote: "The DataThon was an insane experience — 24 hours of pure problem solving with your team. I built my best project yet and made friends I'll keep for life.",
  },
  {
    name: 'Rohan Gupta',
    role: 'Alumni, Now at Microsoft',
    avatar: 'RG',
    color: 'from-cyan-500 to-blue-500',
    quote: "Datum's workshops on ML and data pipelines gave me a massive head start. My interviewers at Microsoft were genuinely impressed by my projects.",
  },
  {
    name: 'Sneha Patel',
    role: '2nd Year, ECE',
    avatar: 'SP',
    color: 'from-emerald-500 to-teal-500',
    quote: "I come from a non-CS background but Datum welcomed me with open arms. The public speaking and content writing skills I built here are invaluable.",
  },
  {
    name: 'Karan Joshi',
    role: '4th Year, CS',
    avatar: 'KJ',
    color: 'from-amber-500 to-orange-500',
    quote: "Being on the Tech Team at Datum taught me more about real-world development than any coursework. Highly recommend getting involved.",
  },
]

// ── Team Data ─────────────────────────────────────────────────────────────────
export const TEAMS = [
  {
    name: 'Leadership',
    color: 'from-violet-600 to-indigo-600',
    icon: '👑',
    members: [
      { name: 'Arjun Kapoor',    role: 'President',         year: 'Final Year, CSE',      linkedin: '#', github: '#', avatar: 'AK', color: 'from-violet-500 to-purple-600' },
      { name: 'Neha Singh',      role: 'Vice President',    year: '3rd Year, AI & DS',    linkedin: '#', github: '#', avatar: 'NS', color: 'from-indigo-500 to-blue-600' },
      { name: 'Rishi Verma',     role: 'General Secretary', year: '3rd Year, CSE',        linkedin: '#', github: '#', avatar: 'RV', color: 'from-blue-500 to-cyan-600' },
    ],
  },
  {
    name: 'Tech Team',
    color: 'from-cyan-600 to-blue-600',
    icon: '⚙️',
    members: [
      { name: 'Divya Nair',      role: 'Tech Head',         year: '3rd Year, CSE',        linkedin: '#', github: '#', avatar: 'DN', color: 'from-cyan-500 to-blue-600' },
      { name: 'Shubham Tiwari',  role: 'Tech Co-Head',      year: '2nd Year, CSE',        linkedin: '#', github: '#', avatar: 'ST', color: 'from-sky-500 to-indigo-600' },
      { name: 'Manvi Sharma',    role: 'Member',            year: '2nd Year, IT',         linkedin: '#', github: '#', avatar: 'MS', color: 'from-blue-400 to-violet-500' },
      { name: 'Aditya Rao',      role: 'Member',            year: '1st Year, CSE',        linkedin: '#', github: '#', avatar: 'AR', color: 'from-indigo-400 to-cyan-500' },
    ],
  },
  {
    name: 'Event Management',
    color: 'from-pink-600 to-rose-600',
    icon: '🎪',
    members: [
      { name: 'Tanvi Joshi',     role: 'Events Head',       year: '3rd Year, MBA',        linkedin: '#', github: '#', avatar: 'TJ', color: 'from-pink-500 to-rose-600' },
      { name: 'Sagar Malhotra',  role: 'Events Co-Head',    year: '2nd Year, CSE',        linkedin: '#', github: '#', avatar: 'SM', color: 'from-rose-500 to-pink-600' },
      { name: 'Kavya Reddy',     role: 'Member',            year: '2nd Year, ECE',        linkedin: '#', github: '#', avatar: 'KR', color: 'from-pink-400 to-violet-500' },
      { name: 'Harsh Patel',     role: 'Member',            year: '1st Year, CSE',        linkedin: '#', github: '#', avatar: 'HP', color: 'from-fuchsia-400 to-rose-500' },
    ],
  },
  {
    name: 'Media & Video',
    color: 'from-orange-600 to-amber-600',
    icon: '🎬',
    members: [
      { name: 'Prachi Sharma',   role: 'Media Head',        year: '3rd Year, DESIGN',     linkedin: '#', github: '#', avatar: 'PS', color: 'from-orange-500 to-amber-600' },
      { name: 'Vivek Gupta',     role: 'Media Co-Head',     year: '2nd Year, IT',         linkedin: '#', github: '#', avatar: 'VG', color: 'from-amber-500 to-orange-600' },
      { name: 'Ritika Mehra',    role: 'Member',            year: '2nd Year, ECE',        linkedin: '#', github: '#', avatar: 'RM', color: 'from-yellow-400 to-orange-500' },
    ],
  },
  {
    name: 'Design Team',
    color: 'from-emerald-600 to-teal-600',
    icon: '🎨',
    members: [
      { name: 'Ishita Kohli',    role: 'Design Head',       year: '3rd Year, DESIGN',     linkedin: '#', github: '#', avatar: 'IK', color: 'from-emerald-500 to-teal-600' },
      { name: 'Rohan Batra',     role: 'Design Co-Head',    year: '2nd Year, CSE',        linkedin: '#', github: '#', avatar: 'RB', color: 'from-teal-500 to-emerald-600' },
      { name: 'Simran Ahuja',    role: 'Member',            year: '1st Year, AI & DS',    linkedin: '#', github: '#', avatar: 'SA', color: 'from-green-400 to-teal-500' },
    ],
  },
  {
    name: 'PR Team',
    color: 'from-violet-600 to-fuchsia-600',
    icon: '📣',
    members: [
      { name: 'Ananya Mishra',   role: 'PR Head',           year: '3rd Year, MBA',        linkedin: '#', github: '#', avatar: 'AM', color: 'from-violet-500 to-fuchsia-600' },
      { name: 'Devansh Jain',    role: 'PR Co-Head',        year: '2nd Year, CSE',        linkedin: '#', github: '#', avatar: 'DJ', color: 'from-fuchsia-500 to-violet-600' },
      { name: 'Pallavi Nair',    role: 'Member',            year: '2nd Year, ECE',        linkedin: '#', github: '#', avatar: 'PN', color: 'from-purple-400 to-fuchsia-500' },
      { name: 'Akshat Sharma',   role: 'Member',            year: '1st Year, CSE',        linkedin: '#', github: '#', avatar: 'AS', color: 'from-indigo-400 to-violet-500' },
    ],
  },
]

// ── Gallery (static placeholder) ────────────────────────────────────────────
export const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', caption: 'DataThon 2.0 — Opening Ceremony', tag: 'DataThon' },
  { id: 2, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', caption: 'ML Bootcamp Session', tag: 'Workshop' },
  { id: 3, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', caption: 'Industry Talk — Google Engineer', tag: 'Talk' },
  { id: 4, src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', caption: 'Team Collaboration Session', tag: 'Team' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', caption: 'DataThon 2.0 — Award Ceremony', tag: 'DataThon' },
  { id: 6, src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80', caption: 'Python Workshop — Hands-on Coding', tag: 'Workshop' },
  { id: 7, src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', caption: 'Late Night Datathon Vibes', tag: 'DataThon' },
  { id: 8, src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', caption: 'Design Sprint Session', tag: 'Team' },
  { id: 9, src: 'https://images.unsplash.com/photo-1574717024453-354056aae574?w=800&q=80', caption: 'Club Orientation Day 2023', tag: 'Event' },
]

export const STATS = [
  { value: '300+', label: 'Active Members' },
  { value: '25+',  label: 'Events Hosted' },
  { value: '50+',  label: 'Industry Partners' },
  { value: '₹2L',  label: 'Prize Money Awarded' },
]

// ── Image Prompt for Team Photos ──────────────────────────────────────────────
// Midjourney / DALL-E prompt for team member photos:
// "Portrait of a young Indian college student, professional headshot, 
//  neon purple and blue cyberpunk studio lighting, dark background,
//  confident expression, wearing a dark hoodie or smart casual, 
//  dramatic rim lighting, cinematic composition, 4k, sharp focus"