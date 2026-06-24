import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100, trim: true },
    location: { type: String, default: '', maxlength: 100, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, maxlength: 1000, trim: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)
