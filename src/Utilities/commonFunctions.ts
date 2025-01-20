import { unwrapResult } from '@reduxjs/toolkit';
import { getAccessToken } from '../Store/Selectors/AuthSelector';
import { createApiClient } from '../Services/apiClients';

export const generateRandomId = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const formatElapsedTime = (durationInSeconds: number | null): string => {
  if (durationInSeconds === null) return '0 seconds';
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

export const breakWords = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const unWrapReponse = (response: any) => {
  const message = unwrapResult(response);

  return message;
};

export const getApiClient = (state: any) => {
  const accessToken = getAccessToken(state);

  return createApiClient(accessToken);
};

export const generateColor = (input?: string) => {
  if (input) {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = `#${((hash >> 0) & 0xffffff).toString(16).padStart(6, '0')}`;

    return color;
  } else {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  }
};

export const generateColorWithAlpha = (input: string, alpha: number) => {
  let hex = generateColor(input + input.slice(0, 2));

  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const capitalizeFirstWord = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// return date in YYYY-MM-DD format
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const getValueFromLocalStorage = (key: string, initialValue: string) => {
  try {
    const item = window.localStorage.getItem(key);

    return item ? item : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

export const setValueToLocalStorage = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const removeValueFromLocalStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const formatDateTime = (dateString, options = { format: 'both' }) => {
  const dateObj = new Date(dateString);

  const formattedDate = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  switch (options.format) {
    case 'date':
      return formattedDate;
    case 'time':
      return formattedTime;
    default:
      return `${formattedDate} at ${formattedTime}`;
  }

  // formatDateTime(inputDate) // Output: "02 Jan, 2025 at 19:00"
  // formatDateTime(inputDate, { format: "date" }) // Output: "02 Jan, 2025"
  // formatDateTime(inputDate, { format: "time" }) // Output: "19:00"
};
