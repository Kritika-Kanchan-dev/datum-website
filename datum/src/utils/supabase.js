import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Events ──────────────────────────────────────────────────────────────────
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })
  return { data, error }
}

export const createEvent = async (event) => {
  const { data, error } = await supabase.from('events').insert([event]).select()
  return { data, error }
}

export const updateEvent = async (id, updates) => {
  const { data, error } = await supabase.from('events').update(updates).eq('id', id).select()
  return { data, error }
}

export const deleteEvent = async (id) => {
  const { error } = await supabase.from('events').delete().eq('id', id)
  return { error }
}

// ── Team Members ─────────────────────────────────────────────────────────────
export const getTeamMembers = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })
  return { data, error }
}

export const createTeamMember = async (member) => {
  const { data, error } = await supabase.from('team_members').insert([member]).select()
  return { data, error }
}

export const updateTeamMember = async (id, updates) => {
  const { data, error } = await supabase.from('team_members').update(updates).eq('id', id).select()
  return { data, error }
}

export const deleteTeamMember = async (id) => {
  const { error } = await supabase.from('team_members').delete().eq('id', id)
  return { error }
}

// ── Gallery ──────────────────────────────────────────────────────────────────
export const getGalleryImages = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const addGalleryImage = async (image) => {
  const { data, error } = await supabase.from('gallery').insert([image]).select()
  return { data, error }
}
