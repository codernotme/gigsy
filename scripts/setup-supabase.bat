@echo off
echo Setting up Supabase for Gigsy...

:: Check if Supabase CLI is installed
npx supabase --version
if %ERRORLEVEL% NEQ 0 (
  echo Installing Supabase CLI...
  npm install -g supabase
)

:: Initialize Supabase project
echo Initializing Supabase project...
npx supabase init

:: Start local Supabase development
echo Starting local Supabase development...
npx supabase start

echo Supabase setup complete! Local development instance is running.
echo You can now add your migrations with: npx supabase migration new <migration_name>
echo To apply migrations: npx supabase db push


