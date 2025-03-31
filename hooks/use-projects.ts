import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './use-auth';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  skills_required: string[];
}

interface Bid {
  id: string;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export function useProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [user]);

  const createProject = async (projectData: Omit<Project, 'id' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, owner_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      setProjects([data, ...projects]);
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  const submitBid = async (projectId: string, amount: number, proposal: string) => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .insert([
          {
            project_id: projectId,
            bidder_id: user?.id,
            amount,
            proposal,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error submitting bid:', error);
      throw error;
    }
  };

  return {
    projects,
    loading,
    createProject,
    submitBid,
    refreshProjects: () => setLoading(true),
  };
}