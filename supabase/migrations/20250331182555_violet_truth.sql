/*
  # Project Management Schema

  1. New Tables
    - `projects`
      - Stores project details
      - Tracks status and deadlines
      - Manages bidding process
    
    - `bids`
      - Records project bids
      - Tracks bid status
      - Stores proposal details

    - `milestones`
      - Manages project milestones
      - Tracks completion status

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  budget bigint NOT NULL,
  deadline timestamptz NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  skills_required text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  bidder_id uuid REFERENCES auth.users(id) NOT NULL,
  amount bigint NOT NULL,
  proposal text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Policies for bids
CREATE POLICY "Project owners and bidders can read bids"
  ON bids
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT owner_id FROM projects WHERE id = project_id
      UNION
      SELECT bidder_id FROM bids WHERE project_id = bids.project_id
    )
  );

CREATE POLICY "Users can create bids"
  ON bids
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = bidder_id);

-- Policies for milestones
CREATE POLICY "Project participants can read milestones"
  ON milestones
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      LEFT JOIN bids b ON b.project_id = p.id
      WHERE p.id = milestones.project_id
      AND (p.owner_id = auth.uid() OR b.bidder_id = auth.uid())
    )
  );