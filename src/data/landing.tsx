import React from "react";
import { Dumbbell, Calendar, TrendingUp, Heart } from "lucide-react";

export const featuresData = [
  {
    icon: <Dumbbell className="h-6 w-6 text-primary" />,
    title: "Custom Workout Plans",
    description: "Create and customize workout routines tailored to your fitness goals.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Workout Scheduling",
    description: "Plan your exercise schedule and receive reminders for upcoming sessions.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Progress Tracking",
    description: "Monitor your fitness journey with detailed progress analytics and insights.",
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Health Metrics",
    description: "Record and analyze vital health metrics to optimize your fitness routine.",
  },
];

export const testimonialsData = [
  {
    name: "Alex Johnson",
    quote: "Workout Buddy has transformed my fitness routine. I'm more consistent and seeing better results than ever before.",
    role: "Fitness Enthusiast",
  },
  {
    name: "Sarah Miller",
    quote: "The progress tracking feature keeps me motivated. I love seeing how far I've come since I started.",
    role: "Marathon Runner",
  },
];

export const howItWorksSteps = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up and set your fitness goals and preferences.",
    },
    {
      step: "2",
      title: "Plan Your Workouts",
      description: "Build custom workout routines or choose from templates.",
    },
    {
      step: "3",
      title: "Track & Improve",
      description: "Log your progress and adjust your plans as you get stronger.",
    },
];
