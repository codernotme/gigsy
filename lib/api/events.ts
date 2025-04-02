import { Event, EventRegistration } from '@/types';

export async function getEvents() {
  const response = await fetch('/api/events');
  return response.json();
}

export async function getEvent(id: string) {
  const response = await fetch(`/api/events/${id}`);
  return response.json();
}

export async function createEvent(data: Partial<Event>) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function registerForEvent(eventId: string, userId: string) {
  const response = await fetch(`/api/events/${eventId}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return response.json();
}