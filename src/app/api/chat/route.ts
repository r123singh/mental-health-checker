import { NextResponse } from 'next/server';
import { generateEmpatheticResponse } from '@/lib/openai';
import { analyzeSentiment } from '@/lib/sentiment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await req.json();
    
    // Analyze sentiment of the message
    const sentiment = await analyzeSentiment(message);
    
    // Generate empathetic response
    const response = await generateEmpatheticResponse(message);

    return NextResponse.json({
      response,
      sentiment,
    });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 