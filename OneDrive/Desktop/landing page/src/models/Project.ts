import mongoose, { Schema, Document, Model } from 'mongoose';
import { PROJECT_CATEGORIES, ProjectCategory } from '@/constants';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  coverImage?: string;
  galleryImages: string[];
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  category: ProjectCategory;
  tags: string[];
  featured: boolean;
  published: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required.'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters.'],
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required.'],
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters.'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required.'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required.'],
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
      required: [true, 'At least one technology stack tag is required.'],
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: {
        values: PROJECT_CATEGORIES,
        message: '{VALUE} is not a supported category.',
      },
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling the model on hot-reloads
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
