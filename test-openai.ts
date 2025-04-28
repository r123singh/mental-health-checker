import { generateEmpatheticResponse } from './src/lib/openai';

(async () => {
  const response = await generateEmpatheticResponse('Hi');
  console.log('OpenAI response:', response);
})();