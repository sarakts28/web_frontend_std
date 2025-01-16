import styled from '@emotion/styled';
import { Accordion, AccordionDetails, Box, Typography } from '@mui/material';
import { Colors } from '../../../../Utilities/Colors';

import { GenericStyle } from '../../../../Utilities/GenericStyle';

export const AccordionDetailsContainer = styled(AccordionDetails)`
  background-color: #f5f5f5;
  border-top: 1px solid ${Colors.borderColor};
  margin: 0;
  cursor: pointer;
`;

export const NumberBox = styled(Box)<{ selectedColor: string }>((props) => ({
  width: '20px',
  height: '20px',
  borderRadius: '10%',
  border: `1px solid ${props.selectedColor}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.selectedColor,
}));

export const AccordionMainContainer = styled(Accordion)`
  margin: 0 !important;
`;

export const HeaderItemBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const GroupByTimeHeader = styled(Box)`
  padding: ${GenericStyle.tertiary_padding} 20px;
  border-bottom: 1px solid ${Colors.borderColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.lightGrey};
  width: 100%;
`;

export const GroupBySectionContainer = styled(Box)`
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${Colors.borderColor};
  width: 100%;
`;

export const GroupByHeaderContainer = styled(Box)`
  padding: ${GenericStyle.tertiary_padding};
  border-bottom: 1px solid ${Colors.borderColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 40px;
  background-color: ${Colors.lightGrey};
`;

export const GroupByInnerContainer = styled(Box)`
  max-height: 65vh;
  overflow-y: auto;
`;

export const WeeklyDateTypography = styled(Typography)<{ itemId: number }>(
  ({ itemId }) => ({
    fontSize: '12px',
    color: Colors.darkGrey,
    width: '80px',
    marginRight: itemId === 8 ? '0px' : '30px',
    justifyContent: itemId === 8 ? 'flex-end' : 'flex-start',
    display: 'flex',
  })
);

export const WeeklyItemContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const WeeklyItemTotalContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  background-color: ${Colors.lightGrey};
`;

export const WeeklyItemSmallContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${Colors.borderColor};
  padding: 10px 15px;
`;

export const WeeklyBoxSmallContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  background-color: ${Colors.lightGrey};
  flex-direction: column;
  margin-top: ${GenericStyle.secondary_margin};
  border: 1px solid ${Colors.borderColor};
  border-radius: 5px;
`;
