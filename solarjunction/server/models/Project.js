import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 150, trim: true },
    location: { type: String, required: true, maxlength: 150, trim: true },
    panels: { type: Number, required: true, min: 1, max: 10000 },
    capacity: { type: String, required: true, maxlength: 50, trim: true },
    saving: { type: String, required: true, maxlength: 50, trim: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
