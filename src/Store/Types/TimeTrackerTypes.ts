export interface TimeTrackerData {
  id?: string;
  userId: string;
  taskDescription: string;
  pageId: string;
  pageTitle: string;
  timeSpent: number;
}
export interface TimeTracker {
  message: string | any;
  isError: boolean;
  isLoading: boolean;
}
