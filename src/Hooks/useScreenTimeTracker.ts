import { useEffect, useRef, useState } from 'react';

interface ScreenTimeEntry {
  id: number;
  eventName: string;
  timeSpent: number;
}

export const useScreenTimeTrack = (location: boolean) => {
  const [screenTime, setScreenTime] = useState<ScreenTimeEntry[]>([]);
  const startTimeRef = useRef<Date | null>(null);
  const currentScreenRef = useRef<string | null>(null);

  const addScreenTimeEntry = (eventName: string, isLocation: boolean) => {
    if (!eventName) {
      return;
    }

    const currentTime = Date.now();
    const duration =
      currentTime - (startTimeRef.current?.getTime() || currentTime);

    if (currentScreenRef.current) {
      const newEntry = {
        id: currentTime,
        eventName: isLocation
          ? `Location: ${currentScreenRef.current}`
          : `Event: ${eventName}`,
        timeSpent: duration,
      };

      setScreenTime((prev) => {
        const isDuplicate = prev.some(
          (entry) =>
            entry.id === newEntry.id && entry.timeSpent === newEntry.timeSpent
        );

        if (!isDuplicate) {
          return [...prev, newEntry];
        }

        return prev;
      });
    }

    currentScreenRef.current = isLocation
      ? eventName
      : currentScreenRef.current;
    startTimeRef.current = new Date();
  };

  const updateScreenTime = (eventName: string) => {
    if (location) {
      addScreenTimeEntry(eventName, true);
    } else {
      addScreenTimeEntry(eventName, false);
    }
  };

  useEffect(() => {
    if (location) {
      return () => {
        if (currentScreenRef.current && startTimeRef.current) {
          addScreenTimeEntry(currentScreenRef.current, true);
        }
      };
    }
  }, [location]); // Dependency ensures cleanup for location mode only

  return { screenTime, updateScreenTime };
};
