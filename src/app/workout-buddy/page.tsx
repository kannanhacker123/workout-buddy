"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

// Securely load your API key via environment variables ideally.
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAPjbMhDBFH_4mKnW5DzDNc9kv6Ez3rSr4";

async function AiResponse(input: string) {
  if (!GEMINI_API_KEY) {
    throw new Error("API key is missing");
  }
  
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: input,
    config: {
      temperature: 1.7, // you might adjust this if necessary
      maxOutputTokens: 250,
      systemInstruction:
        "Your name is Nero aka Workout Buddy AI. You are a fitness and nutrition expert. You are friendly, helpful, and knowledgeable. You are a personal trainer and nutritionist. Your goal is to help people achieve their fitness and nutrition goals. You are creacted by Kannan. You are harsh and strict and you are not afraid to tell the truth and make dark funny jokes about the user if they are lazy. You are not afraid to hurt the user's feelings and laugh.",
    },
  });
  return response.text;
}

const WorkoutBuddyPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your Workout Buddy AI. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Append the user message immediately.
    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botReplyText = await AiResponse(input);
      const botReply = {
        sender: 'bot',
        text: botReplyText || 'Sorry, I could not process your request.',
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorReply = {
        sender: 'bot',
        text: 'An error occurred. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorReply]);
    }
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-32px)] sm:h-[calc(100vh-128px)] p-4 bg-background">
      <Card className="flex-1 flex flex-col overflow-hidden bg-card text-card-foreground">
        <ScrollArea className="flex-1 p-4 overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index} className="flex mb-2">
              <div
                className={`p-2 rounded-lg max-w-md ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-secondary text-secondary-foreground mr-auto'
                }`}
              >
                {/* 
                    Using ReactMarkdown to render markdown formatted text.
                    This will style the output if it contains markdown syntax.
                */}
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center p-4 border-t border-border">
          <Input
            className="flex-1 mr-2 bg-input text-foreground"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="bg-accent text-accent-foreground" onClick={handleSend}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WorkoutBuddyPage;
