// app/api/generate/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
    // Parse the JSON body of the request
    const { input } = await request.json();

    // Get your secret API key from a non-public environment variable
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const SYSTEM_INSTRUCTION = process.env.SYSTEM_INSTRUCTION || 'you are a personal trainer.';
    const MAX_TOKENS = parseInt(process.env.MAX_TOKENS || '150', 10); // Default to 150 if not set
    const TEMPERATURE = parseFloat(process.env.TEMPERATURE || '0.7'); // Default to 0.7 if not set

    if (!GEMINI_API_KEY) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: input,
            config: {
                temperature: TEMPERATURE, // Controls the randomness of the output
                maxOutputTokens: MAX_TOKENS, // Maximum number of tokens in the output
                systemInstruction:
                    SYSTEM_INSTRUCTION, // This is a system instruction that sets the context for the AI's responses
            },
        });

        return NextResponse.json({ text: response.text });
    } catch (error) {
        console.error('Error in AI API call:', error);
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}
