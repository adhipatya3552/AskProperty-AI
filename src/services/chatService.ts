import { ChatRequestParams } from '../types/property';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

export const getChatResponse = async (params: ChatRequestParams) => {
  // In a real implementation, this would call the OpenRouter API
  // For this demo, we'll simulate the response

  console.log('Chat request with params:', params);

  // You would normally make an API call like this:

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful real estate assistant.' },
          { role: 'user', content: JSON.stringify(params) }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
};
