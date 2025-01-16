import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ActivityList from './ActivityList';
import { IoAddCircle, IoClose } from 'react-icons/io5';
import {
  ActivityContainer,
  PaperStyle,
  TimeTrackerAddIcon,
  TimeTrackerSelectionBox,
  TimeTrackerAddIconLabel,
  ActivityInputContainer,
} from './style';
import { generateRandomId } from '../../Utilities/commonFunctions';
import InputField from '../InputField';
import { useActivityTimers } from '../../Hooks/useActivityTimer';
import { useSelector } from 'react-redux';
import { getUserData } from '../../Store/Selectors/AuthSelector';
import MultiLevelSelector from '../MultiLevelSelector';
import useData from '../../Screens/TimeTracker/data';
import { FaStar } from 'react-icons/fa';

interface ActivityModalProps {
  onClose: () => void;
}

export default function ActivityModal({ onClose }: ActivityModalProps) {
  const { activitiesDayArray, addActivityTimer } = useActivityTimers();

  const [activityText, setActivityText] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<
    { level: number; value: string }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentUserData = useSelector(getUserData);
  const { data } = useData();

  const handleActivList = () => {
    addActivityTimer({
      id: generateRandomId(5),
      customerId: expandedPaths[0].value,
      userId: currentUserData?.userId,
      mainCategory: expandedPaths[2].value,
      subTask: expandedPaths[3].value,
      detailedSubTask:
        expandedPaths && expandedPaths.length > 4 ? expandedPaths[4].value : '',
      description: activityText ? activityText : '',
      context: expandedPaths[1].value,
      labelArray: selectedOptions,
      localDate: new Date().toISOString(),
      utcDate: new Date().toISOString(),
      duration: 0,
    });
  };

  useEffect(() => {
    if (expandedPaths.length > 0) {
      handleActivList();
    }
  }, [expandedPaths]);

  return (
    <PaperStyle>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Activity Time Tracker</Typography>

        <IoClose size={18} onClick={onClose} />
      </Box>
      <ActivityContainer>
        <ActivityInputContainer>
          <Box sx={{ width: '100%' }}>
            <InputField
              onChange={(event: any) => setActivityText(event.target.value)}
              name="activity"
              value={activityText}
              placeholder="Add an activity"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeTrackerSelectionBox onClick={() => setIsModalOpen(true)}>
              <TimeTrackerAddIcon>
                <IoAddCircle fontSize="14" color="black" />
              </TimeTrackerAddIcon>
              <FaStar
                fontSize="10"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'red',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  padding: '2px',
                }}
              />
            </TimeTrackerSelectionBox>
            <TimeTrackerAddIconLabel>Project</TimeTrackerAddIconLabel>
          </Box>
        </ActivityInputContainer>

        {activitiesDayArray && activitiesDayArray.length > 0 && (
          <ActivityList
            activity={activitiesDayArray[0]?.activities}
            currentUserData={currentUserData}
          />
        )}

        <MultiLevelSelector
          data={data}
          handleModalClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
          setPaths={setExpandedPaths}
          setOptions={setSelectedOptions}
          levelNameArray={[
            'context',
            'mainCategory',
            'subTasks',
            'subDetailedTask',
          ]}
          searchKeywords={['Customer', 'context']}
        />
      </ActivityContainer>
    </PaperStyle>
  );
}
