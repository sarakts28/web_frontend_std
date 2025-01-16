export interface Timer {
  id: string;
  startTimestamp: number;
  endTimestamp: number | null;
  pausedTimestamp: number | null;
  paused: boolean;
  durationInSeconds: number | null;
}

export interface Activity {
  id: string;
  customerId: string;
  userId: string;
  mainCategory: string;
  subTask: string;
  detailedSubTask?: string;
  description?: string;
  context: string;
  localDate: string;
  utcDate?: string;
  date?: Date;
  labelArray?: string[];
  duration: number;
}

export interface TimeTracker {
  message: any;
  isError: boolean;
  isLoading: boolean;
}
