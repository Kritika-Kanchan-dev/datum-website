import { Router } from 'express'
import { adminAuth } from '../middleware/auth.js'
import { upload } from '../config/cloudinary.js'
import { getGallery, addGalleryImage, deleteGalleryImage } from '../controllers/gallery.js'

const router = Router()

router.get('/',       getGallery)
// Accepts either multipart file upload OR JSON body with src URL
router.post('/',      adminAuth, upload.single('image'), addGalleryImage)
router.delete('/:id', adminAuth, deleteGalleryImage)

export default router
