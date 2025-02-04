import { Box, styled } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';

export const MainContainer = styled(Box)`
  padding: ${GenericStyle.tertiary_padding};
  overflow: auto;
  width: 100%;
`;

export const SelectionCalendarBar = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;
