import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Colors } from '../../../Utilities/Colors';
import { GenericStyle } from '../../../Utilities/GenericStyle';

export const UserEmailSelectionContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  padding: ${GenericStyle.tertiary_padding};
  @media (max-width: 550px) {
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid ${Colors.borderColor};
  }
`;

export const EmailCardContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  height: auto;
  border-bottom: 1px solid ${Colors.borderColor};
  overflow-x: auto;
  cursor: pointer;
  padding: ${GenericStyle.tertiary_padding};

  @media (max-width: 550px) {
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
    height: auto;
  }
`;

export const EmailCardNameContainer = styled(Box)`
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  @media (min-width: 551px) and (max-width: 1500px) {
    width: 20%;
  }
  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const EmailCardSubjectContainer = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70%;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const EmailButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
`;

export const ChatCardContainer = styled(Box)<{ type: boolean }>`
  display: flex;
  flex-direction: ${({ type }) => (type ? 'row-reverse' : 'row')};
  justify-content: flex-end;
  gap: 5px;
  margin-top: 10px;
`;

export const ChatCardElements = styled(Typography)`
  border: 1px solid;
  border-radius: 5px;
  border-color: ${Colors.applicationColor};
  padding: ${GenericStyle.tertiary_padding};
  font-size: 14px;
`;

export const ChatCardElementsTime = styled(Typography)<{ type: boolean }>`
  text-align: right;
  font-size: 14px;
  display: flex;
  justify-content: ${({ type }) => (type ? 'flex-start' : 'flex-end')};
  width: 100%;
`;

export const ChatContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  max-height: 82vh;
  width: auto;
  overflow: auto;
`;

export const TypingChatBox = styled(Box)`
  border-top: 1px solid ${Colors.borderColor};
  padding: 5px;
  z-index: 999;
`;

export const CallContainer = styled(Box)`
  padding: ${GenericStyle.tertiary_padding};
`;

export const CallButtonContainer = styled(Box)`
  ${() => GenericStyle.flexColumnCenter};
  margin-top: 1rem;
  overflow: auto;
  width: 100%;
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

export const CallDetailCardContainer = styled(Box)<{ type: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${Colors.borderColor};
  border-radius: 5px;
  padding: ${GenericStyle.tertiary_padding};
  gap: 10px;
  width: fit-content;
  margin: ${GenericStyle.primary_margin};
`;

export const EmailNavigationContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 75vh;
  width: 100%;
  padding: 10px;
  overflow: auto;
`;

export const EmailSenderModalField = styled(Box)`
  max-width: 95%;
  overflow: auto;
  white-space: nowrap;
  height: auto;
  border: 1px solid ${Colors.borderColor};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 5px;
`;
