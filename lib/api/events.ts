import { Event, EventRegistration } from '@/types';

export async function getEvents() {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEvent(id: string) {
  try {
    const response = await fetch(`/api/events/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch event with ID: ${id}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

export async function createEvent(data: Partial<Event>) {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  try {
    const response = await fetch(`/api/events/${eventId}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) throw new Error('Failed to register for event');
    return response.json();
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
}