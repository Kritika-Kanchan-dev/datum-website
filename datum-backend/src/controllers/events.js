import { supabase } from '../config/supabase.js'

// GET /api/events
export async function getEvents(req, res) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json({ data })
}

// GET /api/events/upcoming
export async function getUpcomingEvents(req, res) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_upcoming', true)
    .order('date', { ascending: true })

  if (error) return res.status(500).json({ error: error.message })
  res.json({ data })
}

// GET /api/events/:id
export async function getEventById(req, res) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ error: 'Event not found' })
  res.json({ data })
}

// POST /api/events  (admin only)
export async function createEvent(req, res) {
  const { title, description, date, time, location, category, image, register_link, is_upcoming } = req.body

  if (!title || !date) {
    return res.status(400).json({ error: 'title and date are required' })
  }

  const { data, error } = await supabase
    .from('events')
    .insert([{ title, description, date, time, location, category, image, register_link, is_upcoming: !!is_upcoming }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json({ data })
}

// PATCH /api/events/:id  (admin only)
export async function updateEvent(req, res) {
  const allowed = ['title', 'description', 'date', 'time', 'location', 'category', 'image', 'register_link', 'is_upcoming']
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)))

  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json({ data })
}

// DELETE /api/events/:id  (admin only)
export async function deleteEvent(req, res) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Event deleted' })
}
