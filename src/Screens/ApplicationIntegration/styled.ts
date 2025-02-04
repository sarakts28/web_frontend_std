import styled from '@emotion/styled';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';
import { Colors } from '../../Utilities/Colors';

export const AIHeader = styled(Typography)`
  font-size: ${GenericStyle.font24};
  @media (max-width: 600px) {
    font-size: ${GenericStyle.font16};
  }
`;

export const AISubHeader = styled(Typography)`
  font-size: ${GenericStyle.font18};
  margin-bottom: ${GenericStyle.tenary_padding};
  color: ${Colors.grey500};
  @media (max-width: 600px) {
    font-size: ${GenericStyle.font12};
  }
`;

export const ApplicationCard = styled(Card)`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ApplicationMediaBox = styled(Box)`
  border: 1px solid ${Colors.borderColor};
  border-radius: 5px;
  padding: ${GenericStyle.tenary_padding};
  margin-left: ${GenericStyle.primary_margin};
  margin-top: ${GenericStyle.primary_margin};
  width: 90px;
  height: 90px;
`;

export const AppicationContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export const ApplicationContainer = styled(Box)`
  padding: ${GenericStyle.tertiary_padding};
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-height: 80vh;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: center;
`;
