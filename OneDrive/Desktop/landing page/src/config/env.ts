import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().url('MONGODB_URI must be a valid MongoDB connection string'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
  ADMIN_USERNAME: z.string().min(3, 'ADMIN_USERNAME must be at least 3 characters'),
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL must be a valid email'),
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters long'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Validates environment variables on demand (e.g. on database boot or server actions).
 * Bypasses Next.js static build phase crash while ensuring complete runtime strict safety.
 */
export function validateEnv() {
  const parsed = envSchema.safeParse({
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    console.error('❌ Environment validation failed:', JSON.stringify(parsed.error.format(), null, 2));
    throw new Error('Database connection or authentication blocked: Environment variables configuration validation failed.');
  }

  return parsed.data;
}

/**
 * Access variables dynamically. Supports hot reloading and avoids build-time environment errors.
 */
export const env = {
  get MONGODB_URI() {
    return process.env.MONGODB_URI || '';
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET || '';
  },
  get CLOUDINARY_CLOUD_NAME() {
    return process.env.CLOUDINARY_CLOUD_NAME || '';
  },
  get CLOUDINARY_API_KEY() {
    return process.env.CLOUDINARY_API_KEY || '';
  },
  get CLOUDINARY_API_SECRET() {
    return process.env.CLOUDINARY_API_SECRET || '';
  },
  get ADMIN_USERNAME() {
    return process.env.ADMIN_USERNAME || '';
  },
  get ADMIN_EMAIL() {
    return process.env.ADMIN_EMAIL || '';
  },
  get ADMIN_PASSWORD() {
    return process.env.ADMIN_PASSWORD || '';
  },
  get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  },
};
export type EnvType = typeof env;
