import { z } from 'zod';
import { PROJECT_CATEGORIES, MIN_RATING, MAX_RATING } from '@/constants';

/**
 * Zod validation schema for admin credential log-ins
 */
export const adminLoginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, 'Email or Username is required.')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password must be at least 8 characters long.'),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

/**
 * Zod validation schema for portfolio project creations
 */
export const projectCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Project title is required.')
    .max(100, 'Project title cannot exceed 100 characters.')
    .trim(),
  slug: z
    .string()
    .min(1, 'Project slug is required.')
    .regex(/^[a-z0-9-]+$/, 'Slug must consist of URL-friendly lowercase letters, digits, and hyphens.')
    .trim(),
  shortDescription: z
    .string()
    .min(1, 'Short description is required.')
    .max(200, 'Short description cannot exceed 200 characters.')
    .trim(),
  fullDescription: z
    .string()
    .min(1, 'Full description is required.'),
  thumbnail: z
    .string()
    .url('Project thumbnail must be a valid secure media URL.')
    .min(1, 'Project thumbnail is required.'),
  coverImage: z
    .string()
    .url('Cover image must be a valid URL.')
    .optional()
    .or(z.literal('')),
  galleryImages: z
    .array(z.string().url('Gallery items must be valid secure URLs.'))
    .default([]),
  liveUrl: z
    .string()
    .url('Live project site must be a valid web URL.')
    .optional()
    .or(z.literal('')),
  githubUrl: z
    .string()
    .url('GitHub repository must be a valid web URL.')
    .optional()
    .or(z.literal('')),
  techStack: z
    .array(z.string().min(1, 'Technology name cannot be empty.'))
    .min(1, 'Please specify at least one technology stack tag.'),
  category: z
    .enum(PROJECT_CATEGORIES as unknown as [string, ...string[]], {
      message: `Supported categories are: ${PROJECT_CATEGORIES.join(', ')}`,
    }),
  tags: z
    .array(z.string().min(1))
    .default([]),
  featured: z
    .boolean()
    .default(false),
  published: z
    .boolean()
    .default(false),
  order: z
    .number()
    .int('Order must be an integer.')
    .default(0),
  metaTitle: z
    .string()
    .max(100, 'Meta title cannot exceed 100 characters.')
    .optional()
    .or(z.literal('')),
  metaDescription: z
    .string()
    .max(200, 'Meta description cannot exceed 200 characters.')
    .optional()
    .or(z.literal('')),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;

/**
 * Zod validation schema for partial updates of portfolio projects
 */
export const projectUpdateSchema = projectCreateSchema.partial();
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;

/**
 * Zod validation schema for Contact Message submissions
 */
export const contactMessageSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .max(100, 'Name cannot exceed 100 characters.')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.')
    .trim(),
  subject: z
    .string()
    .min(1, 'Subject is required.')
    .max(150, 'Subject cannot exceed 150 characters.')
    .trim(),
  message: z
    .string()
    .min(1, 'Message body is required.')
    .trim(),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

/**
 * Zod validation schema for Client Testimonial creations
 */
export const testimonialCreateSchema = z.object({
  clientName: z
    .string()
    .min(1, 'Client name is required.')
    .max(100, 'Client name cannot exceed 100 characters.')
    .trim(),
  company: z
    .string()
    .min(1, 'Company name is required.')
    .max(100, 'Company name cannot exceed 100 characters.')
    .trim(),
  role: z
    .string()
    .min(1, 'Client role is required.')
    .max(100, 'Client role cannot exceed 100 characters.')
    .trim(),
  feedback: z
    .string()
    .min(1, 'Feedback text is required.')
    .trim(),
  avatar: z
    .string()
    .url('Avatar must be a valid image URL.')
    .optional()
    .or(z.literal('')),
  rating: z
    .number()
    .int('Rating must be an integer.')
    .min(MIN_RATING, `Rating must be at least ${MIN_RATING}.`)
    .max(MAX_RATING, `Rating cannot exceed ${MAX_RATING}.`),
  featured: z
    .boolean()
    .default(false),
});

export type TestimonialCreateInput = z.infer<typeof testimonialCreateSchema>;

/**
 * Zod validation schema for testimonial updates
 */
export const testimonialUpdateSchema = testimonialCreateSchema.partial();
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
