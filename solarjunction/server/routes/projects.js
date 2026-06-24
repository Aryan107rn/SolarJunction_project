import { Router } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { requireAdmin } from '../middleware/auth.js'
import Project from '../models/Project.js'

const router = Router()

// Use multer memory storage — we stream the buffer to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
  },
})

// Helper: upload buffer to Cloudinary
function uploadToCloudinary(buffer, folder = 'solarjunction/projects') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}

// GET /api/projects — public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    console.error('GET /api/projects error:', err)
    res.status(500).json({ error: 'Failed to load projects' })
  }
})

// POST /api/projects — admin only, multipart with image
router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Project image is required' })
    }

    const { title, location, panels, capacity, saving } = req.body

    if (!title || !location || !panels || !capacity || !saving) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Upload to Cloudinary
    const cloudResult = await uploadToCloudinary(req.file.buffer)

    const project = await Project.create({
      title: title.slice(0, 150),
      location: location.slice(0, 150),
      panels: Number(panels),
      capacity: capacity.slice(0, 50),
      saving: saving.slice(0, 50),
      imageUrl: cloudResult.secure_url,
      imagePublicId: cloudResult.public_id,
    })

    res.status(201).json(project)
  } catch (err) {
    console.error('POST /api/projects error:', err)
    res.status(500).json({ error: err.message || 'Failed to create project' })
  }
})

// DELETE /api/projects/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })

    // Remove image from Cloudinary
    try {
      await cloudinary.uploader.destroy(project.imagePublicId)
    } catch (cloudErr) {
      console.warn('Cloudinary delete failed (continuing):', cloudErr.message)
    }

    await project.deleteOne()
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/projects error:', err)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router
