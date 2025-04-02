import { create } from 'zustand';
import { Project, Bid } from '@/types';
import { getProjects, createProject, createBid } from '@/lib/api/projects';

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Partial<Project>) => Promise<void>;
  createBid: (projectId: string, bid: Partial<Bid>) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const projects = await getProjects();
      set({ projects, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch projects' });
    } finally {
      set({ loading: false });
    }
  },
  addProject: async (project) => {
    set({ loading: true });
    try {
      const newProject = await createProject(project);
      set((state) => ({
        projects: [...state.projects, newProject],
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to create project' });
    } finally {
      set({ loading: false });
    }
  },
  createBid: async (projectId, bid) => {
    set({ loading: true });
    try {
      await createBid(projectId, bid);
      set({ error: null });
    } catch (error) {
      set({ error: 'Failed to create bid' });
    } finally {
      set({ loading: false });
    }
  },
}));