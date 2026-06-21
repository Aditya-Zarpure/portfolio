'use client';

import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';
import { apiService } from '@/services/api';
import { PROJECT_CATEGORIES } from '@/constants';
import { projectCreateSchema } from '@/utils/validators';

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

/**
 * Rich project editor panel. Sanitizes inputs through client-side Zod validators
 * and uploads files directly to Cloudinary streams.
 */
export default function ProjectForm({ initialData, onSubmit, isLoading = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    thumbnail: '',
    coverImage: '',
    galleryImages: [] as string[],
    liveUrl: '',
    githubUrl: '',
    techStack: [] as string[],
    category: 'Fullstack',
    tags: [] as string[],
    featured: false,
    published: false,
    order: 0,
    metaTitle: '',
    metaDescription: '',
  });

  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initialData if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        shortDescription: initialData.shortDescription || '',
        fullDescription: initialData.fullDescription || '',
        thumbnail: initialData.thumbnail || '',
        coverImage: initialData.coverImage || '',
        galleryImages: initialData.galleryImages || [],
        liveUrl: initialData.liveUrl || '',
        githubUrl: initialData.githubUrl || '',
        techStack: initialData.techStack || [],
        category: initialData.category || 'Fullstack',
        tags: initialData.tags || [],
        featured: !!initialData.featured,
        published: !!initialData.published,
        order: Number(initialData.order) || 0,
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
      });
    }
  }, [initialData]);

  // Generate dynamic slugs on-the-fly from title if creating new
  useEffect(() => {
    if (!initialData && formData.title) {
      const generated = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, slug: generated }));
    }
  }, [formData.title, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset error when field changes
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Upload file payloads directly to Cloudinary via admin API route
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'thumbnail' | 'coverImage' | 'gallery'
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingField(fieldName);
    try {
      if (fieldName === 'gallery') {
        const urls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const res = await apiService.uploadImage(files[i]);
          if (res.success && res.data?.secure_url) {
            urls.push(res.data.secure_url);
          }
        }
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...urls],
        }));
      } else {
        const res = await apiService.uploadImage(files[0]);
        if (res.success && res.data?.secure_url) {
          setFormData((prev) => ({ ...prev, [fieldName]: res.data.secure_url }));
        }
      }
    } catch (err: any) {
      console.error('File upload failure:', err);
      alert('Media asset upload failed: ' + (err.message || 'Network exception'));
    } finally {
      setUploadingField(null);
    }
  };

  const addTechTag = () => {
    const term = techInput.trim();
    if (term && !formData.techStack.includes(term)) {
      setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, term] }));
      setTechInput('');
    }
  };

  const removeTechTag = (index: number) => {
    setFormData((prev) => ({ ...prev, techStack: prev.techStack.filter((_, i) => i !== index) }));
  };

  const addGeneralTag = () => {
    const term = tagInput.trim();
    if (term && !formData.tags.includes(term)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, term] }));
      setTagInput('');
    }
  };

  const removeGeneralTag = (index: number) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sanitize and validate via Zod schema
    const validation = projectCreateSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Submit validated payload
    onSubmit(validation.data);
  };

  const categoryOptions = PROJECT_CATEGORIES.map((c) => ({ value: c, label: c }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] pr-2">
      {/* Basic details */}
      <div className="bg-slate-50 p-4 rounded border space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Basic Description</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="E.g. Stripe Dashboard Clone"
            required
          />
          <Input
            label="URL Slug (Auto-generated)"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            error={errors.slug}
            placeholder="e.g. stripe-dashboard-clone"
            required
          />
        </div>
        <Input
          label="Short Description"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          error={errors.shortDescription}
          placeholder="Brief summary of what the project does (Max 200 chars)"
          required
        />
        <Textarea
          label="Full Description"
          name="fullDescription"
          value={formData.fullDescription}
          onChange={handleChange}
          error={errors.fullDescription}
          placeholder="Detailed narrative describing implementation details, goals, and results..."
          required
        />
      </div>

      {/* Asset file uploads */}
      <div className="bg-slate-50 p-4 rounded border space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Media Assets</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Thumbnail Showcase Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'thumbnail')}
              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
            />
            {uploadingField === 'thumbnail' && <p className="text-xs text-slate-500 animate-pulse mt-1">Uploading...</p>}
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Thumbnail preview" className="h-16 object-cover rounded mt-2 border" />
            )}
            {errors.thumbnail && <p className="text-xs text-red-500 mt-1">{errors.thumbnail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'coverImage')}
              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
            />
            {uploadingField === 'coverImage' && <p className="text-xs text-slate-500 animate-pulse mt-1">Uploading...</p>}
            {formData.coverImage && (
              <img src={formData.coverImage} alt="Cover preview" className="h-16 object-cover rounded mt-2 border" />
            )}
            {errors.coverImage && <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Showcase Images (Multiple)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload(e, 'gallery')}
            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
          />
          {uploadingField === 'gallery' && <p className="text-xs text-slate-500 animate-pulse mt-1">Uploading multiple...</p>}
          {formData.galleryImages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto mt-2 p-1 border rounded bg-white">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="relative group shrink-0">
                  <img src={img} alt="Gallery item" className="h-12 w-16 object-cover rounded border" />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
                      }))
                    }
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* External Deployments */}
      <div className="bg-slate-50 p-4 rounded border space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Project Deployments</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Live Deployment Link"
            name="liveUrl"
            type="url"
            value={formData.liveUrl}
            onChange={handleChange}
            error={errors.liveUrl}
            placeholder="https://my-app.com"
          />
          <Input
            label="GitHub Repository Link"
            name="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={handleChange}
            error={errors.githubUrl}
            placeholder="https://github.com/my-repo"
          />
        </div>
      </div>

      {/* Tech stack */}
      <div className="bg-slate-50 p-4 rounded border space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Technical Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Primary Showcase Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
            error={errors.category}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Technology Tags (Min 1)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechTag();
                  }
                }}
                placeholder="E.g. Next.js"
                className="flex-1 px-3 py-2 border border-slate-300 rounded text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
              />
              <Button type="button" variant="outline" size="sm" onClick={addTechTag}>
                Add
              </Button>
            </div>
            {errors.techStack && <p className="text-xs text-red-500 mt-1">{errors.techStack}</p>}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {formData.techStack.map((tech, idx) => (
                <span key={idx} className="inline-flex items-center text-xs bg-slate-950 text-white rounded px-2 py-1">
                  {tech}
                  <button type="button" onClick={() => removeTechTag(idx)} className="ml-1 hover:text-red-300 text-slate-300">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* General Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">General Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addGeneralTag();
                }
              }}
              placeholder="E.g. SaaS"
              className="flex-1 px-3 py-2 border border-slate-300 rounded text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
            />
            <Button type="button" variant="outline" size="sm" onClick={addGeneralTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {formData.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center text-xs bg-slate-200 text-slate-800 rounded px-2.5 py-1">
                {tag}
                <button type="button" onClick={() => removeGeneralTag(idx)} className="ml-1 hover:text-red-500 text-slate-500">
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Control Flags */}
      <div className="bg-slate-50 p-4 rounded border space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Showcase Control Flags</h3>
        <div className="flex gap-8">
          <Toggle
            label="Spotlight Feature (Featured Showcase)"
            checked={formData.featured}
            onChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
          />
          <Toggle
            label="Live Publishing Visibility (Published)"
            checked={formData.published}
            onChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
          />
        </div>
      </div>

      {/* SEO Metadata */}
      <div className="bg-slate-50 p-4 rounded border space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">SEO Fields</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Meta Title (For dynamic pages)"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            error={errors.metaTitle}
            placeholder="Custom title tag contents..."
          />
          <Input
            label="Meta Description"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            error={errors.metaDescription}
            placeholder="Custom meta description content..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t bg-white sticky bottom-0">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Save Changes' : 'Create Showcase Project'}
        </Button>
      </div>
    </form>
  );
}
