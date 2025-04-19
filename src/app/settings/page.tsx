/* eslint-disable react/no-unescaped-entities */
// pages/settings.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import Head from "next/head";
import { AccountFormState, NotificationSettingsState, WorkoutPreferencesState, ProfileFormState } from "./types";
import { handleAccountChange, handleNotificationToggle, handleWorkoutPrefChange, handleProfileChange } from "./func";
import Image from "next/image";

export default function SettingsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("account");
  
  // Initialize with default values
  const [accountForm, setAccountForm] = useState<AccountFormState>({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Fitness enthusiast looking to improve strength and endurance.",
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsState>({
    workoutReminders: true,
    achievementAlerts: true,
    friendActivity: false,
    emailUpdates: true,
  });
  
  const [workoutPreferences, setWorkoutPreferences] = useState<WorkoutPreferencesState>({
    defaultDuration: "45",
    fitnessGoal: "strength",
    difficultyLevel: "intermediate",
    equipmentAccess: "full",
  });

  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    username: "johndoe_fitness",
    displayName: "John Doe",
    profilePicture: "",
    age: "30",
    height: "175",
    weight: "75",
    fitnessLevel: "intermediate",
    privacySetting: "friends"
  });

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    // Load account settings
    const savedAccount = localStorage.getItem('accountSettings');
    if (savedAccount) {
      try {
        setAccountForm(JSON.parse(savedAccount));
      } catch (error) {
        console.error("Error parsing account settings:", error);
      }
    }

    // Load notification settings
    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
      try {
        setNotificationSettings(JSON.parse(savedNotifications));
      } catch (error) {
        console.error("Error parsing notification settings:", error);
      }
    }

    // Load workout preferences
    const savedWorkoutPrefs = localStorage.getItem('workoutPreferences');
    if (savedWorkoutPrefs) {
      try {
        setWorkoutPreferences(JSON.parse(savedWorkoutPrefs));
      } catch (error) {
        console.error("Error parsing workout preferences:", error);
      }
    }

    // Load profile settings
    const savedProfile = localStorage.getItem('profileSettings');
    if (savedProfile) {
      try {
        setProfileForm(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Error parsing profile settings:", error);
      }
    }
  }, []);

  // Function to save all settings to localStorage
  const saveToLocalStorage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save all settings to localStorage
    localStorage.setItem('accountSettings', JSON.stringify(accountForm));
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    localStorage.setItem('workoutPreferences', JSON.stringify(workoutPreferences));
    localStorage.setItem('profileSettings', JSON.stringify(profileForm));
    
    // Show success message
    alert('Settings saved successfully!');
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
            <div className="rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Settings Menu</h2>
              </div>
              <nav className="flex flex-col md:space-y-1 md:block">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left ${
                    activeTab === "account" ? "font-medium" : ""
                  }`}
                >
                  <span>Account</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left ${
                    activeTab === "notifications" ? "font-medium" : ""
                  }`}
                >
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab("workout")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left ${
                    activeTab === "workout" ? "font-medium" : ""
                  }`}
                >
                  <span>Workout Preferences</span>
                </button>
                <button
                  onClick={() => setActiveTab("Edit Profile")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left ${
                    activeTab === "Edit Profile" ? "font-medium" : ""
                  }`}
                >
                  <span>Edit Profile</span>
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
                  <p className="text-sm">Manage your account information and preferences</p>
                </div>
                <div className="p-6">
                  <form onSubmit={saveToLocalStorage}>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text"
                            name="name"
                            value={accountForm.name}
                            onChange={(e) => handleAccountChange(e, accountForm, setAccountForm)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input 
                            type="email"
                            name="email"
                            value={accountForm.email}
                            onChange={(e) => handleAccountChange(e, accountForm, setAccountForm)}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                          <p className="text-sm mt-1">We'll never share your email with anyone else.</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Bio</label>
                          <textarea 
                            name="bio"
                            value={accountForm.bio}
                            onChange={(e) => handleAccountChange(e, accountForm, setAccountForm)}
                            rows={4}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          />
                          <p className="text-sm mt-1">Tell us a bit about yourself and your fitness journey.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button 
                        type="submit" 
                        className="bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                  <p className="text-sm">Choose how and when you want to be notified</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="text-sm font-medium">Workout Reminders</h3>
                          <p className="text-sm">Get notified before your scheduled workouts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.workoutReminders}
                            onChange={() => handleNotificationToggle("workoutReminders", notificationSettings, setNotificationSettings)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t">
                        <div>
                          <h3 className="text-sm font-medium">Achievement Alerts</h3>
                          <p className="text-sm">Receive notifications when you reach fitness milestones</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.achievementAlerts}
                            onChange={() => handleNotificationToggle("achievementAlerts", notificationSettings, setNotificationSettings)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t">
                        <div>
                          <h3 className="text-sm font-medium">Friend Activity</h3>
                          <p className="text-sm">Get updates when friends complete workouts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.friendActivity}
                            onChange={() => handleNotificationToggle("friendActivity", notificationSettings, setNotificationSettings)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t">
                        <div>
                          <h3 className="text-sm font-medium">Email Updates</h3>
                          <p className="text-sm">Receive weekly digest and important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.emailUpdates}
                            onChange={() => handleNotificationToggle("emailUpdates", notificationSettings, setNotificationSettings)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button 
                      type="button" 
                      onClick={saveToLocalStorage}
                      className="bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2"
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
                  <p className="text-sm">Customize your workout experience and goals</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Default Workout Duration (minutes)</label>
                        <input 
                          type="number"
                          value={workoutPreferences.defaultDuration}
                          onChange={(e) => handleWorkoutPrefChange("defaultDuration", e.target.value, workoutPreferences, setWorkoutPreferences)}
                          min="5"
                          max="180"
                          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Primary Fitness Goal</label>
                        <select 
                          value={workoutPreferences.fitnessGoal}
                          onChange={(e) => handleWorkoutPrefChange("fitnessGoal", e.target.value, workoutPreferences, setWorkoutPreferences)}
                          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
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
                          onChange={(e) => handleWorkoutPrefChange("difficultyLevel", e.target.value, workoutPreferences, setWorkoutPreferences)}
                          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
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
                          onChange={(e) => handleWorkoutPrefChange("equipmentAccess", e.target.value, workoutPreferences, setWorkoutPreferences)}
                          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
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
                      onClick={saveToLocalStorage}
                      className="bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Edit Profile Settings */}
              <div className={activeTab === "Edit Profile" ? "block" : "hidden"}>
                <div className="border-b p-4">
                  <h2 className="text-xl font-semibold">Edit Profile</h2>
                  <p className="text-sm">Customize how others see you and your fitness journey</p>
                </div>
                <div className="p-6">
                  <form onSubmit={saveToLocalStorage}>
                    <div className="space-y-6">
                      <div>
                        <div className="flex flex-col items-center mb-6">
                          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden relative">
                            {profileForm.profilePicture ? (
                              <Image 
                                width={96}
                                height={96}
                                src={profileForm.profilePicture} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <span>Upload Photo</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    handleProfileChange("profilePicture", reader.result as string, profileForm, setProfileForm);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input 
                              type="text"
                              name="username"
                              value={profileForm.username}
                              onChange={(e) => handleProfileChange("username", e.target.value, profileForm, setProfileForm)}
                              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <p className="text-sm mt-1">This will be your unique identifier in the community</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Display Name</label>
                            <input 
                              type="text"
                              name="displayName"
                              value={profileForm.displayName}
                              onChange={(e) => handleProfileChange("displayName", e.target.value, profileForm, setProfileForm)}
                              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <p className="text-sm mt-1">This is the name shown to others</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Age</label>
                              <input 
                                type="number"
                                name="age"
                                value={profileForm.age}
                                onChange={(e) => handleProfileChange("age", e.target.value, profileForm, setProfileForm)}
                                min="13"
                                max="120"
                                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Height (cm)</label>
                              <input 
                                type="number"
                                name="height"
                                value={profileForm.height}
                                onChange={(e) => handleProfileChange("height", e.target.value, profileForm, setProfileForm)}
                                min="50"
                                max="250"
                                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                              <input 
                                type="number"
                                name="weight"
                                value={profileForm.weight}
                                onChange={(e) => handleProfileChange("weight", e.target.value, profileForm, setProfileForm)}
                                min="20"
                                max="300"
                                step="0.1"
                                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Fitness Level</label>
                            <select 
                              name="fitnessLevel"
                              value={profileForm.fitnessLevel}
                              onChange={(e) => handleProfileChange("fitnessLevel", e.target.value, profileForm, setProfileForm)}
                              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                              <option value="elite">Elite</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Profile Privacy</label>
                            <select 
                              name="privacySetting"
                              value={profileForm.privacySetting}
                              onChange={(e) => handleProfileChange("privacySetting", e.target.value, profileForm, setProfileForm)}
                              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                              <option value="public">Public - Anyone can view your profile</option>
                              <option value="friends">Friends Only - Only friends can view your profile</option>
                              <option value="private">Private - Only you can view your profile</option>
                            </select>
                            <p className="text-sm mt-1">This controls who can see your profile information and workout data</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button 
                        type="submit" 
                        className="bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}