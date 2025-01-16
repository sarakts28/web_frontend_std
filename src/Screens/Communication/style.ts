import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';
import { Colors } from '../../Utilities/Colors';

export const CommunicationHeaderContainer = styled(Box)`
  padding: ${GenericStyle.tertiary_padding};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border: 1px solid ${Colors.borderColor};
  border-bottom: none;
`;

export const CommunicationMainContainer = styled(Box)`
  display: flex;
  width: 100%;
  border: 1px solid ${Colors.borderColor};
  border-right: none;
  box-sizing: border-box;
  max-height: 100vh;
  max-width: 100%;
`;

export const CommunicationDetailContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

export const CommunicationUserContainer = styled(Box)`
  width: 25%;
  border-right: 1px solid ${Colors.borderColor};
  height: 83vh;
  max-height: 83vh;
  overflow-y: auto; // This will enable scrolling
  display: flex;
  flex-direction: column;
  padding: ${GenericStyle.tertiary_padding};

  @media (min-width: 300px) and (max-width: 599px) {
    width: 50%;
    height: 100vh; // Take full height on small screens
  }
  @media (min-width: 600px) and (max-width: 1000px) {
    width: 30%;
  }
`;

export const CommunicationChatContainer = styled(Box)<{ isNewCall: boolean }>`
  width: ${({ isNewCall }) => (isNewCall ? '75%' : '50%')};
  border-right: 1px solid ${Colors.borderColor};
  height: 83vh;
  max-height: 83vh;
  overflow-y: auto;
  overflow-x: auto;

  @media (min-width: 600px) and (max-width: 1000px) {
    width: 70%;
  }

  @media (min-width: 300px) and (max-width: 599px) {
    width: 50%;
    height: 100vh;
  }
`;

export const SearchBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ToggleContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  width: auto;
  margin-top: 10px;

  @media (min-width: 1200px) {
    width: auto;
    justify-content: flex-end;
  }
`;

export const SearchContainer = styled(Box)`
  width: auto;
  margin-right: 5px;

  @media (min-width: 1280px) {
    width: 70%;
  }
`;
