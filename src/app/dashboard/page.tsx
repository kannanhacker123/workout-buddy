/* eslint-disable react/no-unescaped-entities */
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Dumbbell, Clock, Flame, Trophy } from "lucide-react";

const workouts = [
  { name: "Push Day", type: "Chest & Triceps", duration: "60 min", exercises: 8 },
  { name: "Pull Day", type: "Back & Biceps", duration: "65 min", exercises: 9 },
  { name: "Leg Day", type: "Legs & Core", duration: "75 min", exercises: 10 },
];

const activities = [
  { name: "Bench Press", date: "2023-07-20", sets: "4x8", progress: "+5kg" },
  { name: "Deadlift", date: "2023-07-19", sets: "4x5", progress: "+10kg" },
  { name: "Squats", date: "2023-07-18", sets: "5x5", progress: "+7.5kg" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};



export default function DashboardPage() {
  const workoutProgress = 0
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Workout Dashboard</h1>
          <span className="text-muted-foreground">Today: {new Date().toLocaleDateString()}</span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div {...fadeIn}>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">Today's Workout</CardTitle>
                <Dumbbell className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">Push Day</div>
                <p className="text-xs text-muted-foreground">Chest & Triceps</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">Avg. Duration</CardTitle>
                <Clock className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">67 min</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">Calories Burned</CardTitle>
                <Flame className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">2,450</div>
                <p className="text-xs text-muted-foreground">Today's total</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">Monthly Goal</CardTitle>
                <Trophy className="h-4 w-4 text-chart-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{workoutProgress}%</div>
                <Progress value={workoutProgress} className="h-2 bg-muted" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workout Plan */}
          <motion.div {...fadeIn}>
            <Card className="h-full bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-card-foreground">Workout Plan</CardTitle>
              </CardHeader>
              <CardContent>
                {workouts.map((workout, index) => (
                  <motion.div
                    key={workout.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-card-foreground">{workout.name}</h3>
                      <p className="text-sm text-muted-foreground">{workout.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">{workout.duration}</p>
                      <p className="text-xs text-muted-foreground">{workout.exercises} exercises</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Workout
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-card-foreground">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-card-foreground">{activity.name}</h3>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">{activity.sets}</p>
                      <p className="text-xs text-chart-3">{activity.progress}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Place this at the top, after imports


