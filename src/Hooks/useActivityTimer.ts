import { useDispatch, useSelector } from 'react-redux';
import {
  updateTimer,
  addTimer,
  removeTimer,
  addActivity,
  updateActivity,
  removeActivity,
} from '../Store/Reducer/ActivityTrackerSlice';
import { Activity, Timer } from '../Store/Types/ActivityTrackerType';
import { useCallback, useMemo } from 'react';
import {
  getActivities,
  getActivityTimeTrackerList,
} from '../Store/Selectors/ActivityTrackerSelector';
import { useThunkDispatch } from './useThunkDispatch';
import { getUserData } from '../Store/Selectors/AuthSelector';
import {
  deleteActivityTracker,
  getActivityTrackerList,
  postActivityTracker,
  updateActivityTracker,
} from '../Store/Thunk/ActivityTrackerThunk';
import { Rejected } from '../Utilities/ApplicationConstants';
import { useToast } from '../Components/Toast';

export const useActivityTimers = () => {
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const timers = useSelector(getActivityTimeTrackerList);
  const activities = useSelector(getActivities);
  const currentUserData = useSelector(getUserData);
  const { showToast } = useToast();

  const startTimer = (id: string) => {
    const existingTimer = timers.find((timer) => timer.id === id);

    if (existingTimer) {
      dispatch(
        updateTimer({
          ...existingTimer,
          startTimestamp: existingTimer.pausedTimestamp
            ? existingTimer.startTimestamp +
              (Date.now() - existingTimer.pausedTimestamp)
            : Date.now(),
          endTimestamp: null,
          pausedTimestamp: null,
          paused: false,
        })
      );
    } else {
      const newTimer: Timer = {
        id,
        startTimestamp: Date.now(),
        endTimestamp: null,
        pausedTimestamp: null,
        paused: false,
        durationInSeconds: null,
      };

      dispatch(addTimer(newTimer));
    }
  };

  const pauseTimer = (id: string) => {
    const timer = timers.find((singleTimer) => singleTimer.id === id);

    if (timer) {
      dispatch(
        updateTimer({
          ...timer,
          pausedTimestamp: Date.now(),
          paused: true,
        })
      );
    }
  };

  const stopTimer = useCallback(
    async (id: string, timersList: Timer[]) => {
      setInterval(() => {}, 1000);
      const time = timersList.find((timer) => timer.id === id);

      if (time && time.startTimestamp) {
        dispatch(
          updateTimer({
            ...time,
            endTimestamp: Date.now(),
            durationInSeconds: Math.round(
              (Date.now() - time.startTimestamp) / 1000
            ),
            paused: false,
          })
        );

        const activity = activities.find(
          (singleActivity) => singleActivity.id === id
        );

        let response: any = {};

        let payload: any = {
          customerId: activity?.customerId,
          userId: currentUserData?.userId,
          mainCategory: activity?.mainCategory,
          subTask: activity?.subTask,
          detailedSubTask: activity?.detailedSubTask,
          description: activity?.description,
          context: activity?.context,
          date: new Date().toISOString(),
        };

        if (id.length > 5) {
          if (activity && activity.duration) {
            payload = {
              ...payload,
              id: activity.id,
              duration:
                Math.round((Date.now() - time.startTimestamp) / 1000) +
                activity?.duration,
            };

            await thunkDispatch(updateActivityTracker(payload));
          }
        } else {
          payload = {
            ...payload,
            duration: Math.round((Date.now() - time.startTimestamp) / 1000),
          };
          response = await thunkDispatch(postActivityTracker(payload));
        }

        if (response?.type?.includes(Rejected)) {
          showToast('error', 'Error while updating activity');
        } else {
          showToast(
            'success',
            id.length <= 5
              ? 'Activity added successfully'
              : 'Activity updated successfully'
          );
          if (id.length <= 5) {
            removeActivity(id);
            dispatch(removeTimer(id));
          }

          await thunkDispatch(getActivityTrackerList({}));
        }
      }
    },
    [timers, activities]
  );

  const resetTimer = (id: string) => {
    dispatch(removeTimer(id));
  };

  const addActivityTimer = (activity: Activity) => {
    dispatch(addActivity(activity));
  };

  const updateActivityTimer = (activity: Activity) => {
    dispatch(updateActivity(activity));
  };

  const deleteActivityTimer = async (id: string) => {
    if (id.length > 5) {
      const response = await thunkDispatch(deleteActivityTracker(id));

      if (response?.type?.includes(Rejected)) {
        showToast('error', 'Id is not valid');
      } else {
        showToast('info', 'Activity deleted successfully');

        await thunkDispatch(getActivityTrackerList({}));
      }

      dispatch(removeTimer(id));
    } else {
      dispatch(removeTimer(id));
      dispatch(removeActivity(id));
    }
  };

  // help to group activities by day and week

  const formatUTCDate = (date: Date) => {
    if (isNaN(date.getTime())) {
      console.error('Invalid date value encountered:', date);
      return ''; // Fallback to an empty string or default value
    }

    return date.toISOString().split('T')[0];
  };

  const activitiesDayArray = useMemo(() => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    const todayLocal = new Date(now.getTime() - timezoneOffset);

    const yesterdayLocal = new Date(todayLocal);

    yesterdayLocal.setDate(todayLocal.getDate() - 1);

    const weekStartLocal = new Date(todayLocal);

    weekStartLocal.setDate(todayLocal.getDate() - todayLocal.getDay()); // Start of the week (Sunday)

    const daysMap = new Map();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStartLocal.getTime() + i * 86400000); // Add days in milliseconds

      daysMap.set(formatUTCDate(currentDate), {
        date: formatUTCDate(currentDate),
        day:
          currentDate.getTime() === todayLocal.getTime()
            ? 'Today'
            : currentDate.getTime() === yesterdayLocal.getTime()
              ? 'Yesterday'
              : currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
        activities: [],
      });
    }

    activities.forEach((activity) => {
      const activityDate = activity?.utcDate
        ? formatUTCDate(
            new Date(new Date(activity.utcDate).getTime() - timezoneOffset)
          )
        : null;

      if (activityDate && daysMap.has(activityDate)) {
        daysMap.get(activityDate)?.activities.push(activity);
      }
    });

    return Array.from(daysMap.values()).sort((a, b) => {
      if (a.day === 'Today') return -1;
      if (b.day === 'Today') return 1;
      if (a.day === 'Yesterday') return -1;
      if (b.day === 'Yesterday') return 1;
      return 0;
    });
  }, [activities]);

  return {
    timers,
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
    activitiesDayArray,
    addActivityTimer,
    updateActivityTimer,
    deleteActivityTimer,
  };
};
