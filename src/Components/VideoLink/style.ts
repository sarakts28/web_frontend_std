import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';

export const CallContainer = styled(Box)`
  padding: ${GenericStyle.tertiary_padding};
`;

export const CallButtonContainer = styled(Box)`
  ${() => GenericStyle.flexColumnCenter};
  gap: 5px;
  margin-top: 1rem;
  overflow: auto;
`;

export const NewCallCardContainer = styled(Typography)`
  ${GenericStyle.font16Bold}
  text-align: center;
  font-style: italic;

  @media (max-width: 550px) {
    ${GenericStyle.font10Bold}
  }
  @media (min-width: 551px) and (max-width: 1365px) {
    ${GenericStyle.font14Bold}
  }
`;

export const NewCallCreateContainer = styled(Box)`
  ${() => GenericStyle.flexRowCompleteCenter}
  gap: 10px;
  width: 100%;
  @media (max-width: 550px) {
    ${() => GenericStyle.flexColumnCenter}
  }
`;

export const ExpiryTimeOptionContainer = styled(Box)`
  width: 50%;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const NewCallRoomDetailContainer = styled(Box)`
  ${() => GenericStyle.flexRowCompleteCenter}
  gap: 10px;
  border: 1px solid ${Colors.borderColor};
  padding: ${GenericStyle.tenary_padding};
  border-radius: 2px;
  width: 100%;
  background-color: ${Colors.lightGrey};
  margin: 10px 0px;
  @media (max-width: 550px) {
    ${() => GenericStyle.flexColumnCenter}
    width: 100%;
    flex-wrap: wrap;
  }
`;
