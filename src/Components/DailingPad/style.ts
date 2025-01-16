import { Box, css, styled } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';

export const DailContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
`;

export const DailMainContainer = styled(Box)`
  width: 100%;
  ${css(GenericStyle.flexColumnCenterString)}
  gap: 10px;
`;

export const PhoneInputFieldBox = styled(Box)`
  padding: ${GenericStyle.tertiary_padding} ${GenericStyle.extra_padding};
  width: 100%;
  width: 100%;
  max-width: 300px;
  @media (max-width: 600px) {
    padding: 0px;
  }
`;
