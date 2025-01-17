import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import {
  formatElapsedTime,
  generateRandomId,
} from '../../Utilities/commonFunctions';
import TrackerBox from './TrackerBox';
import {
  ActivitListContainer,
  AddMoreContainer,
  TodayTimeContainer,
  SelectionTypography,
} from './style';
import { useActivityTimers } from '../../Hooks/useActivityTimer';
import { useSelector } from 'react-redux';
import { getUserData } from '../../Store/Selectors/AuthSelector';
import { MdAddCircle } from 'react-icons/md';
import { GenericStyle } from '../../Utilities/GenericStyle';
import { Activity } from '../../Store/Types/ActivityTrackerType';
import { useTranslation } from 'react-i18next';

const TimeTracker = () => {
  const { activitiesDayArray, addActivityTimer } = useActivityTimers();

  const currentUserData = useSelector(getUserData);

  const { t } = useTranslation();

  const handleActivList = () => {
    addActivityTimer({
      id: generateRandomId(5),
      customerId: '',
      userId: currentUserData?.userId,
      mainCategory: '',
      subTask: '',
      detailedSubTask: '',
      description: '',
      context: '',
      localDate: new Date().toISOString(),
      utcDate: new Date().toISOString(),
      duration: 0,
    });
  };

  const renderDayConatiner = (activities: Activity[], isToday: boolean) => {
    return (
      <Box key={generateRandomId(5)} id={generateRandomId(5)}>
        <ActivitListContainer>
          {activities && activities.length > 0 ? (
            activities.map((item: any) => {
              return (
                <TrackerBox
                  activity={item}
                  key={item.value}
                  isToday={isToday}
                />
              );
            })
          ) : (
            <>
              <SelectionTypography>Add some activities</SelectionTypography>
            </>
          )}
        </ActivitListContainer>

        {isToday && (
          <AddMoreContainer onClick={handleActivList}>
            <MdAddCircle size={24} />
            <Typography sx={GenericStyle.font14Bold}>{t('AddMore')}</Typography>
          </AddMoreContainer>
        )}
      </Box>
    );
  };

  const totalTime = useCallback((activities: Activity[]) => {
    let total = 0;
    activities.forEach((item: Activity) => {
      total += item.duration;
    });
    return formatElapsedTime(total);
  }, []);

  return (
    <>
      <Box sx={{ marginTop: '15px', overflow: 'auto', maxHeight: '90vh' }}>
        <Box>
          {activitiesDayArray.map((dayActivity, index) => {
            const { date, day, activities } = dayActivity;

            if (activities.length === 0) {
              if (index === 0) {
                return (
                  <Box key={date} sx={{ marginTop: 3 }}>
                    <TodayTimeContainer>
                      <Typography sx={GenericStyle.font16Bold}>
                        {day}{' '}
                        <span style={GenericStyle.font14Regular}>({date})</span>
                      </Typography>
                      <Typography sx={GenericStyle.font14Bold}>
                        {t('TotalTime')}: {totalTime(activities)}
                      </Typography>
                    </TodayTimeContainer>
                    {renderDayConatiner(activities, day === 'Today')}
                  </Box>
                );
              }
              return null;
            }

            return (
              <Box key={date} sx={{ marginTop: 3 }}>
                <TodayTimeContainer>
                  <Typography sx={GenericStyle.font16Bold}>
                    {day}{' '}
                    <span style={GenericStyle.font14Regular}>({date})</span>
                  </Typography>
                  <Typography sx={GenericStyle.font14Bold}>
                    {t('TotalTime')}: {totalTime(activities)}
                  </Typography>
                </TodayTimeContainer>
                {renderDayConatiner(activities, day === 'Today')}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default TimeTracker;
