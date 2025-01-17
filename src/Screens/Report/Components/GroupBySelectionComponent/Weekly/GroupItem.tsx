import {
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  breakWords,
  formatElapsedTime,
  generateColor,
} from '../../../../../Utilities/commonFunctions';
import WeeklyDuration from './WeeklyDuration';
import { groupByKey, weekTimeCalulatesArray } from '../../../menuFile';
import {
  AccordionDetailsContainer,
  AccordionMainContainer,
  NumberBox,
  WeeklyItemSmallContainer,
  WeeklyItemContainer,
  WeeklyItemTotalContainer,
  WeeklyBoxSmallContainer,
} from '../styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getFilteredActivities } from '../../../../../Store/Selectors/ActivityTrackerSelector';
import { useTranslation } from 'react-i18next';

interface GroupItemProps {
  toShow: string;
  groupData: any;
  selectedDate: [Date | undefined, Date | undefined];
}

const GroupItem = ({ toShow, groupData, selectedDate }: GroupItemProps) => {
  const filterData = useSelector(getFilteredActivities);
  const { t } = useTranslation();

  const screenSize = useMediaQuery('(min-width: 1365px)');

  const weekTotalFilterArray = useMemo(() => {
    return weekTimeCalulatesArray(
      selectedDate[0] ? selectedDate[0] : new Date(),
      filterData || [],
      true
    );
  }, [screenSize, filterData]);

  const renderContent = (data: any) => {
    let totalTime: string = '0';
    let title: string = '';
    let weekArray: any[] = [];
    let totalNumber: number = 0;
    let color = generateColor();

    if (data?.subItems?.length > 0) {
      title = breakWords(data?.key);
      totalTime = formatElapsedTime(
        data?.subItems?.reduce((a: any, b: any) => a + b.duration, 0)
      );
      totalNumber = data?.subItems?.length;
      weekArray = weekTimeCalulatesArray(
        selectedDate[0] ? selectedDate[0] : new Date(),
        data?.subItems
      );
      color = generateColor(title + title.slice(0, 2));
    } else {
      title = breakWords(data[toShow]);
      totalTime = formatElapsedTime(data?.duration);
      totalNumber = 1;
      weekArray = weekTimeCalulatesArray(
        selectedDate[0] ? selectedDate[0] : new Date(),
        [data]
      );
      color = generateColor(title + title.slice(0, 2));
    }

    return (
      <WeeklyItemContainer>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <NumberBox selectedColor={color}>{totalNumber}</NumberBox>
          <Typography>{title}</Typography>
        </Box>
        <Box>
          {screenSize ? (
            <WeeklyDuration weekArrayItem={weekArray} />
          ) : (
            <Typography>{totalTime}</Typography>
          )}
        </Box>
      </WeeklyItemContainer>
    );
  };

  const renderSmallScreenContent = (data: any, toShowText: string) => {
    const datagroup = groupByKey(data, toShowText);

    return (
      <>
        {datagroup.map((item: any) => {
          const weekSmallArray = weekTimeCalulatesArray(
            selectedDate[0] ? selectedDate[0] : new Date(),
            item?.subItems || [],
            true
          );

          return (
            <AccordionDetailsContainer>
              <WeeklyItemContainer>
                <Box
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <Typography>{breakWords(item.key)}</Typography>
                </Box>
                <Box>
                  <Typography>{weekSmallArray[7]?.day}</Typography>
                </Box>
              </WeeklyItemContainer>

              <WeeklyBoxSmallContainer>
                {weekSmallArray
                  .slice(0, 7)
                  .map((singleItem: any, index: number) => (
                    <WeeklyItemSmallContainer
                      key={`${index}-${singleItem?.day}${index}`}
                    >
                      <Typography>{singleItem?.date}</Typography>
                      <Typography>{singleItem.day}</Typography>
                    </WeeklyItemSmallContainer>
                  ))}
              </WeeklyBoxSmallContainer>
            </AccordionDetailsContainer>
          );
        })}
      </>
    );
  };

  return (
    <>
      {groupData.map((data: any) => {
        return (
          <AccordionMainContainer>
            <AccordionSummary>{renderContent(data)}</AccordionSummary>

            {screenSize ? (
              data?.subItems?.map((child: any) => (
                <AccordionDetailsContainer>
                  {renderContent(child)}
                </AccordionDetailsContainer>
              ))
            ) : (
              <>{renderSmallScreenContent(data.subItems, 'mainCategory')}</>
            )}
          </AccordionMainContainer>
        );
      })}

      {screenSize ? (
        <WeeklyItemTotalContainer>
          <Typography>Total</Typography>
          <WeeklyDuration
            weekArrayItem={weekTimeCalulatesArray(
              selectedDate[0] ? selectedDate[0] : new Date(),
              filterData
            )}
          />
        </WeeklyItemTotalContainer>
      ) : (
        <AccordionMainContainer>
          <AccordionSummary>
            <WeeklyItemContainer>
              <Typography>{t('TotalTime')}</Typography>
              <Typography>{weekTotalFilterArray[7]?.day}</Typography>
            </WeeklyItemContainer>
          </AccordionSummary>

          <AccordionDetailsContainer>
            <WeeklyBoxSmallContainer>
              {weekTotalFilterArray
                .slice(0, 7)
                .map((item: any, index: number) => (
                  <WeeklyItemSmallContainer
                    key={`${index}-${item?.day}${index}`}
                  >
                    <Typography>{item?.date}</Typography>
                    <Typography>{item.day}</Typography>
                  </WeeklyItemSmallContainer>
                ))}
            </WeeklyBoxSmallContainer>
          </AccordionDetailsContainer>
        </AccordionMainContainer>
      )}
    </>
  );
};

export default GroupItem;
