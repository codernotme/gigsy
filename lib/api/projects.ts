import { Project, Bid } from '@/types';

export async function getProjects() {
  const response = await fetch('/api/projects');
  return response.json();
}

export async function getProject(id: string) {
  const response = await fetch(`/api/projects/${id}`);
  return response.json();
}

export async function createProject(data: Partial<Project>) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function createBid(projectId: string, data: Partial<Bid>) {
  const response = await fetch(`/api/projects/${projectId}/bids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}