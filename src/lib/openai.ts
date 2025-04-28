import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmpatheticResponse(userMessage: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a supportive and empathetic mental health assistant. Your responses should be understanding, non-judgmental, and focused on helping the user process their feelings. Keep responses concise but meaningful."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || "I'm here to listen. Would you like to share more about how you're feeling?";
  } catch (error) {
    console.error('Error generating response:', error);
    return "I'm having trouble processing that right now. Would you like to try again?";
  }
} 
