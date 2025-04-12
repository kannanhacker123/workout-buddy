"use client";
import React, { useState } from "react";
// Import shadcn UI components (adjust paths as per your project structure)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

const GoalsPage = () => {
  // Initial state with some placeholder goals
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: "Run 5 km", completed: false },
    { id: 2, text: "Lift weights 3 times a week", completed: false },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to add a new goal
  const handleAddGoal = () => {
    if (newGoal.trim() === "") return;
    const newGoalObj: Goal = { id: Date.now(), text: newGoal.trim(), completed: false };
    setGoals((prevGoals) => [...prevGoals, newGoalObj]);
    setNewGoal("");
  };

  // Function to delete a goal by id
  const handleDelete = (id: number) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  // Function to set up editing for a goal
  const handleEdit = (goal: Goal) => {
    setEditGoal(goal);
    setIsEditing(true);
  };

  // Function to update an existing goal
  const handleUpdate = () => {
    if (editGoal && editGoal.text.trim() !== "") {
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === editGoal.id ? editGoal : goal
        )
      );
      setEditGoal(null);
      setIsEditing(false);
    }
  };

  // Function to toggle the completed state of a goal
  const handleToggleCompleted = (id: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-foreground">
          Workout Goals
        </h1>
      </header>

      <div className="max-w-3xl mx-auto">
        {/* Add Goal Form */}
        <div className="flex  items-center mb-6 space-x-4">
          <Input
            type="text"
            placeholder="Enter your new goal..."
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="flex-1 border border-border bg-card text-card-foreground"
          />
          <Button 
            onClick={handleAddGoal}
            className="bg-primary text-primary-foreground"
          >
            Add Goal
          </Button>
        </div>

        {/* List of Goals */}
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="p-4 bg-card text-card-foreground flex flex-row items-center">
              {/* Checkbox to toggle completed state */}
              <Checkbox 
                checked={goal.completed} 
                onCheckedChange={() => handleToggleCompleted(goal.id)}
                className="md:mr-4"
              />
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className={goal.completed ? "line-through" : ""}>
                    {goal.text}
                  </CardTitle>
                </CardHeader>
              </div>
              <CardFooter className="flex justify-end space-x-1">
                <Button variant="outline" onClick={() => handleEdit(goal)}>
                  <span className="hidden md:inline">Edit</span>
                  <Edit/>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(goal.id)}
                >
                  <span className="hidden md:inline">Delete</span>
                  <Trash2/>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Goal Modal */}
      {editGoal && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle>Edit Goal</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Input
                type="text"
                value={editGoal.text}
                onChange={(e) =>
                  setEditGoal({ ...editGoal, text: e.target.value })
                }
                className="mb-4 border border-border bg-card text-card-foreground"
              />
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdate}
                  className="bg-primary text-primary-foreground"
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GoalsPage;
