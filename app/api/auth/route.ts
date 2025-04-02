import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountType, name, email, password, teamLead, teamSize, skills } = body;

    if (!email || !password || !accountType || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Instead of database interaction, just return a success response
    // This simulates a successful registration
    const userId = crypto.randomUUID();

    return NextResponse.json({ 
      message: 'User registered successfully',
      userId 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
