import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendCheckInSMS(phoneNumber: string, message: string) {
  try {
    await client.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}

export async function scheduleCheckIn(phoneNumber: string, frequency: 'daily' | 'weekly') {
  // This is a placeholder for actual scheduling logic
  // In a real implementation, you would use a job scheduler like Bull or Agenda
  const message = frequency === 'daily' 
    ? "How are you feeling today? Take a moment to check in with yourself."
    : "It's time for your weekly check-in. How has your week been?";

  return sendCheckInSMS(phoneNumber, message);
} 