import { Router } from 'express'
import { adminAuth } from '../middleware/auth.js'
import {
  getEvents, getUpcomingEvents, getEventById,
  createEvent, updateEvent, deleteEvent
} from '../controllers/events.js'

const router = Router()

// Public
router.get('/',          getEvents)
router.get('/upcoming',  getUpcomingEvents)
router.get('/:id',       getEventById)

// Admin only
router.post('/',         adminAuth, createEvent)
router.patch('/:id',     adminAuth, updateEvent)
router.delete('/:id',    adminAuth, deleteEvent)

export default router
