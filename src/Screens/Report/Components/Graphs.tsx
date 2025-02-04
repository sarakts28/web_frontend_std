import React, { useMemo, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { getFilteredActivities } from '../../../Store/Selectors/ActivityTrackerSelector';
import { groupByKey } from '../menuFile';
import {
  generateColorWithAlpha,
  getValueFromLocalStorage,
} from '../../../Utilities/commonFunctions';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graphs: React.FC = () => {
  const filterData = useSelector(getFilteredActivities);
  const [groupBy, setGroupBy] = useState('context');

  useEffect(() => {
    const handleStorageChange = () => {
      const value = getValueFromLocalStorage('groupBy', 'context');

      if (value) {
        setGroupBy(value);
      }
    };

    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [setGroupBy]);

  const GroupData = useMemo(
    () => groupByKey(filterData, groupBy),
    [filterData, groupBy]
  );

  const data = useMemo(() => {
    const valuesOfKey = GroupData.map((item: any) => {
      return item?.subItems?.reduce((a: any, b: any) => a + b.duration, 0);
    });
    const labels = GroupData.map((item: any) => item.key);
    const colorBox = GroupData.map((item: any) => {
      const backgroundColor = generateColorWithAlpha(item.key, 0.2);
      const borderColor = generateColorWithAlpha(item.key, 1);

      return { backgroundColor, borderColor };
    });

    return {
      labels: labels,
      datasets: [
        {
          label: 'Total time in seconds',
          data: valuesOfKey,
          backgroundColor: colorBox.map((item: any) => item.backgroundColor),
          borderColor: colorBox.map((item: any) => item.borderColor),
          borderWidth: 1,
        },
      ],
    };
  }, [GroupData]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box height="50vh">
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default Graphs;
