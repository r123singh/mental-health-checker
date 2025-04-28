import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function analyzeSentiment(text: string): Promise<number> {
  try {
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: text,
    });

    // Convert the sentiment score to a 0-1 range
    // where 0 is most negative and 1 is most positive
    const score = result[0].score;
    return result[0].label === 'POSITIVE' ? score : 1 - score;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 0.5; // Return neutral sentiment as fallback
  }
} 