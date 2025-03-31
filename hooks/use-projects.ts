'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Project, Bid } from '@/lib/supabase/client';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*');

      if (error) console.error('Error fetching projects:', error);
      else setProjects(data || []);

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const createBid = async (projectId: string, bidderId: string, amount: number, proposal: string) => {
    const { data, error } = await supabase.from('bids').insert({
      project_id: projectId,
      bidder_id: bidderId,
      amount,
      proposal,
    });

    if (error) console.error('Error creating bid:', error);
    return data;
  };

  return { projects, loading, createBid };
}