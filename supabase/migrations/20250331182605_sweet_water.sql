/*
  # Event Management Schema

  1. New Tables
    - `events`
      - Stores event details
      - Tracks registration and attendance
      - Manages rewards
    
    - `event_registrations`
      - Records event participants
      - Tracks attendance status
      - Manages reward distribution

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  organizer_id uuid REFERENCES auth.users(id) NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  location text,
  max_participants integer,
  reward_amount bigint DEFAULT 0,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'no_show')),
  reward_claimed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Policies for events
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Organizers can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (auth.uid() = organizer_id)
  WITH CHECK (auth.uid() = organizer_id);

-- Policies for event registrations
CREATE POLICY "Users can view their registrations"
  ON event_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON event_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    (SELECT status FROM events WHERE id = event_id) = 'upcoming' AND
    NOT EXISTS (
      SELECT 1 FROM event_registrations 
      WHERE event_id = event_registrations.event_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Event organizers can view all registrations"
  ON event_registrations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_registrations.event_id
      AND events.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Event organizers can update registration status"
  ON event_registrations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_registrations.event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Function to check event capacity before registration
CREATE OR REPLACE FUNCTION check_event_capacity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM events e
    WHERE e.id = NEW.event_id
    AND e.max_participants IS NOT NULL
    AND (
      SELECT COUNT(*) FROM event_registrations
      WHERE event_id = NEW.event_id
    ) >= e.max_participants
  ) THEN
    RAISE EXCEPTION 'Event has reached maximum capacity';
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to check capacity before registration
CREATE TRIGGER check_capacity_before_registration
  BEFORE INSERT ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION check_event_capacity();

-- Function to award GigCoins when attendance is marked
CREATE OR REPLACE FUNCTION award_event_attendance()
RETURNS TRIGGER AS $$
DECLARE
  reward_amount BIGINT;
  user_wallet_id UUID;
BEGIN
  -- Only proceed if status changed to 'attended' and reward not yet claimed
  IF NEW.status = 'attended' AND NEW.reward_claimed = false AND 
     (OLD.status != 'attended' OR OLD IS NULL) THEN
    
    -- Get reward amount from the event
    SELECT events.reward_amount INTO reward_amount
    FROM events
    WHERE events.id = NEW.event_id;
    
    -- Only proceed if there's a reward to give
    IF reward_amount > 0 THEN
      -- Find the user's wallet
      SELECT wallets.id INTO user_wallet_id
      FROM wallets
      WHERE wallets.user_id = NEW.user_id;
      
      -- Create a transaction to award the GigCoins
      INSERT INTO transactions (
        wallet_id, 
        amount, 
        type, 
        description, 
        reference_id
      ) VALUES (
        user_wallet_id,
        reward_amount,
        'reward',
        'Event attendance reward',
        NEW.event_id
      );
      
      -- Mark reward as claimed
      NEW.reward_claimed := true;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to award GigCoins when attendance is marked
CREATE TRIGGER on_event_attendance_marked
BEFORE UPDATE ON event_registrations
FOR EACH ROW
EXECUTE FUNCTION award_event_attendance();