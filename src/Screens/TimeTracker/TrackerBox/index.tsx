import {
  ButtonField,
  InputField,
  MultiLevelSelector,
  VerticalLines,
  VerticalMenu,
} from '../../../Components';
import {
  TrackerContainer,
  TimeTrackerbox,
  TimeTrackerInputBox,
  TimeTrackerSelectionBox,
  ActionButtonsBox,
  TimeBox,
  TimeTrackerAddIcon,
  TimeTrackerAddIconLabel,
  SelectionTypography,
} from '../style';
import useData from '../data';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useActivityTimers } from '../../../Hooks/useActivityTimer';
import {
  formatElapsedTime,
  getCurrentTime,
} from '../../../Utilities/commonFunctions';
import { Activity } from '../../../Store/Types/ActivityTrackerType';
import { Colors } from '../../../Utilities/Colors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserData } from '../../../Store/Selectors/AuthSelector';
import { FaStar } from 'react-icons/fa';
import { IoAddCircle } from 'react-icons/io5';
import { MenuItem } from './moreMenuAction';

interface TrackerBoxProps {
  activity: Activity;
  isToday: boolean;
}

const TrackerBox = ({ activity, isToday }: TrackerBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<
    { level: number; value: string }[]
  >([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [activityText, setActivityText] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const currentUserData = useSelector(getUserData);

  const { t } = useTranslation();

  const {
    updateActivityTimer,
    deleteActivityTimer,
    startTimer,
    stopTimer,
    timers,
    pauseTimer,
    resetTimer,
  } = useActivityTimers();

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data, findLabelByValue } = useData();

  const renderVerticalLine = () => {
    return (
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <VerticalLines
          noOfLines={1}
          height={50}
          width={2}
          color={Colors.littleGrey}
          lineStyle="dashed"
        />
      </Box>
    );
  };

  const updateActivityTimerHandler = () => {
    updateActivityTimer({
      id: activity.id,
      customerId: expandedPaths[0].value,
      userId: currentUserData?.userId,
      mainCategory: expandedPaths[2].value,
      subTask: expandedPaths[3].value,
      detailedSubTask:
        expandedPaths && expandedPaths.length > 4 ? expandedPaths[4].value : '',
      description: activityText,
      context: expandedPaths[1].value,
      localDate: new Date().toISOString(),
      utcDate: new Date().toISOString(),
      labelArray: selectedOptions,
      duration:
        timers.find((timer) => timer.id === activity.id)?.durationInSeconds ||
        0,
    });

    startTimer(activity.id);
  };

  const validateTime = (time: string): boolean => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };
  const isValidEndTime = (start: string, end: string): boolean => {
    if (!start || !end) return true;
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    if (endHours > startHours) return true;
    if (endHours === startHours && endMinutes > startMinutes) return true;
    return false;
  };

  const onHandlePlayTimer = () => {
    updateActivityTimerHandler();
    setStartTime(getCurrentTime());
    setEndTime('');
  };

  const onHandleStopTimer = useCallback(() => {
    setEndTime(getCurrentTime());
    stopTimer(activity.id, timers);
  }, [timers]);

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setTime: React.Dispatch<React.SetStateAction<string>>,
    isEnd: boolean = false
  ) => {
    const newTime = event.target.value;
    if (newTime === '' || (newTime.length <= 5 && validateTime(newTime))) {
      if (isEnd) {
        if (isValidEndTime(startTime, newTime)) {
          setTime(newTime);
        }
      } else {
        setTime(newTime);
        if (endTime && !isValidEndTime(newTime, endTime)) {
          setEndTime('');
        }
      }
    }
  };

  const currentTimer: any = timers.find((timer) => timer.id === activity.id);

  const isRunning =
    !!currentTimer && !currentTimer.endTimestamp && !currentTimer.paused;

  const isPaused = !!currentTimer?.paused;

  const levelNameArray = useMemo(() => {
    return ['context', 'mainCategory', 'subTasks', 'subDetailedTask'];
  }, []);

  const menuItems = useMemo(() => {
    return MenuItem(
      pauseTimer,
      resetTimer,
      deleteActivityTimer,
      activity?.id,
      isRunning,
      isPaused,
      currentTimer
    );
  }, [isRunning, isPaused, currentTimer]);

  useEffect(() => {
    if (!currentTimer || !isRunning) {
      setElapsedTime(currentTimer?.durationInSeconds || 0);
      return;
    }

    const interval = setInterval(() => {
      const time =
        currentTimer.durationInSeconds +
        Math.floor((Date.now() - (currentTimer.startTimestamp || 0)) / 1000);
      setElapsedTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTimer, isRunning]);

  useEffect(() => {
    if (!activity) return;
    else if (activity.context && activity.customerId) {
      let stringArray: string[] = [
        findLabelByValue(activity.customerId),
        findLabelByValue(activity.context),
        findLabelByValue(activity.mainCategory),
      ];
      const expandedPathsArray = [
        {
          level: 0,
          value: activity.customerId,
        },
        {
          level: 1,
          value: activity.context,
        },
        {
          level: 2,
          value: activity.mainCategory,
        },
      ];

      if (activity?.subTask) {
        expandedPathsArray.push({
          level: 3,
          value: activity.subTask,
        });
        stringArray.push(findLabelByValue(activity.subTask));
      }

      if (activity?.detailedSubTask) {
        expandedPathsArray.push({
          level: 4,
          value: activity.detailedSubTask,
        });
        stringArray.push(findLabelByValue(activity.detailedSubTask));
      }

      setExpandedPaths(expandedPathsArray);

      if (activity?.description) {
        setActivityText(activity.description);
      }

      stringArray = stringArray.filter(Boolean);

      setSelectedOptions((stringArray && stringArray) || []);

      const date = new Date(activity.localDate);

      const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const endDate = new Date(date.getTime() + activity.duration * 1000);

      const endTime = endDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      setEndTime(endTime);

      setStartTime(time);
      setElapsedTime(activity.duration);
    }
  }, [activity]);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const renderTimeContainer = () => {
    const timeContainerContent = (
      <>
        <TimeBox>
          <InputField
            sx={{ width: '55px' }}
            value={startTime}
            onChange={(e: any) => handleTimeChange(e, setStartTime, false)}
            placeholder="00:00"
            disabled={isToday ? false : true}
          />
          <InputField
            sx={{ width: '55px' }}
            value={endTime}
            onChange={(e: any) => handleTimeChange(e, setEndTime, true)}
            placeholder="00:00"
            disabled={isToday ? false : true}
          />
        </TimeBox>
        {renderVerticalLine()}
        {isToday ? (
          <ActionButtonsBox>
            <Typography sx={{ fontWeight: 'bold' }}>
              {formatElapsedTime(elapsedTime)}{' '}
              {isPaused && <span>(Paused)</span>}
            </Typography>
            {isRunning ? (
              <ButtonField
                label="Stop"
                onClick={onHandleStopTimer}
                backgroundColor={Colors.red}
              />
            ) : (
              <ButtonField
                label="Start"
                onClick={onHandlePlayTimer}
                backgroundColor={Colors.applicationColor}
                disabled={selectedOptions.length === 0}
              />
            )}
          </ActionButtonsBox>
        ) : (
          <ActionButtonsBox>
            <Typography sx={{ fontWeight: 'bold' }}>
              Time: {formatElapsedTime(activity?.duration)}
            </Typography>
          </ActionButtonsBox>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <VerticalMenu menuItems={menuItems} />
        </Box>
      </>
    );

    return isSmallScreen ? (
      <Box
        sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4 }}
      >
        {timeContainerContent}
      </Box>
    ) : (
      timeContainerContent
    );
  };

  return (
    <>
      <TrackerContainer key={activity.id}>
        <TimeTrackerbox>
          <TimeTrackerInputBox>
            <Box sx={{ width: '98%' }}>
              <InputField
                value={activityText}
                onChange={(e: any) => setActivityText(e.target.value)}
                name="activityText"
                placeholder={t('EnterActivityDescription')}
                disabled={isToday ? false : true}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TimeTrackerSelectionBox
                onClick={isToday ? handleModalOpen : () => {}}
              >
                <TimeTrackerAddIcon>
                  <IoAddCircle fontSize="14" color="black" />
                </TimeTrackerAddIcon>
                <FaStar
                  fontSize="10"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    color: 'red',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    padding: '2px',
                  }}
                />
              </TimeTrackerSelectionBox>
              <TimeTrackerAddIconLabel
                onClick={isToday ? handleModalOpen : () => {}}
              >
                Project
              </TimeTrackerAddIconLabel>
            </Box>
          </TimeTrackerInputBox>
          {renderVerticalLine()}
          {renderTimeContainer()}
        </TimeTrackerbox>
        <SelectionTypography>
          {selectedOptions &&
            selectedOptions.length > 0 &&
            selectedOptions.join('> ')}
        </SelectionTypography>
      </TrackerContainer>

      <MultiLevelSelector
        data={data}
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
        setPaths={setExpandedPaths}
        setOptions={setSelectedOptions}
        levelNameArray={levelNameArray}
        searchKeywords={['Customer', 'context']}
      />
    </>
  );
};
export default TrackerBox;
