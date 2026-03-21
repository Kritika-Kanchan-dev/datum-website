import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'

import eventsRouter  from './routes/events.js'
import teamRouter    from './routes/team.js'
import galleryRouter from './routes/gallery.js'

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Global rate limiter — 100 req / 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}))

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/events',  eventsRouter)
app.use('/api/team',    teamRouter)
app.use('/api/gallery', galleryRouter)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Datum API' }))

// 404 catch-all
app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`\n🚀  Datum API running at http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health\n`)
})
