"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Loader, SendHorizonal } from 'lucide-react'; // Import the loader icon

// Function to call your API route
async function AiResponse(userInput: string) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: userInput }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI response');
  }

  const data = await response.json();
  return data.text;
}

const WorkoutBuddyPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your Workout Buddy AI. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // state to control the loader

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Append the user's message immediately.
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Show the loader while waiting for the API response.
    setIsLoading(true);
    try {
      const botReplyText = await AiResponse(input);
      const botReply = {
        sender: 'bot',
        text: botReplyText || 'Sorry, I could not process your request.',
      };
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorReply = {
        sender: 'bot',
        text: 'An error occurred. Please try again later.',
      };
      setMessages(prev => [...prev, errorReply]);
    }
    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-32px)] sm:h-[calc(100vh-128px)] p-4 bg-background">
      <Card className="flex-1 flex flex-col overflow-hidden bg-card text-card-foreground">
        <ScrollArea className="flex-1 p-4 overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index} className="flex mb-2">
              <div
                className={`p-2 rounded-lg max-w-md ${message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-secondary text-secondary-foreground mr-auto'
                  }`}
              >
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
            {isLoading ? (
              <Loader className="animate-spin w-6 h-6 text-accent-foreground mr-2" />
            ) : (
              <><span>Send</span>
                <SendHorizonal className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WorkoutBuddyPage;
// This is the main component for the Workout Buddy page