import { Box, styled } from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';

export const SubSelectorContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SubSelectorContent = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 65vh;
  overflow: auto;
  padding: 10px, 5px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const SubSelectorButton = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
`;

export const SearchContainer = styled(Box)`
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const EmptyConatiner = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  color: ${Colors.applicationColor};
  ${GenericStyle.font14Bold}
`;
