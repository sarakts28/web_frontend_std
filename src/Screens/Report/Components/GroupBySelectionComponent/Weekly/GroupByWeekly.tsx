import { Typography, useMediaQuery } from '@mui/material';
import {
  GroupByHeaderContainer,
  GroupByInnerContainer,
  GroupBySectionContainer,
  GroupByTimeHeader,
} from '../styles';
import { GenericStyle } from '../../../../../Utilities/GenericStyle';
import { groupByKey, weekArray } from '../../../menuFile';
import GroupItem from './GroupItem';
import { useSelector } from 'react-redux';
import { getFilteredActivities } from '../../../../../Store/Selectors/ActivityTrackerSelector';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatElapsedTime,
  generateRandomId,
} from '../../../../../Utilities/commonFunctions';
import WeeklyDuration from './WeeklyDuration';
import { EmptyComponent } from '../../../../../Components';

interface GroupByWeeklyProps {
  calendarSelection: number;
  selectedDate: [Date | undefined, Date | undefined];
}

const GroupByWeekly = ({ selectedDate }: GroupByWeeklyProps) => {
  const filterData = useSelector(getFilteredActivities);

  const GroupData = groupByKey(filterData, 'context');
  const screenSize = useMediaQuery('(min-width: 1365px)');

  const { t } = useTranslation();

  const TotalTime = useMemo(() => {
    let time: number = 0;
    GroupData.map((item: any) => {
      if (item && item?.subItems?.length > 0)
        item.subItems.map((subItem: any) => {
          time = time + subItem.duration;
        });
    });

    return time;
  }, [GroupData]);

  return (
    <>
      <GroupBySectionContainer>
        <GroupByHeaderContainer>
          <Typography sx={GenericStyle.font16Medium}>
            {t('TotalTime')}: {formatElapsedTime(TotalTime)}
          </Typography>
        </GroupByHeaderContainer>

        <GroupByInnerContainer>
          <GroupByTimeHeader>
            <Typography sx={GenericStyle.font12Medium}>
              {t('Context')}
            </Typography>
            {screenSize ? (
              <WeeklyDuration
                weekArrayItem={weekArray(
                  selectedDate[0] ? selectedDate[0] : new Date()
                )}
              />
            ) : (
              <Typography sx={GenericStyle.font12Medium}>
                {t('TotalTime')}
              </Typography>
            )}
          </GroupByTimeHeader>

          {GroupData.length === 0 && <EmptyComponent text={t('noDataFound')} />}
          <GroupItem
            key={generateRandomId(3)}
            toShow={'mainCategory'}
            groupData={GroupData}
            selectedDate={selectedDate}
          />
        </GroupByInnerContainer>
      </GroupBySectionContainer>
    </>
  );
};

export default GroupByWeekly;
