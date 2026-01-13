import routes from '@core/navigations/routes';
import { clearAll } from '@core/store/store';
import { useUserStore } from '@core/store/user.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
export function goBack() {
  navigationRef.current?.goBack();
}
export function resetNavigation(
  routes: Array<{ name: string; params?: any }>,
  index = 0,
) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
}

export const handleLogOut = () => {
  clearAll();
  AsyncStorage.clear();
  queryClient.clear();

  // Reset Zustand stores
  useUserStore.getState().reset();

  // Clear React Query cache

  resetNavigation([{ name: routes.login }]);
};

export const getRandomColor = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

const COLORS = ['#EF940F', '#39B588', '#BF0637', '#A78BFA', '#FCD34D'];
const RESCOLORS = ['#BF0637', '#EF940F', '#F35508', '#39B588'];
export const color = getRandomColor(COLORS);
export const resColor = getRandomColor(RESCOLORS);
export const formatNumberThousand = (value: string) => {
  const num = Number(value);
  if (isNaN(num)) return value; // Return original if not a number

  return num >= 1000 ? num.toLocaleString() : String(num);
};

export const formatNumber = (
  num: number | null | undefined,
  decimalPlaces: number = 1,
): string => {
  if (num === null || num === undefined) return '-';
  if (typeof num !== 'number') return String(num);

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum < 1000) {
    return `${num}`;
  } else if (absNum >= 1e3 && absNum < 1e6) {
    // UPDATED: Divide by 1000 and add 'K'
    return `${sign}${(absNum / 1e3).toFixed(decimalPlaces)}K`;
  } else if (absNum >= 1e6 && absNum < 1e9) {
    return `${sign}${(absNum / 1e6).toFixed(decimalPlaces)}M`;
  } else if (absNum >= 1e9 && absNum < 1e12) {
    return `${sign}${(absNum / 1e9).toFixed(decimalPlaces)}B`;
  } else {
    return `${sign}${(absNum / 1e12).toFixed(decimalPlaces)}T`;
  }
};
