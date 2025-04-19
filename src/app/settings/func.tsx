// func.ts
import { ChangeEvent, FormEvent } from "react";
import { 
  AccountFormState, 
  NotificationSettingsState, 
  WorkoutPreferencesState,
  ProfileFormState
} from "./types";

export const handleAccountChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  accountForm: AccountFormState,
  setAccountForm: React.Dispatch<React.SetStateAction<AccountFormState>>
) => {
  const { name, value } = e.target;
  setAccountForm({ ...accountForm, [name]: value });
};

export const handleNotificationToggle = (
  setting: keyof NotificationSettingsState,
  notificationSettings: NotificationSettingsState,
  setNotificationSettings: React.Dispatch<React.SetStateAction<NotificationSettingsState>>
) => {
  setNotificationSettings({
    ...notificationSettings,
    [setting]: !notificationSettings[setting]
  });
};

export const handleWorkoutPrefChange = (
  setting: keyof WorkoutPreferencesState,
  value: string,
  workoutPreferences: WorkoutPreferencesState,
  setWorkoutPreferences: React.Dispatch<React.SetStateAction<WorkoutPreferencesState>>
) => {
  setWorkoutPreferences({
    ...workoutPreferences,
    [setting]: value
  });
};

export const handleProfileChange = (
  setting: keyof ProfileFormState,
  value: string,
  profileForm: ProfileFormState,
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileFormState>>
) => {
  setProfileForm({
    ...profileForm,
    [setting]: value
  });
};

// This function is no longer used as we've moved the save logic to the component
export const handleSave = (
  e: FormEvent,
  accountForm: AccountFormState,
  notificationSettings: NotificationSettingsState,
  workoutPreferences: WorkoutPreferencesState,
  profileForm: ProfileFormState
) => {
  e.preventDefault();
  
  // Save to local storage
  localStorage.setItem('accountSettings', JSON.stringify(accountForm));
  localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  localStorage.setItem('workoutPreferences', JSON.stringify(workoutPreferences));
  localStorage.setItem('profileSettings', JSON.stringify(profileForm));
  
  // You would typically send this data to your backend API here
  console.log('Saving settings:', {
    accountForm,
    notificationSettings,
    workoutPreferences,
    profileForm
  });
  
  // Show a success message
  alert('Settings saved successfully!');
};

// Helper function to load data from localStorage with type safety
export const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};