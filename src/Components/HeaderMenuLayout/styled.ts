import { Box, IconButton, Typography } from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import styled from '@emotion/styled';
import { GenericStyle } from '../../Utilities/GenericStyle';

export const AppbarContainer = styled(Box)`
  background-color: #fff;
  padding: 0px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const MenuItemStyled = styled(Typography)<{ selected: boolean }>(
  ({ selected }) => ({
    position: 'relative',
    paddingBottom: 4,
    '&::after': {
      position: 'absolute',
      bottom: 0,
      left: '3%',
      right: '3%',
      height: 3,
      backgroundColor: Colors.sagaGreen,
      transform: 'scaleX(0)',
      transformOrigin: 'center',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
    '&:hover': {
      color: Colors.applicationColor,
    },
    cursor: 'pointer',
    color: selected ? Colors.sagaGreen : Colors.black,
    fontSize: GenericStyle.font16,
    fontWeight: selected ? 900 : 500,

    '@media (max-width: 800px)': {
      fontSize: GenericStyle.font14,
    },
  })
);

export const AvatarWrapper = styled(IconButton)({
  marginLeft: 'auto',
});
