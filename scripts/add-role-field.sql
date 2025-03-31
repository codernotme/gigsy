-- Script to add role field to existing profiles
-- Run this on existing databases where the profiles table already exists

DO $$
BEGIN
    -- Check if the role column exists
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'profiles' AND column_name = 'role'
    ) THEN
        -- Add the role column
        ALTER TABLE profiles ADD COLUMN role text DEFAULT 'individual';
        ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
            CHECK (role IN ('admin', 'maintainer', 'regional', 'campus_head', 'group', 'individual'));
        
        -- Update roles based on account_type for existing records
        UPDATE profiles SET role = account_type WHERE account_type IN ('individual', 'group');
    END IF;
END $$;
