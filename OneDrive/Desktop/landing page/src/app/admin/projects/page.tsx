'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import Modal from '@/components/ui/Modal';
import ProjectForm from '@/components/admin/ProjectForm';
import { apiService, ProjectPayload } from '@/services/api';

/**
 * Administrative portfolio projects editor center.
 * Renders lists, toggles statuses on the fly, swaps sort coordinates, and fires CRUD requests.
 */
export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form panel states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Deletion confirm states
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.fetchProjects();
      if (res.success && Array.isArray(res.data)) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error('Failed to load catalog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Toggles publish / featured flags
  const handleToggle = async (slug: string, field: 'published' | 'featured') => {
    try {
      const res = await apiService.toggleProjectField(slug, field);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, [field]: res.data[field] } : p))
        );
      }
    } catch (err) {
      console.error(`Toggle ${field} failed:`, err);
      alert('Failed to toggle status.');
    }
  };

  // Dynamic reordering up/down with instant local reactivity
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const nextIdx = direction === 'up' ? index - 1 : index + 1;
    if (nextIdx < 0 || nextIdx >= projects.length) return;

    const newProjects = [...projects];
    // Swap positions
    const temp = newProjects[index];
    newProjects[index] = newProjects[nextIdx];
    newProjects[nextIdx] = temp;

    // Apply new order coordinates
    const updatedMap = newProjects.map((p, i) => ({
      id: p._id,
      order: i,
    }));

    // Update local state instantly for optimal UX
    setProjects(newProjects.map((p, i) => ({ ...p, order: i })));

    try {
      await apiService.reorderProjects(updatedMap);
    } catch (err) {
      console.error('Batch reorder persistence failure:', err);
      alert('Failed to save showcase order.');
      loadProjects(); // Revert
    }
  };

  // Create or Update submit handler
  const handleFormSubmit = async (validatedData: ProjectPayload) => {
    setFormSubmitting(true);
    try {
      if (editingProject) {
        // Edit Mode
        const res = await apiService.updateProject(editingProject.slug, validatedData);
        if (res.success) {
          setIsEditorOpen(false);
          loadProjects();
        }
      } else {
        // Create Mode
        const res = await apiService.createProject(validatedData);
        if (res.success) {
          setIsEditorOpen(false);
          loadProjects();
        }
      }
    } catch (err: any) {
      console.error('Showcase save failure:', err);
      alert('Failed to save project: ' + (err.message || 'Server error'));
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete dynamic database entry
  const handleDeleteConfirm = async () => {
    if (!deletingSlug) return;
    setDeleteSubmitting(true);
    try {
      const res = await apiService.deleteProject(deletingSlug);
      if (res.success) {
        setIsDeleteOpen(false);
        setDeletingSlug(null);
        loadProjects();
      }
    } catch (err: any) {
      console.error('Delete action failure:', err);
      alert('Failed to delete project: ' + (err.message || 'Server error'));
    } finally {
      setDeleteSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Showcase Projects Management</h1>
          <p className="text-sm text-slate-500">
            Create, edit, reorder, and toggle visibility on the live developer portfolio.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null);
            setIsEditorOpen(true);
          }}
        >
          Add New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-medium animate-pulse">
          Loading portfolio projects list...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded bg-slate-50 text-slate-400">
          No projects found in showcase. Click "Add New Project" to get started.
        </div>
      ) : (
        <div className="bg-white border rounded shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 border-b text-slate-600 font-bold uppercase tracking-wider text-xs">
                <th className="px-6 py-3 w-20 text-center">Reorder</th>
                <th className="px-6 py-3 w-24">Thumbnail</th>
                <th className="px-6 py-3">Project Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 w-28">Featured</th>
                <th className="px-6 py-3 w-28">Published</th>
                <th className="px-6 py-3 text-right w-44">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {projects.map((proj, idx) => (
                <tr key={proj._id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-1 items-center justify-center">
                      <button
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className="text-slate-400 hover:text-slate-950 disabled:opacity-20 disabled:cursor-not-allowed text-xs"
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <span className="font-bold text-xxs bg-slate-200 text-slate-800 rounded px-1.5 py-0.5">
                        {proj.order}
                      </span>
                      <button
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === projects.length - 1}
                        className="text-slate-400 hover:text-slate-950 disabled:opacity-20 disabled:cursor-not-allowed text-xs"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="h-10 w-16 object-cover rounded border bg-slate-100"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{proj.title}</div>
                    <div className="text-xxs text-slate-500 font-mono">/{proj.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block text-xxs bg-slate-100 text-slate-800 font-semibold rounded px-2 py-0.5 border border-slate-200">
                      {proj.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Toggle checked={proj.featured} onChange={() => handleToggle(proj.slug, 'featured')} />
                  </td>
                  <td className="px-6 py-4">
                    <Toggle checked={proj.published} onChange={() => handleToggle(proj.slug, 'published')} />
                  </td>
                  <td className="px-6 py-4 text-right space-x-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingProject(proj);
                        setIsEditorOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setDeletingSlug(proj.slug);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal Overlay */}
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={editingProject ? 'Modify Showcase Project Details' : 'Add Showcase Project'}
      >
        <ProjectForm initialData={editingProject} onSubmit={handleFormSubmit} isLoading={formSubmitting} />
      </Modal>

      {/* Delete Confirmation Modal Overlay */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you absolutely sure you want to delete this project? This action is permanent and cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} isLoading={deleteSubmitting}>
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
