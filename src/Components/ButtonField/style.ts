import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../Utilities/Colors';
interface ButtonFieldProps {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  label?: string | React.ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
  hoverColor?: string;
  textColor?: string;
  height?: number | string;
  width?: number | string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  borderRadius?: number | string;
  tooltip?: string;
  loadingPosition?: 'start' | 'end' | 'center';
  sx?: object;
  minwidth?: number | string;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'backgroundColor' &&
    prop !== 'hoverColor' &&
    prop !== 'textColor' &&
    prop !== 'height' &&
    prop !== 'width' &&
    prop !== 'borderRadius',
})<ButtonFieldProps>(
  ({
    backgroundColor,
    hoverColor,
    textColor,
    height,
    width,
    minwidth,
    borderRadius,
  }) => ({
    backgroundColor: backgroundColor || theme.palette.primary.main,
    color: textColor || theme.palette.primary.contrastText,
    height,
    width: width,
    minWidth: minwidth,
    textTransform: 'none',
    borderRadius,
    '&:hover': {
      backgroundColor: hoverColor || theme.palette.primary,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  })
);
