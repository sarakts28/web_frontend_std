import React, { forwardRef } from 'react';
import { Box, Typography, InputAdornment } from '@mui/material';
import { CustomTextField } from './style';
import { GenericStyle } from '../../Utilities/GenericStyle';

interface InputFieldProps {
  label?: string;
  value: string;
  name?: string;
  onChange: any;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  sx?: object;
  labelStyle?: object;
  inputContainerStyle?: object;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onKeyDown?: any;
  height?: string;
  maxlength?: number;
  readOnly?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      value,
      onChange,
      name,
      placeholder,
      type,
      disabled,
      error,
      helperText,
      required,
      multiline,
      rows,
      sx,
      labelStyle,
      inputContainerStyle,
      startAdornment,
      endAdornment,
      onKeyDown,
      height,
      maxlength,
      readOnly,
    },
    ref
  ) => {
    return (
      <Box
        sx={
          inputContainerStyle
            ? inputContainerStyle
            : { flexDirection: 'column', display: 'flex', gap: '10px' }
        }
      >
        <Typography
          sx={
            labelStyle
              ? labelStyle
              : {
                  fontSize: GenericStyle.font14Bold,
                  ...GenericStyle.flexRowCenter,
                }
          }
        >
          {required ? (
            <>
              <span
                style={{
                  color: 'red',
                  marginRight: '4px',
                  fontSize: GenericStyle.font16,
                }}
              >
                *
              </span>{' '}
              {label}
            </>
          ) : (
            label
          )}
        </Typography>
        <CustomTextField
          ref={ref} // Pass the ref to the CustomTextField
          name={name}
          fullWidth
          variant="outlined"
          hiddenLabel
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          height={height}
          disabled={disabled}
          error={error}
          helperText={helperText}
          multiline={multiline}
          onKeyDown={onKeyDown}
          rows={rows}
          sx={{
            ...sx,
            ...(type === 'number' && {
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
            }),
          }}
          slotProps={{
            htmlInput: { maxLength: maxlength },
            input: {
              readOnly: readOnly,
              startAdornment: startAdornment ? (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ) : null,
              endAdornment: endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : null,
            },
          }}
        />
      </Box>
    );
  }
);

export default InputField;
