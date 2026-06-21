import Project, { IProject } from '@/models/Project';
import { ProjectCreateInput, ProjectUpdateInput } from '@/utils/validators';
import { AppError } from '@/utils/errorHandler';
import { HTTP_STATUS, ProjectCategory } from '@/constants';

/**
 * Service layer encapsulating Mongoose operations for portfolio Project showcases.
 * Separates API controllers from raw database transaction calls.
 */
export class ProjectService {
  /**
   * Fetches all projects meeting optional query criteria, sorted by custom grid order.
   */
  static async getAllProjects(filters: any = {}): Promise<IProject[]> {
    return await Project.find(filters).sort({ order: 1, createdAt: -1 });
  }

  /**
   * Fetches a single project detail matching a specific URL slug.
   */
  static async getProjectBySlug(slug: string): Promise<IProject> {
    const project = await Project.findOne({ slug: slug.toLowerCase().trim() });
    if (!project) {
      throw new AppError(`Project with slug '${slug}' was not found.`, HTTP_STATUS.NOT_FOUND);
    }
    return project;
  }

  /**
   * Inserts a new showcase project document.
   */
  static async createProject(data: ProjectCreateInput): Promise<IProject> {
    const slug = data.slug.toLowerCase().trim();

    // Prevent duplicate slugs explicitly
    const existing = await Project.findOne({ slug });
    if (existing) {
      throw new AppError(
        `Database conflict: A project with slug '${slug}' already exists.`,
        HTTP_STATUS.CONFLICT
      );
    }

    return await Project.create({
      ...data,
      slug,
      category: data.category as ProjectCategory,
    });
  }

  /**
   * Modifies an existing project matching a unique URL slug.
   */
  static async updateProject(slug: string, data: ProjectUpdateInput): Promise<IProject> {
    const cleanSlug = slug.toLowerCase().trim();

    // Verify slug conflicts if slug is being updated
    if (data.slug && data.slug.toLowerCase().trim() !== cleanSlug) {
      const newSlug = data.slug.toLowerCase().trim();
      const existing = await Project.findOne({ slug: newSlug });
      if (existing) {
        throw new AppError(
          `Database conflict: Slug '${newSlug}' is already allocated to another project.`,
          HTTP_STATUS.CONFLICT
        );
      }
    }

    const updated = await Project.findOneAndUpdate(
      { slug: cleanSlug },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new AppError(`Project with slug '${slug}' was not found.`, HTTP_STATUS.NOT_FOUND);
    }

    return updated;
  }

  /**
   * Removes a showcase project from database collections.
   */
  static async deleteProject(slug: string): Promise<IProject> {
    const deleted = await Project.findOneAndDelete({ slug: slug.toLowerCase().trim() });
    if (!deleted) {
      throw new AppError(`Project with slug '${slug}' was not found.`, HTTP_STATUS.NOT_FOUND);
    }
    return deleted;
  }

  /**
   * Inverts the published status visibility of a project.
   */
  static async toggleProjectPublish(slug: string): Promise<IProject> {
    const project = await this.getProjectBySlug(slug);
    project.published = !project.published;
    return await project.save();
  }

  /**
   * Inverts the featured spotlight pin on a project.
   */
  static async toggleProjectFeatured(slug: string): Promise<IProject> {
    const project = await this.getProjectBySlug(slug);
    project.featured = !project.featured;
    return await project.save();
  }

  /**
   * Reorders multiple project grid indexes efficiently.
   * Leverages bulkWrite queries to complete multi-document modifications in one roundtrip.
   */
  static async reorderProjects(orderMap: Array<{ id: string; order: number }>): Promise<void> {
    const bulkOps = orderMap.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));

    await Project.bulkWrite(bulkOps);
  }
}
