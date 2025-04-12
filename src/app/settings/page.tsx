/* eslint-disable react/no-unescaped-entities */
// pages/settings.tsx
"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import Head from "next/head";

// Define types for our form states
interface AccountFormState {
  name: string;
  email: string;
  bio: string;
}

interface NotificationSettingsState {
  workoutReminders: boolean;
  achievementAlerts: boolean;
  friendActivity: boolean;
  emailUpdates: boolean;
}

interface WorkoutPreferencesState {
  defaultDuration: string;
  fitnessGoal: string;
  difficultyLevel: string;
  equipmentAccess: string;
}

export default function SettingsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("account");
  
  // Example form state for account settings
  const [accountForm, setAccountForm] = useState<AccountFormState>({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Fitness enthusiast looking to improve strength and endurance.",
  });
  
  // Example form state for notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsState>({
    workoutReminders: true,
    achievementAlerts: true,
    friendActivity: false,
    emailUpdates: true,
  });
  
  // Example form state for workout preferences
  const [workoutPreferences, setWorkoutPreferences] = useState<WorkoutPreferencesState>({
    defaultDuration: "45",
    fitnessGoal: "strength",
    difficultyLevel: "intermediate",
    equipmentAccess: "full",
  });

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setAccountForm({
      ...accountForm,
      [name]: value,
    });
  };

  const handleNotificationToggle = (setting: keyof NotificationSettingsState): void => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleWorkoutPrefChange = (name: keyof WorkoutPreferencesState, value: string): void => {
    setWorkoutPreferences({
      ...workoutPreferences,
      [name]: value,
    });
  };

  const handleSave = (e: FormEvent): void => {
    e.preventDefault();
    // Here you would typically send data to your backend
    console.log("Saving settings:", {
      accountForm,
      notificationSettings,
      workoutPreferences,
    });
    // Show success message
    alert("Settings saved successfully!");
  };

  return (
    <>
      <Head>
        <title>Settings | Workout Buddy</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for larger screens */}
          <div className="md:w-64 w-full">
            <div className=" rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Settings Menu</h2>
              </div>
              <nav className="flex flex-col md:space-y-1 md:block">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm  w-full text-left ${
                    activeTab === "account" ? "font-medium" : ""
                  }`}
                >
                  <span>Account</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm  w-full text-left ${
                    activeTab === "notifications" ? " font-medium" : ""
                  }`}
                >
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab("workout")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm  w-full text-left ${
                    activeTab === "workout" ? " font-medium" : ""
                  }`}
                >
                  <span>Workout Preferences</span>
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm  w-full text-left ${
                    activeTab === "privacy" ? " font-medium" : ""
                  }`}
                >
                  <span>Privacy</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            <div className="rounded-lg shadow overflow-hidden">
              {/* Account Settings */}
              <div className={activeTab === "account" ? "block" : "hidden"}>
                <div className="border-b p-4">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                  <p className=" text-sm">Manage your account information and preferences</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSave}>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text"
                            name="name"
                            value={accountForm.name}
                            onChange={handleAccountChange}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input 
                            type="email"
                            name="email"
                            value={accountForm.email}
                            onChange={handleAccountChange}
                            className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                          <p className="text-sm  mt-1">We'll never share your email with anyone else.</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Bio</label>
                          <textarea 
                            name="bio"
                            value={accountForm.bio}
                            onChange={handleAccountChange}
                            rows={4}
                            className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                          <p className="text-sm  mt-1">Tell us a bit about yourself and your fitness journey.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button 
                        type="submit" 
                        onClick={handleSave}
                        className="bg-gray-800  px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className={activeTab === "notifications" ? "block" : "hidden"}>
                <div className="border-b p-4">
                  <h2 className="text-xl font-semibold">Notification Settings</h2>
                  <p className=" text-sm">Choose how and when you want to be notified</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="text-sm font-medium">Workout Reminders</h3>
                          <p className="text-sm ">Get notified before your scheduled workouts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.workoutReminders}
                            onChange={() => handleNotificationToggle("workoutReminders")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t ">
                        <div>
                          <h3 className="text-sm font-medium">Achievement Alerts</h3>
                          <p className="text-sm ">Receive notifications when you reach fitness milestones</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.achievementAlerts}
                            onChange={() => handleNotificationToggle("achievementAlerts")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t ">
                        <div>
                          <h3 className="text-sm font-medium">Friend Activity</h3>
                          <p className="text-sm ">Get updates when friends complete workouts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.friendActivity}
                            onChange={() => handleNotificationToggle("friendActivity")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t ">
                        <div>
                          <h3 className="text-sm font-medium">Email Updates</h3>
                          <p className="text-sm ">Receive weekly digest and important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.emailUpdates}
                            onChange={() => handleNotificationToggle("emailUpdates")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button 
                      type="button" 
                      onClick={handleSave}
                      className=" px-4 py-2 rounded-md  focus:outline-none focus:ring-2 "
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Workout Preferences */}
              <div className={activeTab === "workout" ? "block" : "hidden"}>
                <div className="border-b p-4">
                  <h2 className="text-xl font-semibold">Workout Preferences</h2>
                  <p className=" text-sm">Customize your workout experience and goals</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Default Workout Duration (minutes)</label>
                        <input 
                          type="number"
                          value={workoutPreferences.defaultDuration}
                          onChange={(e) => handleWorkoutPrefChange("defaultDuration", e.target.value)}
                          min="5"
                          max="180"
                          className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 "
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Primary Fitness Goal</label>
                        <select 
                          value={workoutPreferences.fitnessGoal}
                          onChange={(e) => handleWorkoutPrefChange("fitnessGoal", e.target.value)}
                          className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 "
                        >
                          <option value="strength">Strength Building</option>
                          <option value="weight-loss">Weight Loss</option>
                          <option value="endurance">Endurance</option>
                          <option value="flexibility">Flexibility</option>
                          <option value="general">General Fitness</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Difficulty Level</label>
                        <select 
                          value={workoutPreferences.difficultyLevel}
                          onChange={(e) => handleWorkoutPrefChange("difficultyLevel", e.target.value)}
                          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 "
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Equipment Access</label>
                        <select 
                          value={workoutPreferences.equipmentAccess}
                          onChange={(e) => handleWorkoutPrefChange("equipmentAccess", e.target.value)}
                          className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 "
                        >
                          <option value="none">No Equipment (Bodyweight Only)</option>
                          <option value="minimal">Minimal (Resistance Bands, Dumbbells)</option>
                          <option value="home">Home Gym</option>
                          <option value="full">Full Gym Access</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button 
                      type="button" 
                      onClick={handleSave}
                      className=" px-4 py-2 rounded-md  focus:outline-none focus:ring-2 "
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Privacy Settings */}
              <div className={activeTab === "privacy" ? "block" : "hidden"}>
                <div className="border-b p-4">
                  <h2 className="text-xl font-semibold">Privacy Settings</h2>
                  <p className=" text-sm">Control who can see your profile and workout data</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Profile Visibility</label>
                        <select 
                          defaultValue="friends"
                          className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 "
                        >
                          <option value="public">Public (Everyone)</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Workout Activity</label>
                        <select 
                          defaultValue="friends"
                          className="w-full rounded-md border  px-3 py-2 focus:outline-none focus:ring-2 "
                        >
                          <option value="public">Public (Everyone)</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t ">
                        <div>
                          <h3 className="text-sm font-medium">Show in Public Leaderboards</h3>
                          <p className="text-sm ">Allow your achievements to appear on public leaderboards</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            defaultChecked={true}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t ">
                        <div>
                          <h3 className="text-sm font-medium">Allow Friend Requests</h3>
                          <p className="text-sm ">Let other users send you friend requests</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            defaultChecked={true}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button 
                      type="button" 
                      onClick={handleSave}
                      className=" px-4 py-2 rounded-md  focus:outline-none focus:ring-2 "
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}