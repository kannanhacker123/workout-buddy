"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BMICalculator, MealPlanner, NutritionTracker, CalorieCalculator } from './func';

const WorkoutAndNutritionInformation = () => {
  return (
    <Tabs defaultValue="calorie-calculator" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="calorie-calculator">Calorie Calculator</TabsTrigger>
        <TabsTrigger value="meal-planner">Meal Planner</TabsTrigger>
        <TabsTrigger value="bmi-calculator">BMI Calculator</TabsTrigger>
        <TabsTrigger value="nutrition-tracker">Nutrition Tracker</TabsTrigger>
      </TabsList>
      <TabsContent value="calorie-calculator">
        <CalorieCalculator />
      </TabsContent>
      <TabsContent value="meal-planner">
        <MealPlanner />
      </TabsContent>
      <TabsContent value="bmi-calculator">
        <BMICalculator />
      </TabsContent>
      <TabsContent value="nutrition-tracker">
        <NutritionTracker />
      </TabsContent>
    </Tabs>
  );
};

export default WorkoutAndNutritionInformation;