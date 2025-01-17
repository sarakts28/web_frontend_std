import { useCallback, useEffect, useMemo, useState } from 'react';
import { filterMainDropDownOptions } from '../menuFile';
import {
  BadgeContainer,
  ClearFilterBox,
  FilterBarContainer,
  FiltersSelectionContainer,
  FilterApplyButtonWrapper,
} from './style';
import {
  ButtonField,
  VerticalLines,
  DropDownSelect,
} from '../../../Components';
import useData from '../../TimeTracker/data';
import { Box } from '@mui/material';
import { capitalizeFirstWord } from '../../../Utilities/commonFunctions';
import { useTranslation } from 'react-i18next';
import {
  getFilters,
  getSelectedActivity,
} from '../../../Store/Selectors/ReportSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilter,
  setMainCategory,
  setSubTask,
  setSubDetailedTask,
  setCustomer,
  setContext,
  clearFilters,
  resetReportActivity,
} from '../../../Store/Reducer/ReportSlice';
import debounce from 'lodash/debounce';

interface FilterBarProps {
  setFilterBarSelection: any;
}

const FilterBar = ({ setFilterBarSelection }: FilterBarProps) => {
  const { clients, contextArray, mainCategoryArray } = useData();

  const activitySummaySelection = useSelector(getSelectedActivity);
  const filterState = useSelector(getFilters);

  const { t } = useTranslation();

  const [isFilterApply, setIsFilterApply] = useState(false);
  const [filtersCleared, setFiltersCleared] = useState(false);
  const [triggerFilter, setTriggerFilter] = useState(false);

  const filterMenu = filterMainDropDownOptions(
    clients,
    contextArray,
    mainCategoryArray,
    t
  );

  const dispatch = useDispatch();

  const handleDropdownChange = (list: string[] | string, key: string) => {
    const actions = {
      mainCategory: setMainCategory,
      subTask: setSubTask,
      subDetailedTask: setSubDetailedTask,
      customer: setCustomer,
      context: setContext,
      filter: setFilter,
    };

    dispatch(actions[key](list as string[]));
  };

  const subTaskOptions = useMemo(() => {
    if (!filterState.mainCategory.length) return [];
    return mainCategoryArray
      .filter((item) => filterState.mainCategory.includes(item.value))
      .flatMap((item) => item.subTasks || [])
      .map(({ id, value, label }) => ({ id, value, label }));
  }, [filterState.mainCategory, mainCategoryArray]);

  const subDetailedTaskOptions = useMemo(() => {
    if (!filterState.mainCategory.length) return [];
    const matchedSubTasks = mainCategoryArray
      .filter((item) => filterState.mainCategory.includes(item.value))
      .flatMap((item) => item.subTasks || []);

    return matchedSubTasks
      .filter((item) => filterState.subTask.includes(item.value))
      .flatMap((item) => item.subDetailedTask || [])
      .map(({ id, value, label }) => ({ id, value, label }));
  }, [filterState.mainCategory, filterState.subTask, mainCategoryArray]);

  const handleFilter = useCallback(() => {
    const { context, subTask, subDetailedTask, mainCategory } = filterState;

    if (
      !isFilterApply &&
      context.length &&
      subTask.length &&
      subDetailedTask.length &&
      mainCategory.length
    ) {
      setFilterBarSelection(null);
      return;
    }

    const filterArray = Object.entries({
      context,
      subTask,
      subDetailedTask,
      mainCategory,
    })
      .filter(([_, value]) => value.length)
      .map(([key, value]) => ({ key: capitalizeFirstWord(key), value }));

    setIsFilterApply(filterArray.length > 0);
    if (setFilterBarSelection) {
      setFilterBarSelection(filterArray);
    }
  }, [filterState, setFilterBarSelection, isFilterApply]);

  const debouncedHandleFilter = useMemo(() => {
    return debounce(handleFilter, 300);
  }, [handleFilter]);

  const onHandleClearFilter = () => {
    dispatch(resetReportActivity());
    dispatch(clearFilters());
    setIsFilterApply(false);
    setFiltersCleared(true);
  };

  useEffect(() => {
    if (
      filtersCleared &&
      Object.values(filterState).every((arr: any) => arr.length === 0)
    ) {
      dispatch(
        setFilter([
          'customer',
          'context',
          'mainCategory',
          'subTask',
          'detailedSubTask',
        ])
      );
      setFiltersCleared(false);
      setTriggerFilter(true);
    }
  }, [filtersCleared, filterState]);

  useEffect(() => {
    if (triggerFilter) {
      debouncedHandleFilter();
      setTriggerFilter(false);
    }
  }, [triggerFilter, debouncedHandleFilter]);

  useEffect(() => {
    if (activitySummaySelection && activitySummaySelection.context) {
      dispatch(setContext([activitySummaySelection.context]));
      dispatch(setMainCategory([activitySummaySelection.mainCategory]));
      setIsFilterApply(true);
      setTriggerFilter(true);
    }
  }, [activitySummaySelection]);

  const renderDropdown = (key: string, options: any, placeholder: string) => {
    const selectedCount = filterState[key]?.length || 0;

    return (
      <>
        <VerticalLines noOfLines={1} width={2} />
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <DropDownSelect
            options={options}
            useCheckbox
            multiple
            defaultValue={filterState[key]}
            variant="standard"
            disableUnderline
            showValue={false}
            placeholder={placeholder}
            setSelectedOptions={(selected) =>
              handleDropdownChange(selected, key)
            }
          />
          {selectedCount > 0 && (
            <BadgeContainer>{selectedCount}</BadgeContainer>
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      <FilterBarContainer>
        <FiltersSelectionContainer>
          <DropDownSelect
            options={filterMenu}
            useCheckbox
            multiple
            defaultValue={filterState.filter}
            variant="standard"
            disableUnderline
            showValue={false}
            placeholder="Filter"
            setSelectedOptions={(selected: any) =>
              dispatch(setFilter(selected))
            }
          />
          {filterState.filter.includes('customer') &&
            renderDropdown('customer', clients, t('Customers'))}
          {filterState.filter.includes('context') &&
            renderDropdown('context', contextArray, t('Context'))}
          {filterState.filter.includes('mainCategory') &&
            renderDropdown(
              'mainCategory',
              mainCategoryArray,
              t('MainCategory')
            )}
          {filterState.filter.includes('subTask') &&
            renderDropdown('subTask', subTaskOptions, t('SubTask'))}
          {filterState.filter.includes('detailedSubTask') &&
            renderDropdown(
              'subDetailedTask',
              subDetailedTaskOptions,
              t('DetailSubTask')
            )}
        </FiltersSelectionContainer>
        <FilterApplyButtonWrapper>
          <ButtonField
            variant="contained"
            label={t('Apply')}
            onClick={handleFilter}
            sx={{ height: '25px' }}
          />
        </FilterApplyButtonWrapper>
      </FilterBarContainer>
      {isFilterApply && (
        <ClearFilterBox
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '10px',
            marginTop: '-10px',
          }}
          onClick={onHandleClearFilter}
        >
          {t('clearAll')}
        </ClearFilterBox>
      )}
    </>
  );
};

export default FilterBar;
