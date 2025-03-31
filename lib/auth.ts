import { db } from './db';

export async function verifyUser(email: string, password: string) {
  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error) throw new Error(error.message);
  if (user.rows.length > 0) {
    return generateToken(user.rows[0]);
  }
  return null;
}

export async function registerUser(data: any) {
  const { email, password, accountType, name } = data;
  if (!email || !password || !accountType || !name) {
    throw new Error('Missing required fields');
  }

  const { data: result, error } = await db
      .from('users')
      .insert([
          {
              email,
              password: `crypt(${password}, gen_salt('bf'))`,
              account_type: accountType,
              name,
              team_lead: data.teamLead || null,
              team_size: data.teamSize || null,
              skills: data.skills || null,
          },
      ]) as unknown as { data: any[]; error: any };

  if (error) throw new Error(error.message);
  return result && result.length > 0;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserProfile(userId: string, updates: Partial<any>) {
  const { data, error } = await db
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw new Error(error.message);
  return data;
}

function generateToken(user: any) {
  // Generate a JWT token
  return 'mock-token';
}
