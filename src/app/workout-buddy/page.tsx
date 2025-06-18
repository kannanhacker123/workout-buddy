"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader, SendHorizonal, Settings2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Function to call your API route with proper error handling
async function AiResponse(userInput: string, systemPrompt: string) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userInput, systemPrompt }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.text;
}

interface UserSettings {
  name: string;
  persona: string;
  prompt: string ;
  tone: string;
  weight: string;
  height: string;
  age: string;
  fitnessGoal: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const WorkoutBuddyPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I am your Workout Buddy AI. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [section, setSection] = useState<"ai" | "physical">("ai");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const fallbackPrompt = "You are a knowledgeable, motivating, and supportive personal trainer. Provide helpful, encouraging, and safe fitness advice tailored to the user's goals and fitness level.";
  const defaultSystemPrompt =  process.env.NEXT_PUBLIC_SYSTEM_INSTRUCTION   || fallbackPrompt;

  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "",
    persona: "Personal Trainer",
    prompt: defaultSystemPrompt,
    tone: "friendly",
    weight: "",
    height: "",
    age: "",
    fitnessGoal: "",
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("workoutBuddySettings");
      if (saved) {
        const parsedSettings = JSON.parse(saved);
        setUserSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      }
    } catch (error) {
      console.error("Error loading settings from localStorage:", error);
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Build the system prompt based on user settings or defaults from env
    const buildSystemPrompt = (settings: UserSettings): string => {
    let systemPrompt = settings.prompt;
    
    // Add tone information
    if (settings.tone) {
      systemPrompt += `\n\nTone: Use a ${settings.tone} and ${settings.tone === 'aggressive' ? 'challenging' : settings.tone === 'zen' ? 'calm and mindful' : 'supportive'} communication style.`;
    }

    // Add user information if available
    const userInfo = [];
    if (settings.name) userInfo.push(`Name: ${settings.name}`);
    if (settings.weight) userInfo.push(`Weight: ${settings.weight}kg`);
    if (settings.height) userInfo.push(`Height: ${settings.height}cm`);
    if (settings.age) userInfo.push(`Age: ${settings.age}`);
    if (settings.fitnessGoal) userInfo.push(`Fitness Goal: ${settings.fitnessGoal}`);

    if (userInfo.length > 0) {
      systemPrompt += `\n\nUser Information:\n${userInfo.join(', ')}`;
      systemPrompt += `\n\nTailor your advice specifically to this user's profile and goals.`;
    }

    return systemPrompt;
  };

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input.trim();
    setInput(""); // Clear input immediately
    setIsLoading(true);

    try {
      const systemPrompt = buildSystemPrompt(userSettings);
      const botReplyText = await AiResponse(currentInput, systemPrompt);
      
      const botReply: Message = {
        sender: "bot",
        text: botReplyText || "Sorry, I could not process your request.",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      const errorReply: Message = {
        sender: "bot",
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsSave = () => {
    try {
      localStorage.setItem("workoutBuddySettings", JSON.stringify(userSettings));
      setShowSettings(false);
      
      // Add a confirmation message
      const confirmationMessage: Message = {
        sender: "bot",
        text: "Settings updated! I'm now configured with your preferences and will tailor my responses accordingly.",
      };
      setMessages((prev) => [...prev, confirmationMessage]);
    } catch (error) {
      console.error("Error saving settings to localStorage:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-32px)] sm:h-[calc(100vh-128px)] p-4 bg-background">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Workout Buddy</h1>
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Settings2 className="mr-2" /> Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4 max-w-md max-h-[80vh] overflow-y-auto">
            <DialogTitle>Settings</DialogTitle>
            <div className="flex space-x-2">
              <Button
                variant={section === "ai" ? "default" : "outline"}
                onClick={() => setSection("ai")}
                size="sm"
              >
                Customize AI
              </Button>
              <Button
                variant={section === "physical" ? "default" : "outline"}
                onClick={() => setSection("physical")}
                size="sm"
              >
                Physical Info
              </Button>
            </div>

            {section === "ai" && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Customize AI Behavior</h2>
                <div>
                  <label className="text-sm font-medium">Your Name (Optional)</label>
                  <Input
                    placeholder="Enter your name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">AI Persona</label>
                  <Input
                    placeholder="e.g., Personal Trainer, Military Commander"
                    value={userSettings.persona}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, persona: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Custom System Prompt</label>
                  <Textarea
                    placeholder="Describe how you want the AI to behave..."
                    value={userSettings.prompt}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, prompt: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Communication Tone</label>
                  <select
                    className="p-2 border rounded-md w-full bg-background"
                    value={userSettings.tone}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, tone: e.target.value }))}
                  >
                    <option value="friendly">Friendly & Supportive</option>
                    <option value="aggressive">Aggressive & Challenging</option>
                    <option value="zen">Zen & Mindful</option>
                  </select>
                </div>
              </div>
            )}

            {section === "physical" && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Physical Information</h2>
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input
                    placeholder="e.g., 70"
                    type="number"
                    value={userSettings.weight}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Height (cm)</label>
                  <Input
                    placeholder="e.g., 175"
                    type="number"
                    value={userSettings.height}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, height: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <Input
                    placeholder="e.g., 28"
                    type="number"
                    value={userSettings.age}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Fitness Goal</label>
                  <Textarea
                    placeholder="e.g., lose weight, build muscle, improve endurance..."
                    value={userSettings.fitnessGoal}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, fitnessGoal: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>
            )}

            <Button onClick={handleSettingsSave} className="w-full">
              Save Settings
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-card text-card-foreground">
        <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className="flex mb-3">
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-secondary text-secondary-foreground mr-auto"
                }`}
              >
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>
                    {message.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex mb-3">
              <div className="p-3 rounded-lg max-w-[80%] bg-secondary text-secondary-foreground mr-auto">
                <div className="flex items-center">
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                  <span>Your workout buddy is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        
        <div className="flex items-center p-4 border-t border-border">
          <Input
            className="flex-1 mr-2 bg-input text-foreground"
            placeholder="Ask about workouts, nutrition, or fitness goals..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button 
            className="bg-accent text-accent-foreground" 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader className="animate-spin w-6 h-6" />
            ) : (
              <>
                <span>Send</span>
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