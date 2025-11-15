import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const userProfileService = {
  // Create or update user profile
  async saveUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    try {
      const userDocRef = doc(db, 'users', userId);
      const now = new Date().toISOString();
      
      const profileData = {
        ...profile,
        updatedAt: now,
        createdAt: profile.createdAt || now,
      };
      
      await setDoc(userDocRef, profileData, { merge: true });
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  },

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
};

