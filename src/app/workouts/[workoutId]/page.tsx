/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { Dumbbell, Clock, SkipForward, Save, Edit, Play, Pause, ChevronLeft, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock workout data - in a real app, this would come from an API or props
const WORKOUT_DATA = {
  id: "push-day",
  name: "Push Day Workout",
  duration: 60,
  exercises: [
    {
      name: "Bench Press",
      type: "Strength",
      sets: "4x8",
      rest: 90,
      video: "https://youtu.be/example1",
      duration: 180,
      description: "Lie on a bench, grip the bar with hands slightly wider than shoulder width, lower to chest, then push up."
    },
    {
      name: "Incline Dumbbell Press",
      type: "Strength",
      sets: "3x10",
      rest: 60,
      video: "https://youtu.be/example2",
      duration: 150,
      description: "Set bench to 30-45 degree angle, press dumbbells from shoulder level to full extension."
    },
    {
      name: "Shoulder Press",
      type: "Strength",
      sets: "3x12",
      rest: 75,
      video: "https://youtu.be/example3",
      duration: 160,
      description: "Standing or seated, press dumbbells from shoulder level overhead until arms are extended."
    },
    {
      name: "Tricep Pushdowns",
      type: "Strength",
      sets: "4x12",
      rest: 45,
      video: "https://youtu.be/example4",
      duration: 120,
      description: "Using a cable machine with a straight or V-bar attachment, push downward by extending your elbows."
    }
  ]
};

// Timer component with circular progress
const CircularTimer = ({ timeLeft, totalTime }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="transparent"
          stroke="#e2e8f0"
          strokeWidth="8"
        />
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
        />
      </svg>
      <div className="absolute text-4xl font-bold">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
};

// Exercise Card component
const ExerciseCard = ({ exercise, isActive }) => (
  <Card className={`mb-2 ${isActive ? 'border-2 border-chart-1' : ''}`}>
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{exercise.name}</h3>
          <p className="text-sm text-muted-foreground">{exercise.sets}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.floor(exercise.duration / 60)}:{(exercise.duration % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function WorkoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(WORKOUT_DATA.exercises[0].duration);
  const [isRest, setIsRest] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  // Current exercise being worked on
  const currentExercise = WORKOUT_DATA.exercises[activeStep];
  
  // Reset timer when exercise changes
  useEffect(() => {
    if (isRest) {
      setTimeLeft(restTime);
    } else if (currentExercise) {
      setTimeLeft(currentExercise.duration);
    }
  }, [activeStep, isRest, currentExercise, restTime]);

  // Handle timer countdown
  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      if (isRest) {
        // Rest period finished, move to next exercise
        setIsRest(false);
        setIsPlaying(false);
      } else if (activeStep < WORKOUT_DATA.exercises.length - 1) {
        // Exercise finished, start rest period
        setIsRest(true);
        setRestTime(WORKOUT_DATA.exercises[activeStep].rest);
        setTimeLeft(WORKOUT_DATA.exercises[activeStep].rest);
      } else {
        // Workout complete
        setWorkoutComplete(true);
        setIsPlaying(false);
      }
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, isRest, activeStep]);

  // Progress calculation
  const totalExercises = WORKOUT_DATA.exercises.length;
  const progress = ((activeStep + (isRest ? 0.5 : 0)) / totalExercises) * 100;

  // Handler functions
  const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);
  
  const handleNext = useCallback(() => {
    if (activeStep < WORKOUT_DATA.exercises.length - 1) {
      setActiveStep(prev => prev + 1);
      setIsRest(false);
      setIsPlaying(false);
    } else {
      setWorkoutComplete(true);
    }
  }, [activeStep, WORKOUT_DATA.exercises.length]);

  const handleSkipRest = useCallback(() => {
    setIsRest(false);
    setIsPlaying(false);
    if (activeStep < WORKOUT_DATA.exercises.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      setWorkoutComplete(true);
    }
  }, [activeStep, WORKOUT_DATA.exercises.length]);

  const saveProgress = useCallback(() => {
    // In a real app, this would save to backend
    console.log("Saved progress:", {
      workoutId: WORKOUT_DATA.id,
      completedExercises: activeStep,
      progress: progress
    });
    // Show toast notification here
  }, [activeStep, progress]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/workouts" className="flex items-center text-primary hover:text-primary/80">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Workouts
          </Link>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="text-foreground" onClick={saveProgress}>
                  <Save className="mr-2 h-4 w-4" /> Save Progress
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save your current workout progress</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Title and Progress */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">{WORKOUT_DATA.name}</h1>
          <Progress value={progress} className="h-3 bg-muted" />
          <div className="flex justify-between mt-2 text-muted-foreground">
            <span>Exercise {activeStep + 1} of {totalExercises}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Workout complete view */}
        {workoutComplete ? (
          <Card className="bg-card text-center p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-chart-1/20 p-4 rounded-full mb-6">
                <Trophy className="h-16 w-16 text-chart-1" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Workout Complete!</h2>
              <p className="text-muted-foreground mb-8">
                Great job! You've completed the {WORKOUT_DATA.name}.
              </p>
              <div className="flex gap-4">
                <Button className="bg-primary">Share Results</Button>
                <Link href="/workouts">
                  <Button variant="outline">Back to Workouts</Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Exercise list sidebar */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-3">Workout Plan</h3>
              <div className="space-y-2 mb-4">
                {WORKOUT_DATA.exercises.map((exercise, idx) => (
                  <ExerciseCard
                    key={idx}
                    exercise={exercise}
                    isActive={idx === activeStep && !isRest}
                  />
                ))}
              </div>
            </div>

            {/* Main exercise view */}
            <div className="md:col-span-2">
              <Card className="bg-card">
                <CardContent className="p-6">
                  {!isRest ? (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-card-foreground">
                          {currentExercise.name}
                        </h2>
                        <Button variant="ghost" className="text-foreground">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center text-muted-foreground">
                            <Dumbbell className="mr-2 h-4 w-4" />
                            <span>{currentExercise.sets}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{currentExercise.duration}s per set</span>
                          </div>
                          <p className="text-sm mt-4">{currentExercise.description}</p>
                        </div>

                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            src={currentExercise.video}
                            title="Workout Video"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      <div className="text-center mb-8">
                        <CircularTimer 
                          timeLeft={timeLeft} 
                          totalTime={currentExercise.duration} 
                        />
                        <p className="text-muted-foreground mt-2">Remaining in current set</p>
                      </div>

                      <div className="flex justify-center gap-4">
                        <Button
                          size="lg"
                          className="bg-chart-1 hover:bg-chart-1/90 text-primary-foreground"
                          onClick={togglePlay}
                        >
                          {isPlaying ? (
                            <><Pause className="mr-2 h-4 w-4" /> Pause</>
                          ) : (
                            <><Play className="mr-2 h-4 w-4" /> Start</>
                          )}
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-foreground"
                          onClick={handleNext}
                        >
                          <SkipForward className="mr-2 h-4 w-4" /> Next Exercise
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-2xl font-bold text-card-foreground mb-4">Rest Time</h3>
                      <CircularTimer 
                        timeLeft={timeLeft} 
                        totalTime={currentExercise.rest} 
                      />
                      <p className="text-muted-foreground mt-4 mb-6">
                        Rest for {currentExercise.rest} seconds before the next exercise
                      </p>
                      <Button
                        size="lg"
                        className="bg-chart-4 hover:bg-chart-4/90 text-primary-foreground"
                        onClick={handleSkipRest}
                      >
                        Skip Rest
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}