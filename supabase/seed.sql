INSERT INTO projects (id, title, description, owner_id, budget, deadline, skills_required)
VALUES
  ('project-2', 'Mobile App Development', 'Develop a cross-platform mobile app', 'user-2', 8000, NOW() + INTERVAL '45 days', ARRAY['React Native', 'TypeScript']),
  ('project-3', 'E-commerce Website', 'Build a scalable e-commerce platform', 'user-1', 12000, NOW() + INTERVAL '60 days', ARRAY['Next.js', 'Tailwind CSS', 'Node.js']);

INSERT INTO profiles (id, account_type, role, display_name, skills)
VALUES
  ('user-1', 'individual', 'admin', 'Admin User', ARRAY['React', 'Node.js']),
  ('user-2', 'group', 'group', 'Team Alpha', ARRAY['Design', 'Marketing']);
