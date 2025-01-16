import React from 'react';
import { CircularProgress, Tooltip, Typography } from '@mui/material';
import { StyledButton } from './style';

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
  minWidth?: number | string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  borderRadius?: number | string;
  tooltip?: string;
  loadingPosition?: 'start' | 'end' | 'center';
  sx?: object;
  labelStyle?: object;
}

const ButtonField: React.FC<ButtonFieldProps> = ({
  disabled = false,
  type = 'button',
  isLoading = false,
  label,
  onClick,
  backgroundColor,
  hoverColor,
  textColor,
  height = 44,
  width,
  minWidth,
  fullWidth = false,
  startIcon,
  endIcon,
  variant = 'contained',
  size = 'medium',
  borderRadius,
  tooltip,
  loadingPosition = 'center',
  sx,
  labelStyle,
}) => {
  const buttonContent = (
    <StyledButton
      variant={variant}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      textColor={textColor}
      height={height}
      width={width}
      minwidth={minWidth}
      fullWidth={fullWidth}
      startIcon={
        !isLoading || loadingPosition !== 'start' ? (
          startIcon
        ) : (
          <CircularProgress size={20} color="inherit" />
        )
      }
      endIcon={
        !isLoading || loadingPosition !== 'end' ? (
          endIcon
        ) : (
          <CircularProgress size={20} color="inherit" />
        )
      }
      size={size}
      borderRadius={borderRadius}
      sx={sx}
    >
      {isLoading && loadingPosition === 'center' ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <Typography sx={labelStyle}>{label}</Typography>
      )}
    </StyledButton>
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {buttonContent}
    </Tooltip>
  ) : (
    buttonContent
  );
};

export default ButtonField;
