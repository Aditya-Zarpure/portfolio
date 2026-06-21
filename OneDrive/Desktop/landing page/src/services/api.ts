import axios from 'axios';

// Create AXIOS instance targeting local API endpoints
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject response interceptors to parse formatted payloads automatically
api.interceptors.response.use(
  (response) => {
    // Return the standardised server payload (.data refers to standard axios body)
    return response.data;
  },
  (error) => {
    // Parse standardised server operational errors if present
    const message = error.response?.data?.message || 'A network error occurred. Please try again.';
    const details = error.response?.data?.details || null;
    return Promise.reject({ message, details, original: error });
  }
);

export interface ProjectPayload {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  coverImage?: string;
  galleryImages?: string[];
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  category: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Centrally encapsulates REST API client transactions.
 * Decouples presentation pages from direct network protocols.
 */
export const apiService = {
  // Fetch projects list
  async fetchProjects(filters: Record<string, string> = {}): Promise<any> {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/projects?${params}`);
  },

  // Fetch dynamic single project
  async fetchProject(slug: string): Promise<any> {
    return api.get(`/projects/${slug}`);
  },

  // Create new showcase project
  async createProject(data: ProjectPayload): Promise<any> {
    return api.post('/projects', data);
  },

  // Update existing showcase project details
  async updateProject(slug: string, data: Partial<ProjectPayload>): Promise<any> {
    return api.put(`/projects/${slug}`, data);
  },

  // Delete project
  async deleteProject(slug: string): Promise<any> {
    return api.delete(`/projects/${slug}`);
  },

  // Invert status indicator fields (published / featured)
  async toggleProjectField(slug: string, field: 'published' | 'featured'): Promise<any> {
    return api.put(`/admin/projects/${slug}/toggle`, { field });
  },

  // Bulk update ordering grid coordinates
  async reorderProjects(orderMap: Array<{ id: string; order: number }>): Promise<any> {
    return api.post('/admin/projects/reorder', { orderMap });
  },

  // Upload an asset binary direct to Cloudinary stream uploads
  async uploadImage(file: File, folder = 'portfolio'): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    // Call dedicated multipart upload route
    const res = await axios.post('/api/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
export type ApiServiceType = typeof apiService;
