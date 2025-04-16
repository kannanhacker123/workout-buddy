"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, Trophy, Plus } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Workout data
const WORKOUTS = [
  { id: "push-day", name: "Push Day", type: "Strength", duration: 60, difficulty: "Intermediate", progress: 65 },
  { id: "pull-day", name: "Pull Day", type: "Strength", duration: 65, difficulty: "Intermediate", progress: 45 },
  { id: "hiit-burn", name: "HIIT Burn", type: "Cardio", duration: 30, difficulty: "Advanced", progress: 80 },
  { id: "yoga-flow", name: "Morning Yoga", type: "Flexibility", duration: 45, difficulty: "Beginner", progress: 30 },
];

// Challenge data
const CHALLENGES = [
  { id: "30-day-core", name: "30 Day Core Challenge", duration: "30 days", participants: 2543 },
  { id: "summer-shed", name: "Summer Shred Program", duration: "8 weeks", participants: 1842 },
];

// WorkoutCard component
// Define the Workout type
interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  difficulty: string;
  progress: number;
}

const WorkoutCard = ({ workout }: { workout: Workout }) => (
  <Link href={`/workouts/${workout.id}`}>
    <Card className="hover:bg-accent transition-colors h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">{workout.name}</CardTitle>
          <Dumbbell className="h-6 w-6 text-chart-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Type</span>
            <span className="text-card-foreground">{workout.type}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Duration</span>
            <span className="text-card-foreground">{workout.duration} min</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Difficulty</span>
            <span className="text-card-foreground">{workout.difficulty}</span>
          </div>
        </div>
        <Progress
          value={workout.progress}
          className="mt-4 h-2 bg-muted"
        />
      </CardContent>
    </Card>
  </Link>
);

// ChallengeCard component
interface Challenge {
  id: string;
  name: string;
  duration: string;
  participants: number;
}

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
  <Link href={`/workouts/${challenge.id}`}>
    <Card className="hover:bg-accent transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              {challenge.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {challenge.duration} • {challenge.participants.toLocaleString()} participants
            </p>
          </div>
          <Trophy className="h-8 w-8 text-chart-4" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function WorkoutsPage() {
  const handleNewProgram = useCallback(() => {
    // Handle new program creation
    console.log("Create new program");
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Workout Programs</h1>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleNewProgram}
          >
            <Plus className="mr-2 h-4 w-4" /> New Program
          </Button>
        </div>

        {/* Current Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="bg-card border-2 border-chart-1">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">Active Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CHALLENGES.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workout Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WORKOUTS.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <WorkoutCard workout={workout} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}