import { Box, Typography } from '@mui/material';
import {
  GroupByHeaderContainer,
  GroupByInnerContainer,
  GroupBySectionContainer,
} from '../styles';
import { GenericStyle } from '../../../../../Utilities/GenericStyle';
import { detailedTableColumns, groupByKey } from '../../../menuFile';
import { useSelector } from 'react-redux';
import { getFilteredActivities } from '../../../../../Store/Selectors/ActivityTrackerSelector';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import {
  breakWords,
  formatElapsedTime,
} from '../../../../../Utilities/commonFunctions';
import { Table } from '../../../../../Components';
import { getSelectedActivity } from '../../../../../Store/Selectors/ReportSelector';
import { FaDollarSign, FaLock } from 'react-icons/fa';
import { format, parseISO, addSeconds } from 'date-fns';

const GroupByDetailed = () => {
  const filterData = useSelector(getFilteredActivities);
  const activitySummaySelection = useSelector(getSelectedActivity);

  const GroupData = useMemo(() => {
    return activitySummaySelection.context
      ? groupByKey(filterData, 'context').filter(
          (item: any) => item.key === activitySummaySelection.context
        )
      : groupByKey(filterData, 'context');
  }, [filterData, activitySummaySelection]);

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

  const timeRowComponent = (row: any) => {
    const startDate = parseISO(row.utcDate);

    const endDate = addSeconds(startDate, row.duration);

    const formattedDate = format(startDate, 'dd,MMM yyyy');
    const formattedStartTime = format(startDate, 'HH:mm:ss');
    const formattedEndTime = format(endDate, 'HH:mm:ss');

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={GenericStyle.font12Medium}>{formattedDate}</Typography>
        <Typography sx={GenericStyle.font12Medium}>
          {formattedStartTime} - {formattedEndTime}
        </Typography>
      </Box>
    );
  };

  const tableRows = useMemo(() => {
    return GroupData.flatMap((item: any) => {
      if (item && item.subItems && item.subItems.length > 0) {
        return item.subItems.map((subItem: any) => {
          return {
            header: breakWords(subItem.context),
            user: 'Sara Khurshid', // need to update with original data
            currency: <FaDollarSign />,
            time: timeRowComponent(subItem),
            duration: formatElapsedTime(subItem.duration),
            active: <FaLock />,
          };
        });
      }

      return [];
    });
  }, [GroupData]);

  return (
    <GroupBySectionContainer>
      <GroupByHeaderContainer>
        <Typography sx={GenericStyle.font12Medium}>
          {t('TotalTime')}:
        </Typography>
        <Typography sx={GenericStyle.font16Medium}>
          {formatElapsedTime(TotalTime)}
        </Typography>
      </GroupByHeaderContainer>
      <GroupByInnerContainer>
        <Table
          data={tableRows}
          columns={detailedTableColumns}
          noRowsPerPage={5}
          filterKey={'header'}
          rowStyle={{
            backgroundColor: 'white',
            color: 'red',
            cursor: 'pointer',
          }}
          stickyHeader
        />
      </GroupByInnerContainer>
    </GroupBySectionContainer>
  );
};

export default GroupByDetailed;
