import { UserValue } from '@core/utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import directly
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface UserStoreState {
  // 1. Allow null. This represents a "logged out" state.
  user: UserValue | null;
  token: string | null;
  setUser: (value: UserValue) => void;
  setToken: (value: string) => void;
  reset: () => void;

}

const initialState = {
  // 2. Initialize as null instead of an empty object
  user: null,
  token: null
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (value: UserValue) => set({ user: value }),
      reset: () => set(initialState),
      setToken: (value: string) => set({ token: value }),
    }),
    {
      name: 'app-user-store',
      storage: createJSONStorage(() => AsyncStorage),

    },
  ),
);