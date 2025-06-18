// app/api/generate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const { input, systemPrompt } = await request.json();

    // Validate required fields
    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Input is required and must be a string' },
        { status: 400 }
      );
    }

    // Get configuration from environment variables
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const MAX_TOKENS = parseInt(process.env.MAX_TOKENS || '200', 10);
    const TEMPERATURE = parseFloat(process.env.TEMPERATURE || '0.7');

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_TOKENS,
      },
      systemInstruction: systemPrompt || 'You are a helpful AI assistant.',
    });

    // Create the content array with proper role structure
    const contents = [
      {
        role: 'user',
        parts: [{ text: input }],
      },
    ];

    // Generate content
    const result = await model.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Error in Gemini API call:', error);

    // Handle specific error types
    const err = error as Error;
    if (typeof err.message === 'string' && err.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    if (typeof err.message === 'string' && err.message.includes('quota')) {
      return NextResponse.json(
        { error: 'API quota exceeded' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

// Optional: Streaming version
export async function PUT(request: NextRequest) {
  try {
    const { input, systemPrompt } = await request.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Input is required and must be a string' },
        { status: 400 }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const MAX_TOKENS = parseInt(process.env.MAX_TOKENS || '200', 10);
    const TEMPERATURE = parseFloat(process.env.TEMPERATURE || '0.7');

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_TOKENS,
      },
      systemInstruction: systemPrompt || 'You are a helpful AI assistant.',
    });

    const contents = [
      {
        role: 'user',
        parts: [{ text: input }],
      },
    ];

    // Generate streaming content
    const result = await model.generateContentStream({ contents });

    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`)
              );
            }
          }
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in streaming Gemini API call:', error);
    return NextResponse.json(
      { error: 'Failed to generate streaming response' },
      { status: 500 }
    );
  }
}