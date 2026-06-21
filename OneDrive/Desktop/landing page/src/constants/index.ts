/**
 * Global architectural enums and constants.
 * Ensures consistent values across the frontend client and database models.
 */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusType = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

export const PROJECT_CATEGORIES = ['Frontend', 'Fullstack', 'Mobile', 'DevOps', 'Open Source', 'Other'] as const;
export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

export const PROJECT_STATUS = ['draft', 'published'] as const;
export type ProjectStatus = typeof PROJECT_STATUS[number];

export const ROLES = ['admin', 'superadmin'] as const;
export type UserRole = typeof ROLES[number];

export const CONTACT_STATUS = ['pending', 'reviewed', 'resolved'] as const;
export type ContactStatus = typeof CONTACT_STATUS[number];

export const MIN_RATING = 1;
export const MAX_RATING = 5;
