
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Apple, Calculator, Scale, Utensils } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Food } from './types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';


// Modular component for BMI calculator
export const BMICalculator = () => {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [bmi, setBmi] = useState(0);
    const [bmiCategory, setBmiCategory] = useState('');
    const [showResults, setShowResults] = useState(false);
    
    const calculateBMI = () => {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      // Determine BMI category
      if (bmiValue < 18.5) {
        setBmiCategory('Underweight');
      } else if (bmiValue < 25) {
        setBmiCategory('Normal weight');
      } else if (bmiValue < 30) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obesity');
      }
      
      setShowResults(true);
    };
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-500" />
            BMI Calculator
          </CardTitle>
          <CardDescription>Calculate your Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="bmi-weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <Input 
                  type="number" 
                  id="bmi-weight" 
                  value={weight} 
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} 
                  min="30" 
                  max="200"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bmi-height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <Input 
                  type="number" 
                  id="bmi-height" 
                  value={height} 
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)} 
                  min="100" 
                  max="250"
                />
              </div>
            </div>
            
            <Button className="w-full" onClick={calculateBMI}>Calculate BMI</Button>
            
            {showResults && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">Your BMI: {bmi}</h3>
                  <p className={`text-md font-medium ${
                    bmiCategory === 'Normal weight' 
                      ? 'text-green-600' 
                      : bmiCategory === 'Underweight' 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`}>
                    {bmiCategory}
                  </p>
                  <div className="mt-4">
                    <div className="relative h-2 w-full bg-gray-200 rounded-full mt-2">
                      <div 
                        className="absolute h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"
                        style={{ width: '100%' }}
                      />
                      <div 
                        className="absolute w-3 h-3 bg-white border-2 border-black rounded-full transform -translate-y-1/2 -translate-x-1/2" 
                        style={{ 
                          left: `${Math.min(Math.max((bmi - 15) * 100 / 25, 0), 100)}%`,
                          top: '50%'
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

export  const NutritionTracker = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dailyTotal, setDailyTotal] = useState({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    
    // Sample food data
    const sampleFoods = [
      { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { name: 'Brown Rice (100g, cooked)', calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
      { name: 'Avocado (1 medium)', calories: 234, protein: 2.9, carbs: 12.5, fat: 21.5 },
      { name: 'Eggs (1 large)', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
      { name: 'Salmon (100g)', calories: 206, protein: 22, carbs: 0, fat: 13 }
    ];
    
    const [foods] = useState(sampleFoods);
    const [filteredFoods, setFilteredFoods] = useState(sampleFoods);
    const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
    
    useEffect(() => {
      if (searchTerm) {
        setFilteredFoods(foods.filter(food => 
          food.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setFilteredFoods(foods);
      }
    }, [searchTerm, foods]);
    
  
    const addFood = (food: Food) => {
      setSelectedFoods([...selectedFoods, food]);
      // Update daily totals
      setDailyTotal({
        calories: dailyTotal.calories + food.calories,
        protein: dailyTotal.protein + food.protein,
        carbs: dailyTotal.carbs + food.carbs,
        fat: dailyTotal.fat + food.fat
      });
    };
    
    
    const removeFood = (index: number): void => {
      const food: Food = selectedFoods[index];
      const updatedFoods: Food[] = [...selectedFoods];
      updatedFoods.splice(index, 1);
      setSelectedFoods(updatedFoods);
      
      // Update daily totals
      setDailyTotal({
        calories: dailyTotal.calories - food.calories,
        protein: dailyTotal.protein - food.protein,
        carbs: dailyTotal.carbs - food.carbs,
        fat: dailyTotal.fat - food.fat
      });
    };
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-red-500" />
            Nutrition Tracker
          </CardTitle>
          <CardDescription>Track your daily food intake and macronutrients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="food-search" className="block text-sm font-medium text-gray-700">Search Foods</label>
              <div className="flex gap-2">
                <Input
                  id="food-search"
                  placeholder="Search for a food..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 font-medium">
                Search Results
              </div>
              <div className="max-h-48 overflow-y-auto p-2">
                {filteredFoods.length > 0 ? (
                  <ul className="divide-y">
                    {filteredFoods.map((food, index) => (
                      <li key={index} className="py-2 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-sm text-gray-500">
                            {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                          </p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => addFood(food)}>
                          Add
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-4 text-gray-500">No foods found</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Today&apos;s Food Log</h3>
              {selectedFoods.length > 0 ? (
                <ul className="divide-y border rounded-lg overflow-hidden">
                  {selectedFoods.map((food, index) => (
                    <li key={index} className="p-3 flex justify-between items-center">
                      <div>
                        <p>{food.name}</p>
                        <p className="text-sm text-gray-500">{food.calories} kcal</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFood(index)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center py-4 text-gray-500 border rounded-lg">No foods added yet</p>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-4 text-center">Daily Totals</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-bold">{dailyTotal.calories}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="font-bold">{dailyTotal.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="font-bold">{dailyTotal.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="font-bold">{dailyTotal.fat}g</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

export  const MealPlanner = () => {
    const [calorieTarget, setCalorieTarget] = useState(2000);
    const [dietType, setDietType] = useState('balanced');
    const [mealCount, setMealCount] = useState(3);
    
    const generateMealPlan = () => {
      // In a real app, this would connect to an API or database
      console.log("Generate meal plan with:", { calorieTarget, dietType, mealCount });
    };
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-green-500" />
            Meal Planner
          </CardTitle>
          <CardDescription>Create a daily meal plan based on your calorie needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="calories" className="block text-sm font-medium text-gray-700">Daily Calories: {calorieTarget}</label>
                <span className="text-sm text-gray-500">{calorieTarget} kcal</span>
              </div>
              <Slider
                id="calories"
                value={[calorieTarget]}
                min={1200}
                max={4000}
                step={100}
                onValueChange={(value) => setCalorieTarget(value[0])}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="diet-type" className="block text-sm font-medium text-gray-700">Diet Type</label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="low-carb">Low Carb</SelectItem>
                  <SelectItem value="high-protein">High Protein</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="meal-count" className="block text-sm font-medium text-gray-700">Number of Meals: {mealCount}</label>
              <Slider
                id="meal-count"
                value={[mealCount]}
                min={2}
                max={6}
                step={1}
                onValueChange={(value) => setMealCount(value[0])}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Exclude Allergies</label>
                <Switch id="allergies" />
              </div>
            </div>
            
            <Button className="w-full" onClick={generateMealPlan}>Generate Meal Plan</Button>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Sample Meal Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Breakfast</span>
                    <span>{Math.round(calorieTarget * 0.3)} kcal</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lunch</span>
                    <span>{Math.round(calorieTarget * 0.35)} kcal</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dinner</span>
                    <span>{Math.round(calorieTarget * 0.25)} kcal</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Snacks</span>
                    <span>{Math.round(calorieTarget * 0.1)} kcal</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

export  const CalorieCalculator = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    // Use the outer scope activityMultipliers
  
    const [activityLevel, setActivityLevel] = useState<keyof typeof activityMultipliers>('moderate');
    const [goal, setGoal] = useState('maintain');
    const [calories, setCalories] = useState(0);
    const [showResults, setShowResults] = useState(false);
  
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    const calculateCalories = () => {
      // BMR calculation using Harris-Benedict formula
      let bmr = 0;
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
    
      const maintenanceCalories = bmr * activityMultipliers[activityLevel];
      
      // Adjust based on goal
      let targetCalories = maintenanceCalories;
      if (goal === 'lose') {
        targetCalories = maintenanceCalories - 500; // 500 calorie deficit
      } else if (goal === 'gain') {
        targetCalories = maintenanceCalories + 300; // 300 calorie surplus
      }
      
      setCalories(Math.round(targetCalories));
      setShowResults(true);
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-purple-500" />
            Calorie Calculator
          </CardTitle>
          <CardDescription>Calculate your daily caloric needs based on your stats and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input 
                  type="number" 
                  id="age" 
                  value={age} 
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)} 
                  min="15" 
                  max="100"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  type="number" 
                  id="weight" 
                  value={weight} 
                  onChange={(e) => setWeight(parseInt(e.target.value) || 0)} 
                  min="30" 
                  max="200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  type="number" 
                  id="height" 
                  value={height} 
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)} 
                  min="100" 
                  max="250"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as keyof typeof activityMultipliers)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (2x/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Weight Loss</SelectItem>
                  <SelectItem value="maintain">Maintenance</SelectItem>
                  <SelectItem value="gain">Muscle Gain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full mt-4" onClick={calculateCalories}>Calculate</Button>
            
            {showResults && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-medium text-center mb-4">Your Results</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Daily Caloric Needs:</p>
                      <p className="text-3xl font-bold text-center">{calories} calories</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="font-medium">{Math.round(calories * 0.3 / 4)}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Carbs</p>
                        <p className="font-medium">{Math.round(calories * 0.4 / 4)}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fats</p>
                        <p className="font-medium">{Math.round(calories * 0.3 / 9)}g</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };