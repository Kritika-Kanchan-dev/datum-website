import { supabase } from '../config/supabase.js'

// GET /api/team
export async function getTeamMembers(req, res) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) return res.status(500).json({ error: error.message })
  res.json({ data })
}

// POST /api/team  (admin only)
export async function createTeamMember(req, res) {
  const { name, role, year, team, avatar, photo_url, color, linkedin, github, order_index } = req.body

  if (!name || !role) {
    return res.status(400).json({ error: 'name and role are required' })
  }

  const { data, error } = await supabase
    .from('team_members')
    .insert([{ name, role, year, team, avatar, photo_url, color, linkedin, github, order_index: order_index || 0 }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json({ data })
}

// PATCH /api/team/:id  (admin only)
export async function updateTeamMember(req, res) {
  const allowed = ['name', 'role', 'year', 'team', 'avatar', 'photo_url', 'color', 'linkedin', 'github', 'order_index']
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)))

  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json({ data })
}

// DELETE /api/team/:id  (admin only)
export async function deleteTeamMember(req, res) {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Team member deleted' })
}
