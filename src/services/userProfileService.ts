import { supabase } from '@/lib/supabase';

export interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Profiles are created by a database trigger when a user signs up
// (see supabase/schema.sql), so the app only reads and updates them.
export const userProfileService = {
  // Update user profile
  async saveUserProfile(userId: string, profile: Partial<Pick<UserProfile, 'name' | 'email'>>): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ ...profile, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  },

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, email, created_at, updated_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    if (!data) return null;

    return {
      name: data.name ?? '',
      email: data.email ?? '',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },
};
