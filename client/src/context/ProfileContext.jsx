import React, { createContext, useState, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';

export const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const res = await profileService.getProfile();
      if (res?.data?.profile) {
        setProfile(res.data.profile);
      } else if (res?.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.warn('[ProfileContext] Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, refetchProfile: fetchProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}
