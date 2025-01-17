import { IoCalendarNumber } from 'react-icons/io5';
import {
  CalendarInputContainer,
  ArrowBox,
  InputContainer,
  CalendarPaper,
  CalendarSelectionBarStyle,
  CalendarItem,
} from './style';
import { Box, Typography } from '@mui/material';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { CustomDatePicker } from '../../../Components';
import {
  startOfWeek,
  endOfWeek,
  subDays,
  startOfYear,
  endOfYear,
  subWeeks,
  subYears,
  startOfMonth,
  endOfMonth,
  subMonths,
  differenceInDays,
} from 'date-fns';

import { useRef } from 'react';
import { CalendarMenu } from '../menuFile';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../Components/Toast';

interface CalendarSelectionProps {
  setSelectedDate: (date: any) => void;
  type: number;
  menuType: number;
  setCalendarSelection: (value: number) => void;
}

const CalendarSelection = ({
  setSelectedDate,
  type,
  menuType,
  setCalendarSelection,
}: CalendarSelectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [openCalendarPaper, setOpenCalendarPaper] = useState(false);
  const [selectedCalendarItem, setSelectedCalendarItem] = useState(4);
  const [selectedDateRange, setSelectedDateRange] = useState<
    any | [undefined, undefined]
  >([
    startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
  ]);

  const { showToast } = useToast();

  const { t } = useTranslation();
  const isSmallScreen = window.innerWidth < 800;

  const formatDate = (date: Date | undefined): string =>
    date ? date.toLocaleDateString('en-GB') : '-';

  const toggleCalendar = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 10,
        left: isSmallScreen ? rect.left : rect.left - 250,
      });
    }

    setOpenCalendarPaper(!openCalendarPaper);
  };

  const handleCalendarItem = (item: any) => {
    setSelectedCalendarItem(item.id);
    setCalendarSelection(item.id);

    const today = new Date();

    switch (item.id) {
      case 1:
        setSelectedDateRange([today, undefined]);
        break;

      case 2:
        setSelectedDateRange([subDays(today, 1), undefined]);
        break;

      case 3:
        setSelectedDateRange([
          startOfWeek(today, { weekStartsOn: 1 }), // Start from Monday
          endOfWeek(today, { weekStartsOn: 1 }), // End on Sunday
        ]);
        break;

      case 4:
        setSelectedDateRange([
          startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
          endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
        ]);
        break;

      case 5:
        setSelectedDateRange([
          startOfWeek(subWeeks(today, 2), { weekStartsOn: 1 }),
          endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
        ]);
        break;

      case 6:
        setSelectedDateRange([startOfMonth(today), endOfMonth(today)]);
        break;

      case 7:
        setSelectedDateRange([
          startOfMonth(subMonths(today, 1)),
          endOfMonth(subMonths(today, 1)),
        ]);
        break;

      case 8:
        setSelectedDateRange([startOfYear(today), endOfYear(today)]);
        break;

      case 9:
        setSelectedDateRange([
          startOfYear(subYears(today, 1)),
          endOfYear(subYears(today, 1)),
        ]);
        break;

      default:
        setSelectedDateRange([undefined, undefined]);
    }
  };

  useEffect(() => {
    if (
      (selectedDateRange[0] !== undefined ||
        selectedDateRange[1] !== undefined) &&
      openCalendarPaper === false
    ) {
      setSelectedDate(selectedDateRange);
    }
  }, [selectedDateRange, openCalendarPaper]);

  // this useEffect is to set the calendarSelection based on the selectedDateRange when menu type is 3 or weekly
  useEffect(() => {
    if (
      menuType === 3 &&
      type === 1 &&
      selectedDateRange[0] !== undefined &&
      selectedDateRange[1] !== undefined
    ) {
      const start = startOfWeek(selectedDateRange[0], { weekStartsOn: 1 });
      const end = endOfWeek(start, { weekStartsOn: 1 });

      const daysDifference = differenceInDays(
        selectedDateRange[1],
        selectedDateRange[0]
      );

      const thisWeekStart = startOfWeek(new Date(), {
        weekStartsOn: 1,
      }).getTime();
      const previousWeekStart = startOfWeek(subWeeks(new Date(), 1), {
        weekStartsOn: 1,
      }).getTime();

      const startTime = start.getTime();

      if (startTime === thisWeekStart) {
        setCalendarSelection(3);
        setSelectedCalendarItem(3);
      } else if (startTime === previousWeekStart) {
        setCalendarSelection(4);
        setSelectedCalendarItem(4);
      } else {
        setCalendarSelection(0);
        setSelectedCalendarItem(0);
      }

      if (daysDifference > 6) {
        showToast('error', 'Invalid range. Adjusting to the correct week.');
        setSelectedDateRange([start, end]);
      } else {
        setSelectedDate([selectedDateRange[0], selectedDateRange[1]]);
      }
    }
  }, [selectedDateRange, menuType, type]);

  const CalendarSelectionBar = () => {
    return (
      <CalendarSelectionBarStyle>
        {CalendarMenu(t, type, menuType).map((calendarItem: any) => {
          return (
            <CalendarItem
              isActive={calendarItem.id === selectedCalendarItem}
              onClick={() => handleCalendarItem(calendarItem)}
            >
              {calendarItem.label}
            </CalendarItem>
          );
        })}
      </CalendarSelectionBarStyle>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex' }} ref={containerRef}>
        <CalendarInputContainer onClick={toggleCalendar}>
          <InputContainer>
            <IoCalendarNumber />
            <Typography>
              {`${formatDate(selectedDateRange[0])} - ${formatDate(selectedDateRange[1])}`}
            </Typography>
          </InputContainer>
          <ArrowBox sx={{ borderRight: 'none' }}>
            <MdKeyboardArrowLeft fontSize={25} />
          </ArrowBox>
          <ArrowBox>
            <MdKeyboardArrowRight fontSize={25} />
          </ArrowBox>
        </CalendarInputContainer>
      </Box>

      {openCalendarPaper && (
        <CalendarPaper top={position.top} left={position.left}>
          {CalendarSelectionBar()}
          <CustomDatePicker
            inline={true}
            range
            selectedCalendarItem={selectedCalendarItem}
            showDisabledMonthNavigation={true}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
          />
        </CalendarPaper>
      )}
    </>
  );
};

export default CalendarSelection;
