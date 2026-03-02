import { STORAGE_KEYS } from "@/constants/storage";
import * as SecureStore from "expo-secure-store";

export const saveTokens = async (
  accessToken: string,
  refreshToken?: string,
) => {
  await SecureStore.setItemAsync(STORAGE_KEYS.accessToken, accessToken);
  if (refreshToken) {
    await SecureStore.setItemAsync(STORAGE_KEYS.refreshToken, refreshToken);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(STORAGE_KEYS.accessToken);
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(STORAGE_KEYS.refreshToken);
};

export const deleteTokens = async () => {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.accessToken);
  await SecureStore.deleteItemAsync(STORAGE_KEYS.refreshToken);
};

export const saveUserData = async (userData: object) => {
  await SecureStore.setItemAsync(
    STORAGE_KEYS.userData,
    JSON.stringify(userData),
  );
};

export const getUserData = async <T = unknown>(): Promise<T | null> => {
  const data = await SecureStore.getItemAsync(STORAGE_KEYS.userData);
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
};

export const deleteUserData = async () => {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.userData);
};

export const saveDailyGoal = async (goal: string) => {
  await SecureStore.setItemAsync(STORAGE_KEYS.dailyGoal, goal);
};

export const getDailyGoal = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(STORAGE_KEYS.dailyGoal);
};
