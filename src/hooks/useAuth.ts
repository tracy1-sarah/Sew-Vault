import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { userProfileService, type UserProfile } from '@/services/userProfileService';

const getErrorMessage = (err: unknown, fallback: string) =>
  err instanceof Error && err.message ? err.message : fallback;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loadedProfile, setLoadedProfile] = useState<{ userId: string; profile: UserProfile | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Token refreshes hand back a new user object for the same person; keep the
    // old one so effects keyed on `user` (like loading clients) don't re-run.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser((prev) => (prev?.id === nextUser?.id ? prev : nextUser));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load the profile outside the auth callback; Supabase warns against
  // awaiting other Supabase calls inside onAuthStateChange.
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    userProfileService
      .getUserProfile(userId)
      .then((profile) => {
        if (!cancelled) setLoadedProfile({ userId, profile });
      })
      .catch((err) => console.error('Failed to load user profile:', err));
    return () => {
      cancelled = true;
    };
  }, [userId]);
  const userProfile = loadedProfile && loadedProfile.userId === userId ? loadedProfile.profile : null;

  const login = async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(getErrorMessage(error, 'Failed to sign in'));
    }
  };

  // Resolves to true when the user must confirm their email before signing in.
  const signup = async (email: string, password: string, name?: string) => {
    setError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: name ? { name } : undefined,
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setError(getErrorMessage(error, 'Failed to sign up'));
      throw error;
    }
    return !data.session;
  };

  // Redirects to Google, then back to the dashboard.
  const loginWithGoogle = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      setError(getErrorMessage(error, 'Failed to sign in with Google'));
      throw error;
    }
  };

  const logout = async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(getErrorMessage(error, 'Failed to sign out'));
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError(getErrorMessage(error, 'Failed to send password reset email'));
      throw error;
    }
  };

  // Used by the reset-password page after the user follows the email link.
  const updatePassword = async (password: string) => {
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(getErrorMessage(error, 'Failed to update password'));
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    updatePassword,
  };
}
