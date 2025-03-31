import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './use-auth';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  reward_amount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface EventRegistration {
  id: string;
  event_id: string;
  status: 'registered' | 'attended' | 'no_show';
  reward_claimed: boolean;
}

export function useEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadEvents() {
      try {
        // Get all events
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true });

        if (eventError) throw eventError;
        setEvents(eventData);

        // Get user's registrations
        const { data: regData, error: regError } = await supabase
          .from('event_registrations')
          .select('*')
          .eq('user_id', user?.id);

        if (regError) throw regError;
        setRegistrations(regData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [user]);

  const registerForEvent = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([
          {
            event_id: eventId,
            user_id: user?.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setRegistrations([...registrations, data]);
      return data;
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  };

  return {
    events,
    registrations,
    loading,
    registerForEvent,
    refreshEvents: () => setLoading(true),
  };
}