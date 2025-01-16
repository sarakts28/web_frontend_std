import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';
import { Colors } from '../../Utilities/Colors';

export const UserCardContainer = styled(Box)<{
  height: number;
  isActive?: boolean;
  activeColor?: string;
}>`
  display: flex;
  flex-direction: row;
  height: ${({ height }) => `${height}px`};
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: space-between;
  padding: 0 ${GenericStyle.primary_padding};
  width: auto;
  border-radius: 5px;
  background-color: ${({ isActive, activeColor }) =>
    isActive ? activeColor : Colors.white};
  cursor: pointer;

  @media (max-width: 800px) {
    height: auto;
    padding: ${GenericStyle.tenary_padding} ${GenericStyle.primary_padding};
  }
`;

export const TextBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const TextStyle = styled(Typography)<{
  size: string;
  isGrey?: boolean;
  isActive?: boolean;
}>`
  ${({ size }) =>
    size === 'small' ? GenericStyle.font10Regular : GenericStyle.font12Medium};
  color: ${({ isGrey, isActive }) =>
    isActive ? Colors.white : isGrey ? Colors.darkGrey : Colors.black};
  text-align: left;
  text-transform: capitalize;

  @media (min-width: 1281px) {
    ${({ size }) =>
      size === 'small'
        ? GenericStyle.font14Regular
        : GenericStyle.font18Medium};
  }
`; // size can be small =12 and larger = 14 for small screens

export const CardElements = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-left: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0px;
    gap: 5px;
  }

  @media (min-width: 1600px) {
    width: 90%;
  }
`;
