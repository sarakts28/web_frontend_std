import styled from '@emotion/styled';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { Colors } from '../../Utilities/Colors';

export const PaperStyle = styled(Paper)`
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
  max-height: 600px;
  overflow: auto;
  border: 2px solid ${Colors.applicationColor};
`;

export const ActivityListContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const ActivityContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
`;

export const ActivityInputContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
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
`;
