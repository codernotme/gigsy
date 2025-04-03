import { create } from 'zustand';
import { Event } from '@/types';
import { getEvents, createEvent, registerForEvent } from '@/lib/api/events';

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Partial<Event>) => Promise<void>;
  register: (eventId: string, userId: string) => Promise<void>;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  loading: false,
  error: null,
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const events = await getEvents();
      set({ events, error: null });
    } catch (error) {
      console.error('Error fetching events:', error);
      set({ error: 'Failed to fetch events' });
    } finally {
      set({ loading: false });
    }
  },
  addEvent: async (event) => {
    set({ loading: true });
    try {
      const newEvent = await createEvent(event);
      set((state) => ({
        events: [...state.events, newEvent],
        error: null,
      }));
    } catch (error) {
      console.error('Error creating event:', error);
      set({ error: 'Failed to create event' });
    } finally {
      set({ loading: false });
    }
  },
  register: async (eventId, userId) => {
    set({ loading: true });
    try {
      await registerForEvent(eventId, userId);
      set({ error: null });
    } catch (error) {
      console.error('Error registering for event:', error);
      set({ error: 'Failed to register for event' });
    } finally {
      set({ loading: false });
    }
  },
}));