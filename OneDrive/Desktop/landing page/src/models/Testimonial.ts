import mongoose, { Schema, Document, Model } from 'mongoose';
import { MIN_RATING, MAX_RATING } from '@/constants';

export interface ITestimonial extends Document {
  clientName: string;
  company: string;
  role: string;
  feedback: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required.'],
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters.'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required.'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters.'],
    },
    role: {
      type: String,
      required: [true, 'Client role is required.'],
      trim: true,
      maxlength: [100, 'Client role cannot exceed 100 characters.'],
    },
    feedback: {
      type: String,
      required: [true, 'Client feedback is required.'],
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required.'],
      min: [MIN_RATING, `Rating must be at least ${MIN_RATING}.`],
      max: [MAX_RATING, `Rating cannot exceed ${MAX_RATING}.`],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling the model on hot-reloads
const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
