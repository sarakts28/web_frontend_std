import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MdStop } from 'react-icons/md';
import { IoPause, IoPlay } from 'react-icons/io5';
import { BiReset } from 'react-icons/bi';
import { useActivityTimers } from '../../Hooks/useActivityTimer';
import { breakWords, formatElapsedTime } from '../../Utilities/commonFunctions';
import { Activity } from '../../Store/Types/ActivityTrackerType';
import { LuActivity } from 'react-icons/lu';

interface ActivityListProps {
  activity: Activity[];
  currentUserData: any;
}

export default function ActivityList({
  activity,
  currentUserData,
}: ActivityListProps) {
  const {
    timers,
    startTimer,
    stopTimer,
    pauseTimer,
    resetTimer,
    updateActivityTimer,
  } = useActivityTimers();
  const [, forceRender] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceRender((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateActivityTimerHandler = (activeItem: Activity) => {
    updateActivityTimer({
      id: activeItem.id,
      customerId: activeItem.customerId,
      userId: currentUserData?.userId,
      mainCategory: activeItem.mainCategory,
      subTask: activeItem?.subTask ? activeItem?.subTask : '',
      detailedSubTask: activeItem?.detailedSubTask
        ? activeItem?.detailedSubTask
        : '',
      description: activeItem?.description ? activeItem?.description : '',
      context: activeItem?.context ? activeItem?.context : '',
      localDate: new Date().toISOString(),
      utcDate: new Date().toISOString(),
      duration:
        timers.find((timer) => timer.id === activeItem.id)?.durationInSeconds ||
        0,
    });

    startTimer(activeItem.id);
  };

  const onHandlePlayTimer = (activeItem: Activity) => {
    if (activeItem.duration > 0) {
      startTimer(activeItem.id);
      return;
    }

    updateActivityTimerHandler(activeItem);
  };

  const onHandleStopTimer = (activeItem: Activity) => {
    stopTimer(activeItem.id, timers);
  };
  return (
    <List>
      {activity.map((activity) => {
        const currentTimer = timers.find((timer) => timer.id === activity.id);
        const isRunning =
          currentTimer && !currentTimer.endTimestamp && !currentTimer.paused;
        const isPaused = currentTimer && currentTimer.paused;

        const elapsedTime = currentTimer?.durationInSeconds || 0;

        return (
          <ListItem key={activity.id}>
            <ListItemIcon style={{ minWidth: '30px' }}>
              <LuActivity size={24} />
            </ListItemIcon>
            <ListItemText
              primary={breakWords(activity.mainCategory)}
              secondary={
                <>
                  Time Elapsed:{' '}
                  {isPaused
                    ? 'Paused'
                    : formatElapsedTime(
                        elapsedTime +
                          (isRunning
                            ? Math.round(
                                (Date.now() - currentTimer.startTimestamp!) /
                                  1000
                              )
                            : 0)
                      )}
                </>
              }
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {isRunning ? (
                <MdStop
                  size={24}
                  color="red"
                  onClick={() => onHandleStopTimer(activity)}
                />
              ) : (
                <IconButton disabled={activity?.customerId ? false : true}>
                  <IoPlay
                    size={24}
                    color={activity?.customerId ? 'green' : 'grey'}
                    onClick={() => onHandlePlayTimer(activity)}
                  />
                </IconButton>
              )}
              {isRunning || isPaused ? (
                <IoPause
                  size={24}
                  color="orange"
                  onClick={() => pauseTimer(activity.id)}
                />
              ) : null}
              {currentTimer?.durationInSeconds &&
                currentTimer?.durationInSeconds > 0 && (
                  <BiReset
                    size={24}
                    color="blue"
                    onClick={() => resetTimer(activity.id)}
                    title="Reset Timer"
                  />
                )}
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
}
