import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountType, name, email, password, teamLead, teamSize, skills } = body;

    if (!email || !password || !accountType || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await db.from('profiles').insert({
      id: crypto.randomUUID(),
      account_type: accountType,
      display_name: name,
      email,
      password, // Note: Hash the password in production
      ...(accountType === 'group' && { team_lead: teamLead, team_size: teamSize }),
      ...(accountType === 'individual' && { skills }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
