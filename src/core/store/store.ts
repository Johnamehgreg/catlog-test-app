import { StoreKey } from '@core/utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Primitive = string | number | boolean;

/**
 * Safely parses a string into a JSON object or returns the original string.
 */
const safeParse = <T>(value: string): T | string => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return value;
  }
};

/**
 * Sets a UI item in AsyncStorage.
 */
export async function setItem<T extends Primitive | object>(
  key: StoreKey,
  value: T,
): Promise<void> {
  try {
    const serialized =
      typeof value === 'object' ? JSON.stringify(value) : String(value);
    await AsyncStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
}

/**
 * Gets a UI item from AsyncStorage.
 */
export async function getItem<T extends Primitive | object>(
  key: StoreKey,
): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return safeParse<T>(raw) as T;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
}

/**
 * Gets a boolean from AsyncStorage, defaulting to false.
 */
export async function getBoolean(key: StoreKey): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(key);
    // Parse the string "true" or JSON true
    return value === 'true' || value === '1'; 
  } catch {
    return false;
  }
}

/**
 * Gets a number from AsyncStorage, defaulting to 0.
 */
export async function getNumber(key: StoreKey): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? Number(value) : 0;
  } catch {
    return 0;
  }
}

/**
 * Deletes a specific item from AsyncStorage.
 */
export async function deleteItem(key: StoreKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
  }
}

/**
 * Clears all items from AsyncStorage.
 */
export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}