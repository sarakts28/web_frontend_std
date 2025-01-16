import { format, startOfWeek, parseISO, endOfWeek, addDays } from 'date-fns';
import { GroupByDetailed, GroupBySummary, GroupByWeekly } from './Components';
import { formatElapsedTime } from '../../Utilities/commonFunctions';
import { ColumnConfig } from '../../Components/Table';

export const selectionMenu = (type: number, t: any) => {
  if (type === 1)
    return [
      { label: t('summary'), key: 1 },
      { label: t('detail'), key: 2 },
      { label: t('weekly'), key: 3 },
      { label: t('shared'), key: 4 },
    ];
  else if (type === 2) return [{ label: t('assignment'), key: 1 }];
  else return [{ label: t('detail'), key: 1 }];
};

export const SelectionFilterMenu = (t: any) => {
  return [
    {
      label: t('timeReport'),
      value: 'timeReport',
      id: 1,
    },

    {
      label: t('teamReport'),
      value: 'teamReport',
      id: 2,
    },
    {
      label: t('expenseReport'),
      value: 'expenseReport',
      id: 3,
    },
  ];
};

export const CalendarMenu = (t: any, type: number, selectedMenu: number) => {
  if (type === 1 && selectedMenu === 3)
    return [
      {
        label: t('thisWeek'),
        value: 'thisWeek',
        id: 3,
      },
      {
        label: t('lastWeek'),
        value: 'lastWeek',
        id: 4,
      },
    ];
  else
    return [
      {
        label: t('today'),
        value: 'today',
        id: 1,
      },
      {
        label: t('yesterday'),
        value: 'yesterday',
        id: 2,
      },
      {
        label: t('thisWeek'),
        value: 'thisWeek',
        id: 3,
      },
      {
        label: t('lastWeek'),
        value: 'lastWeek',
        id: 4,
      },
      {
        label: t('past2Week'),
        value: 'past2Week',
        id: 5,
      },
      {
        label: t('thisMonth'),
        value: 'thisMonth',
        id: 6,
      },
      {
        label: t('lastMonth'),
        value: 'lastMonth',
        id: 7,
      },
      {
        label: t('thisYear'),
        value: 'thisYear',
        id: 8,
      },
      {
        label: t('lastYear'),
        value: 'lastYear',
        id: 9,
      },
    ];
};

export const filterMainDropDownOptions = (
  client: any,
  context: any,
  mainCategory: any,
  t: any
) => {
  return [
    {
      label: t('Customer'),
      value: 'customer',
      id: 1,
      data: client,
    },
    {
      label: t('Context'),
      value: 'context',
      id: 2,
      data: context,
    },
    {
      label: t('MainCategory'),
      value: 'mainCategory',
      id: 3,
      data: mainCategory,
    },
    {
      label: t('SubTask'),
      value: 'subTask',
      id: 4,
    },
    {
      label: t('DetailSubTask'),
      value: 'detailedSubTask',
      id: 5,
    },
  ];
};

export const groupByOptions = [
  {
    label: 'Context',
    value: 'context',
    id: 2,
  },
  {
    label: 'Main Category',
    value: 'mainCategory',
    id: 3,
  },
  { label: 'Date', value: 'date', id: 4 },
  { label: 'Week', value: 'week', id: 5 },
];

export const groupByOptionsToShow = [
  {
    label: 'Context',
    value: 'context',
    id: 2,
  },
  {
    label: 'Main Category',
    value: 'mainCategory',
    id: 3,
  },
  { label: 'Sub Task', value: 'subTask', id: 4 },
  { label: 'Description', value: 'description', id: 5 },
];

export const groupByKey = (dataArray: any[], groupBy: string) => {
  const grouped = dataArray.reduce((grouped, item) => {
    let key = '';

    if (groupBy === 'date') {
      key = format(parseISO(item.utcDate), 'yyyy-MM-dd');
    } else if (groupBy === 'week') {
      const start = startOfWeek(parseISO(item.utcDate), { weekStartsOn: 1 });
      const end = endOfWeek(parseISO(item.utcDate), { weekStartsOn: 1 });
      const dateKey = `${format(start, 'yyyy-MM-dd')} - ${format(end, 'yyyy-MM-dd')}`;
      key = dateKey;
    } else {
      key = item[groupBy];
    }

    if (!grouped[key]) {
      grouped[key] = {
        key,
        subItems: [],
      };
    }
    grouped[key].subItems.push(item);

    return grouped;
  }, {});

  // Convert the grouped object into an array of objects
  return Object.values(grouped);
};

// return week array
export const weekArray = (startDate: Date) => {
  let weekStart: Date;

  if (startDate) {
    weekStart = startOfWeek(startDate, { weekStartsOn: 1 });
  } else {
    return [];
  }

  const week = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    day: `${format(addDays(weekStart, index), 'EEE')}, ${format(
      addDays(weekStart, index),
      'MMM dd'
    )}`,
  }));

  week.push({
    id: 8,
    day: 'Total',
  });

  return week;
};
// return week array with duration of each day
export const weekTimeCalulatesArray = (
  startDate: Date,
  dataObjec: any[],
  withDate?: boolean
) => {
  let weekStart: Date;
  let totalWeekTime = 0;

  if (startDate) {
    weekStart = startOfWeek(startDate, { weekStartsOn: 1 });
  } else {
    return [];
  }

  const week = Array.from({ length: 7 }, (_, index) => {
    const day = format(addDays(weekStart, index), 'MMM dd');
    const date = `${format(addDays(weekStart, index), 'EEE')}, ${format(
      addDays(weekStart, index),
      'MMM dd'
    )}`;

    return {
      id: index + 1,
      day,
      ...(withDate && { date }),
    };
  });

  week.forEach((item: any) => {
    let totalTime = 0;
    dataObjec?.forEach((item2: any) => {
      if (item.day === format(parseISO(item2.utcDate), 'MMM dd')) {
        totalTime += item2.duration;
      }
    });

    item.day = totalTime === 0 ? '-' : formatElapsedTime(totalTime);
    totalWeekTime += totalTime;
  });
  week.push({
    id: 8,
    day: formatElapsedTime(totalWeekTime),
    date: 'Total',
  });

  return week;
};

export const GroupSectionMenu = () => {
  return [
    { type: 1, menuType: 1, component: GroupBySummary },
    {
      type: 1,
      menuType: 2,
      component: GroupByDetailed,
    },
    {
      type: 1,
      menuType: 3,
      component: GroupByWeekly,
    },
  ];
};

// Column configuration for detail page

export const detailedTableColumns: ColumnConfig[] = [
  {
    id: 'header',
    label: 'Context',
    align: 'left',

    style: {
      backgroundColor: 'white',
      color: 'black',
      width: '45%',
      maxWidth: '45%',
    },
  },
  {
    id: 'user',
    label: 'User',
    align: 'left',

    style: {
      backgroundColor: 'white',
      color: 'black',
      width: '20%',
      maxWidth: '20%',
    },
  },
  {
    id: 'currency',
    align: 'left',

    style: {
      backgroundColor: 'white',
      color: 'black',
      width: '5%',
      maxWidth: '5%',
    },
  },
  {
    id: 'time',
    label: 'Time',
    align: 'left',
    style: {
      backgroundColor: 'white',
      color: 'black',
      width: '20%',
      maxWidth: '20%',
    },
  },
  {
    id: 'duration',
    label: 'Duration',
    align: 'left',

    style: {
      backgroundColor: 'white',
      color: 'black',
      width: '5%',
      maxWidth: '5%',
    },
  },
  {
    id: 'active',
    align: 'left',

    style: {
      backgroundColor: 'white',
      color: 'black',
      width: '5%',
      maxWidth: '5%',
    },
  },
];
