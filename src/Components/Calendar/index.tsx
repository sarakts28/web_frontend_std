import React, { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import { CalendarContainer } from './style';

interface CustomDateRangePickerProps {
  range?: boolean;
  noOfMonths?: number;
  minDate?: Date;
  inline?: boolean;
  showDisabledMonthNavigation?: boolean;
  selectedDateRange?: any;
  setSelectedDateRange?: any;
  selectedCalendarItem?: number;
}

const CustomDatePicker = ({
  range = false,
  noOfMonths = 2,
  minDate,
  inline = false,
  showDisabledMonthNavigation = false,
  selectedDateRange,
  setSelectedDateRange,
  selectedCalendarItem,
}: CustomDateRangePickerProps) => {
  const [dateRange, setDateRange] = useState(
    selectedDateRange || [undefined, undefined]
  );
  const [startDate, endDate] = useMemo(() => {
    return [dateRange[0], dateRange[1]];
  }, [dateRange]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderCustomHeader = ({ monthDate, decreaseMonth, increaseMonth }) => {
    return (
      <div>
        <button
          aria-label="Previous Month"
          className={
            'react-datepicker__navigation react-datepicker__navigation--previous'
          }
          onClick={decreaseMonth}
        >
          <span
            className={
              'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
            }
          >
            {'<'}
          </span>
        </button>
        <span className="react-datepicker__current-month">
          {monthDate.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          aria-label="Next Month"
          className={
            'react-datepicker__navigation react-datepicker__navigation--next'
          }
          onClick={increaseMonth}
        >
          <span
            className={
              'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
            }
          >
            {'>'}
          </span>
        </button>
      </div>
    );
  };

  // Update dateRange whenever selectedDate changes (non-range mode)
  useEffect(() => {
    if (!range && selectedDate) {
      setDateRange([selectedDate, selectedDate]);
    }
  }, [selectedDate, range]);

  // Update the parent component whenever dateRange changes
  useEffect(() => {
    if (setSelectedDateRange) {
      setSelectedDateRange(dateRange);
    }
  }, [dateRange, setSelectedDateRange]);

  // Reset date range when selectedCalendarItem changes
  useEffect(() => {
    if (selectedCalendarItem) {
      setDateRange(selectedDateRange || [undefined, undefined]);
      if (!range && selectedDateRange && selectedDateRange[0]) {
        setSelectedDate(selectedDateRange[0]);
      }
    }
  }, [selectedCalendarItem, selectedDateRange, range]);

  return (
    <CalendarContainer>
      {range ? (
        <DatePicker
          renderCustomHeader={renderCustomHeader}
          onChange={(update: any) => {
            setDateRange(update);
          }}
          startDate={startDate}
          endDate={endDate}
          monthsShown={endDate ? noOfMonths : 1}
          selectsRange
          minDate={minDate}
          inline={inline}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
        />
      ) : (
        <DatePicker
          renderCustomHeader={renderCustomHeader}
          selected={selectedDate}
          onChange={(update: any) => {
            setSelectedDate(update);
          }}
          monthsShown={endDate ? noOfMonths : 1}
          minDate={minDate}
          inline={inline}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
        />
      )}
    </CalendarContainer>
  );
};

export default CustomDatePicker;
