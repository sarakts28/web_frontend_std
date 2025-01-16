import { Typography } from '@mui/material';
import {
  GroupByHeaderContainer,
  GroupByInnerContainer,
  GroupBySectionContainer,
} from '../styles';
import { GenericStyle } from '../../../../../Utilities/GenericStyle';
import {
  groupByKey,
  groupByOptions,
  groupByOptionsToShow,
} from '../../../menuFile';
import GroupItem from './GroupItem';
import { useSelector } from 'react-redux';
import { getFilteredActivities } from '../../../../../Store/Selectors/ActivityTrackerSelector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyComponent, DropDownSelect } from '../../../../../Components';
import { setValueToLocalStorage } from '../../../../../Utilities/commonFunctions';

interface GroupBySummaryProps {
  setSelectionButton: (value: number) => void;
}

const GroupBySummary = ({ setSelectionButton }: GroupBySummaryProps) => {
  const filterData = useSelector(getFilteredActivities);
  const [groupBy, setGroupBy] = useState<string>('');
  const [toShow, setToShow] = useState<string>('');
  const GroupData = groupByKey(filterData, groupBy ? groupBy : 'context');

  const { t } = useTranslation();

  useEffect(() => {
    setValueToLocalStorage('groupBy', groupBy);
  }, [groupBy]);

  return (
    <>
      <GroupBySectionContainer>
        <GroupByHeaderContainer>
          <Typography sx={GenericStyle.font14Medium}>
            {t('groupBy')}:
          </Typography>
          <DropDownSelect
            options={groupByOptions}
            placeholder={t('groupBy')}
            defaultValue={groupBy}
            onChange={(event: any) => setGroupBy(event)}
            variant="standard"
            disableUnderline
            height={20}
          />
          <DropDownSelect
            options={groupByOptionsToShow}
            placeholder={t('toShow')}
            defaultValue={toShow}
            onChange={(event: any) => setToShow(event)}
            variant="standard"
            disableUnderline
            height={20}
          />
        </GroupByHeaderContainer>
        <GroupByInnerContainer>
          {GroupData.length === 0 && <EmptyComponent text={t('noDataFound')} />}
          <GroupItem
            toShow={toShow ? toShow : 'description'}
            groupData={GroupData}
            setSelectionButton={setSelectionButton}
            key={groupBy}
          />
        </GroupByInnerContainer>
      </GroupBySectionContainer>
    </>
  );
};

export default GroupBySummary;
