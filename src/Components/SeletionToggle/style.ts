import { Box } from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import styled from '@emotion/styled';

export const SelectionToggleItem = styled(Box)<{
  isActive: boolean;
  activeColor: string;
  activeTextColor: string;
  size: 'small' | 'medium' | 'large';
  isLastItem: boolean;
  isFirstChild: boolean;
}>(
  ({
    isActive,
    activeColor,
    activeTextColor,
    size,
    isLastItem,
    isFirstChild,
  }) => ({
    height: 'auto',
    padding: {
      small: '5px',
      medium: '10px',
      large: '15px',
    }[size],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: isActive ? activeColor : '#fff',
    color: isActive ? activeTextColor : Colors.darkGrey,
    textAlign: 'center',
    fontSize: {
      small: '6px',
      medium: '10px',
      large: '12px',
    }[size],
    borderLeft:
      isActive || isFirstChild ? 'none' : `1px solid ${Colors.borderColor}`,

    borderTopRightRadius: isLastItem ? '5px' : 0,
    borderBottomRightRadius: isLastItem ? '5px' : 0,
    width: {
      small: 'auto',
      medium: 'auto',
      large: 'auto',
    }[size],
    '&:hover': {
      backgroundColor: Colors.lightGrey,
      color: Colors.black,
    },
  })
);
