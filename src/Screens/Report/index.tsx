import { useEffect, useState, useCallback } from 'react';
import { MainContainer, SelectionCalendarBar } from './style';
import { GroupSectionMenu, selectionMenu } from './menuFile';
import { FilterBar, SelectionBar, CalendarSelection } from './Components';
import { useThunkDispatch } from '../../Hooks/useThunkDispatch';
import { getActivityTrackerList } from '../../Store/Thunk/ActivityTrackerThunk';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../Utilities/commonFunctions';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../Store/Reducer/ReportSlice';
import Graphs from './Components/Graphs';
import { GraphContainer } from './Components/style';

const Report = () => {
  const [selectionButton, setSelectionButton] = useState<number>(1);
  const [selectionBarDropDown, setSelectionBarDropDown] = useState<number>(1);
  const [calendarSelection, setCalendarSelection] = useState<number>(4);
  const [selectedDate, setSelectedDate] = useState<
    [Date | undefined, Date | undefined]
  >([undefined, undefined]);
  const [filterBarSelection, setFilterBarSelection] = useState<any>(null);

  const { t } = useTranslation();
  const buttonMenu = selectionMenu(selectionBarDropDown, t);

  const thunkDispatch = useThunkDispatch();
  const dispatch = useDispatch();

  const onClickFilter = useCallback(() => {
    const payload: Array<{ key: string; value: string }> = filterBarSelection
      ? [...filterBarSelection]
      : [];

    if (selectedDate[0]) {
      payload.push({ key: 'StartDate', value: formatDate(selectedDate[0]) });
    }

    if (selectedDate[1]) {
      payload.push({ key: 'EndDate', value: formatDate(selectedDate[1]) });
    }

    thunkDispatch(
      getActivityTrackerList({
        filter: payload,
      })
    );
  }, [filterBarSelection, selectedDate, thunkDispatch]);

  useEffect(() => {
    onClickFilter();
  }, []);

  useEffect(() => {
    if (
      (selectedDate[0] !== undefined && selectedDate[1] !== undefined) ||
      (Array.isArray(filterBarSelection) && filterBarSelection.length > 0)
    ) {
      onClickFilter();
    }

    dispatch(
      setFilter([
        'customer',
        'context',
        'mainCategory',
        'subTask',
        'detailedSubTask',
      ])
    );
  }, [selectedDate, filterBarSelection, onClickFilter]);

  return (
    <MainContainer>
      <SelectionCalendarBar>
        <SelectionBar
          menu={buttonMenu}
          setSelectedButton={setSelectionButton}
          selectedButton={selectionButton}
          setSelectionBarDropDown={setSelectionBarDropDown}
          selectionBarDropDown={selectionBarDropDown}
        />
        {selectionButton !== 4 && (
          <CalendarSelection
            setSelectedDate={setSelectedDate}
            type={selectionBarDropDown}
            menuType={selectionButton}
            setCalendarSelection={setCalendarSelection}
          />
        )}
      </SelectionCalendarBar>

      <FilterBar setFilterBarSelection={setFilterBarSelection} />

      {GroupSectionMenu().map(({ type, menuType, component: Component }) => {
        if (type === selectionBarDropDown && menuType === selectionButton) {
          return (
            <Component
              key={menuType}
              calendarSelection={calendarSelection}
              selectedDate={selectedDate}
              setSelectionButton={setSelectionButton}
            />
          );
        }

        return null;
      })}
      {selectionButton === 1 && (
        <GraphContainer>
          <Graphs />
        </GraphContainer>
      )}
    </MainContainer>
  );
};

export default Report;
