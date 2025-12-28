import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ProfileData } from '../types';

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setProfile({
            name: data.name || '',
            age: data.age || '',
            location: data.location || '',
            bio: data.bio || '',
            profileImage: data.profile_image_url || '',
          });
        }
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch profile'
        );
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // For sign-up: Create user account first, then create profile
  // This uses Supabase Auth which auto-generates the userId in auth.users table
  const createProfile = async (
    email: string,
    password: string,
    profileData: ProfileData
  ): Promise<
    { success: true; userId: string } | { success: false; error: string }
  > => {
    try {
      // Step 1: Create user account using Supabase Auth
      // This automatically creates a user in auth.users and generates a userId
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Supabase auth error:', authError);
        throw new Error(authError.message || 'Failed to create user account');
      }

      if (!authData.user) {
        throw new Error('Failed to create user account - no user returned');
      }

      // Step 2: Get the auto-generated userId from the created user
      const newUserId = authData.user.id;

      // Step 3: Create profile with the auto-generated userId
      // This will satisfy the foreign key constraint since userId exists in auth.users
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: newUserId,
        name: profileData.name,
        age: profileData.age,
        location: profileData.location,
        bio: profileData.bio,
        profile_image_url: profileData.profileImage,
      });

      if (profileError) {
        console.error('Supabase insert error:', profileError);
        throw new Error(profileError.message || 'Failed to insert profile');
      }

      setProfile(profileData);
      return { success: true, userId: newUserId };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // For update: Update existing profile (requires userId)
  const updateProfile = async (
    profileData: ProfileData
  ): Promise<{ success: true } | { success: false; error: string }> => {
    if (!userId) {
      return { success: false, error: 'User ID is required' };
    }

    try {
      const { error: updateError } = await supabase.from('profiles').upsert({
        user_id: userId,
        name: profileData.name,
        age: profileData.age,
        location: profileData.location,
        bio: profileData.bio,
        profile_image_url: profileData.profileImage,
        updated_at: new Date().toISOString(),
      });

      if (updateError) throw updateError;

      setProfile(profileData);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return { profile, loading, error, createProfile, updateProfile };
}
