import { Box, styled, keyframes } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';

// Define the keyframes for the pulse animation
const pulse = keyframes`
  0%, 100% {
    transform: scaleY(0.4);
  }
  50% {
    transform: scaleY(1);
  }
`;

export const Waves = styled(Box)<{ delay: string }>`
  width: 10px;
  height: 50px;
  background-color: #007bff;
  animation: ${pulse} 1s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

export const WavesContainer = styled(Box)`
  ${() => GenericStyle.flexRowCompleteCenter};
  margin-bottom: 10px;
  gap: 10px;
`;
