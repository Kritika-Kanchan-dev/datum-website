import { supabase } from '../config/supabase.js'

// GET /api/gallery
export async function getGallery(req, res) {
  const { tag } = req.query
  let query = supabase.from('gallery').select('*').order('created_at', { ascending: false })
  if (tag && tag !== 'All') query = query.eq('tag', tag)

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json({ data })
}

// POST /api/gallery  (admin only — file upload via multer)
export async function addGalleryImage(req, res) {
  const { caption, tag } = req.body

  // If uploaded via multipart (Cloudinary), req.file.path holds the URL
  const src = req.file?.path || req.body.src

  if (!src) return res.status(400).json({ error: 'Image source (URL or file) is required' })

  const { data, error } = await supabase
    .from('gallery')
    .insert([{ src, caption, tag: tag || 'Event' }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json({ data })
}

// DELETE /api/gallery/:id  (admin only)
export async function deleteGalleryImage(req, res) {
  const { error } = await supabase.from('gallery').delete().eq('id', req.params.id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Image deleted' })
}
