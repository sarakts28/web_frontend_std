import React, { useCallback, useEffect, useState } from 'react';
import { MenuItem, Select, Checkbox, Chip, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { SelectionOption } from '../../Utilities/TypeDeclaraction';
import { DropDownContainer, LabelContainer, StyledPaper } from './style';

interface DropDownSelectProps {
  options: SelectionOption[];
  label?: string;
  placeholder?: string | React.ReactNode;
  multiple?: boolean;
  setSelectedOptions?: (value: string | string[]) => void;
  useCheckbox?: boolean;
  useChips?: boolean;
  autoWidth?: boolean;
  onChange?: (value: string | string[]) => void;
  defaultValue?: string | string[];
  valueAsIcon?: boolean;
  height?: number;
  borderRadius?: number;
  disableUnderline?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  selectionStyle?: object;
  showValue?: boolean;
}

const DropDownSelect: React.FC<DropDownSelectProps> = ({
  options,
  label,
  placeholder = 'Select an option',
  multiple = false,
  useCheckbox = false,
  useChips = false,
  autoWidth = false,
  onChange,
  defaultValue,
  valueAsIcon = false,
  height = 44,
  borderRadius = 5,
  disableUnderline = false,
  variant = 'outlined',
  selectionStyle,
  showValue = true,
  setSelectedOptions,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    defaultValue ? defaultValue : multiple ? [] : ''
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const value = event.target.value;

    setSelectedValue(value);

    if (setSelectedOptions) {
      setSelectedOptions(value);
    }

    if (onChange) {
      onChange(value);
    }
  };

  const renderValue = useCallback(
    (selected: string | string[]) => {
      if (!showValue) return <Typography>{placeholder}</Typography>;
      if (!selected || (Array.isArray(selected) && selected.length === 0)) {
        return <Typography>{placeholder}</Typography>;
      }

      if (valueAsIcon && !multiple && !useChips) {
        return options.find((option) => option.value === selected)?.icon;
      } else if (useChips && multiple && Array.isArray(selected)) {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={options.find((option) => option.value === value)?.label}
              />
            ))}
          </div>
        );
      } else if (multiple && Array.isArray(selected)) {
        return selected
          .map(
            (value) => options.find((option) => option.value === value)?.label
          )
          .join(', ');
      }

      return options.find((option) => option.value === selected)?.label;
    },
    [multiple, options, placeholder, useChips, valueAsIcon, showValue]
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <DropDownContainer>
      {label && <Typography>{label}</Typography>}
      <Select
        sx={
          selectionStyle
            ? selectionStyle
            : {
                height: `${height}px`,
                borderRadius: `${borderRadius}px`,
              }
        }
        disableUnderline={disableUnderline}
        variant={variant}
        label={undefined}
        value={selectedValue}
        onChange={handleChange}
        multiple={multiple}
        autoWidth={autoWidth}
        displayEmpty
        renderValue={renderValue}
        MenuProps={{
          PaperProps: {
            component: StyledPaper,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {useCheckbox && (
              <Checkbox
                checked={
                  multiple
                    ? (selectedValue as string[]).indexOf(option.value) > -1
                    : selectedValue === option.value
                }
              />
            )}
            {option.icon ? (
              <LabelContainer>
                <Typography>{option.icon}</Typography>
                <Typography>{option.label}</Typography>
              </LabelContainer>
            ) : (
              option.label
            )}
            {!useCheckbox &&
              multiple &&
              (selectedValue as string[]).indexOf(option.value) > -1 && (
                <Checkbox
                  checked={(selectedValue as string[]).includes(option.value)}
                />
              )}
          </MenuItem>
        ))}
      </Select>
    </DropDownContainer>
  );
};

export default DropDownSelect;
