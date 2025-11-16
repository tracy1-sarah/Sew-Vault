import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { userProfileService, type UserProfile } from '@/services/userProfileService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Load user profile when user is authenticated
        try {
          const profile = await userProfileService.getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Failed to load user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      let message = 'Failed to sign in';

      if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user profile if name is provided
      if (name && userCredential.user) {
        await userProfileService.saveUserProfile(userCredential.user.uid, {
          name,
          email,
          createdAt: new Date().toISOString(),
        });
        // Reload profile
        const profile = await userProfileService.getUserProfile(userCredential.user.uid);
        setUserProfile(profile);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Save user profile if it doesn't exist (for Google sign-in)
      if (result.user) {
        const existingProfile = await userProfileService.getUserProfile(result.user.uid);
        if (!existingProfile) {
          const displayName = result.user.displayName || result.user.email?.split('@')[0] || 'User';
          await userProfileService.saveUserProfile(result.user.uid, {
            name: displayName,
            email: result.user.email || '',
            createdAt: new Date().toISOString(),
          });
        }
        // Reload profile
        const profile = await userProfileService.getUserProfile(result.user.uid);
        setUserProfile(profile);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email');
      throw err;
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
  };
}

