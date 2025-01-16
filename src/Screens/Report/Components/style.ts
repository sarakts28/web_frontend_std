import { Box, styled, css, Typography } from '@mui/material';
import { Colors } from '../../../Utilities/Colors';

export const SelectionConatiner = styled(Box)(() => {
  return {
    width: 'auto',
    border: `1px solid ${Colors.borderColor}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    paddingLeft: '10px',
  };
});

export const SelectionBox = styled(Box)<{
  ButtonType: number;
  isActive: boolean;
}>(({ isActive }) => {
  return {
    padding: '10px',
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: ` 1px solid ${Colors.borderColor}`,
    cursor: 'pointer',
    backgroundColor: isActive ? Colors.lightGrey : '#fff',
    color: isActive ? Colors.black : Colors.darkGrey,
  };
});

export const CalendarInputContainer = styled(Box)`
  width: auto;
  border: 1px solid ${Colors.borderColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 10px 0px 10px 10px;
  gap: 10px;
  margin-right: 10px;
  border-right: none;
`;

export const ArrowBox = styled(Box)`
  border: 1px solid ${Colors.borderColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
`;

export const InputContainer = styled(Box)`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
`;

export const CalendarPaper = styled(Box)<{
  top: number;
  left: number;
}>(({ top, left }) => {
  return css`
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    width: auto;
    height: auto;
    display: flex;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid ${Colors.borderColor};
    border-radius: 8px;
    z-index: 999;
    background-color: #fff;
  `;
});

export const CalendarSelectionBarStyle = styled(Box)`
  padding: 10px;
`;

export const CalendarItem = styled(Typography)<{
  isActive: boolean;
}>(({ isActive }) => {
  return {
    padding: '10px',
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${Colors.borderColor}`,
    cursor: 'pointer',
    fontSize: 12,
    backgroundColor: isActive ? Colors.lightGrey : '#fff',
    color: isActive ? Colors.black : Colors.darkGrey,
  };
});

export const FilterBarContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0px 20px 0px;
  border: 1px solid ${Colors.borderColor};
  padding: 0px 10px;
`;

export const FiltersSelectionContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: auto;
`;

export const ClearFilterBox = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  color: ${Colors.littleBlue};
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: -10px;
  &:hover {
    text-decoration: underline;
  }
`;

export const BadgeContainer = styled(Box)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #f50057;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

export const FilterApplyButtonWrapper = styled(Box)`
  @media (max-width: 854px) {
    margin: 8px 0px;
  }
`;

export const GraphContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0px 20px 0px;
`;
