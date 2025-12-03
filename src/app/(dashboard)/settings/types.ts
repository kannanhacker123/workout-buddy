
// types.ts
export interface AccountFormState {
    name: string;
    email: string;
    bio: string;
  }
  
  export interface NotificationSettingsState {
    workoutReminders: boolean;
    achievementAlerts: boolean;
    friendActivity: boolean;
    emailUpdates: boolean;
  }
  
  export interface WorkoutPreferencesState {
    defaultDuration: string;
    fitnessGoal: string;
    difficultyLevel: string;
    equipmentAccess: string;
  }
  
  export interface ProfileFormState {
    username: string;
    displayName: string;
    profilePicture: string;
    age: string;
    height: string;
    weight: string;
    fitnessLevel: string;
    privacySetting: string;
  }
  