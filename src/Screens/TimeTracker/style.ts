import { Box, IconButton, styled, Typography } from '@mui/material';
import { Colors } from '../../Utilities/Colors';

export const TrackerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
  height: auto;
  padding: 10px;
`;

export const TimeTrackerbox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
  }
`;

export const TimeTrackerInputBox = styled(Box)`
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (min-width: 600px) and (max-width: 1024px) {
    width: 50%;
  }
`;

export const TimeTrackerSelectionBox = styled(Box)`
  display: inline-block;
  position: relative;
`;

export const TimeTrackerAddIcon = styled(IconButton)`
  border-radius: 50%;
  background-color: white;
  border: 1px dashed ${Colors.applicationColor};
`;

export const TimeTrackerAddIconLabel = styled(Typography)`
  color: ${Colors.applicationColor};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const ActivitListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin: 10px 0px;
  height: auto;
  max-height: 30vh;
  overflow-y: auto;
  padding: 15px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid ${Colors.borderColor};
  box-shadow:
    0 4px 4px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1); /* Shadow on all sides */
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow on hover */
  }
`;

export const ActionButtonsBox = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: auto;
`;

export const TimeBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: auto;
`;

export const AddMoreContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border: 0.5px solid ${Colors.applicationColor};
  width: 120px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.applicationColor};
    color: #fff;
  }
`;

export const TodayTimeContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SelectionTypography = styled(Typography)`
  color: ${Colors.applicationColor};
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-top: 5px;
  }
`;
