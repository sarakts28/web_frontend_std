import { Box, styled, css } from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';

export const MainContainer = styled(Box)`
  height: 80vh;
  background-color: ${Colors.white};
  ${css(GenericStyle.flexColumnCenterString)}
  gap: 30px;
`;

export const FormContainer = styled(Box)`
  padding: ${GenericStyle.extra_padding};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${Colors.milkWhite};
`;

export const InnerContainer = styled(Box)`
  ${css(GenericStyle.flexColumnCenterString)}
  gap:  20px;

  @media (min-width: 300 && max-width: 600) {
    gap: 10px;
  }

  @media (max-width: 600px) {
    width: 80%;
  }

  @media (min-width: 601px) {
    width: 40%;
  }
  @media (min-width: 1200px) {
    width: 35%;
  }
  @media (min-width: 1600px) {
    width: 25%;
  }
  @media (min-width: 2000px) {
    width: 20%;
  }
`;

export const ButtonWrapper = styled(Box)`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const ForgetContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  color: ${Colors.littleBlue};
  cursor: pointer;
`;
