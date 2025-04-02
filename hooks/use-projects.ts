import { useState } from "react";

// Dummy project type
interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in_progress' | 'completed';
  createdAt: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Simulated API call - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return empty array for now
      setProjects([]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const createProject = async (project: Omit<Project, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProject: Project = {
        ...project,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString()
      };
      
      setProjects(current => [...current, newProject]);
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject
  };
}
