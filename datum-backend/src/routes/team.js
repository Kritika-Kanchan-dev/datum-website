import { Router } from 'express'
import { adminAuth } from '../middleware/auth.js'
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/team.js'

const router = Router()

router.get('/',       getTeamMembers)
router.post('/',      adminAuth, createTeamMember)
router.patch('/:id',  adminAuth, updateTeamMember)
router.delete('/:id', adminAuth, deleteTeamMember)

export default router
