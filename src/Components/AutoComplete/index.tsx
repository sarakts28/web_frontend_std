import React from 'react';
import {
  Autocomplete,
  TextField,
  Avatar,
  Box,
  Typography,
  Chip,
  InputLabel,
} from '@mui/material';
import { SelectionOption } from '../../Utilities/TypeDeclaraction';

interface AutoCompleteFieldProps {
  options: SelectionOption[];
  placeholder?: string;
  onOptionSelect?: (
    selectedOptions: SelectionOption | SelectionOption[] | null
  ) => void;
  allowMultiple?: boolean;
  groupByFirstLetter?: boolean;
  enableSorting?: boolean;
  label?: string;
}

const AutoCompleteField = ({
  options,
  placeholder = 'Select options',
  onOptionSelect,
  allowMultiple = false,
  groupByFirstLetter = false,
  enableSorting = false,
  label,
}: AutoCompleteFieldProps) => {
  // Sort options if enabled
  const processedOptions = enableSorting
    ? [...options].sort((a, b) => a.label.localeCompare(b.label))
    : options;

  // Callback function for rendering tags
  const renderTagsCallback = (
    selectedOptions: SelectionOption[],
    getTagProps: (props: { index: number }) => object
  ) => {
    return selectedOptions.map((option, index) => (
      <Chip
        key={index}
        label={option.label}
        avatar={
          option.icon ? (
            <Avatar src={option.icon} alt={option.label} />
          ) : undefined
        }
        {...getTagProps({ index })}
      />
    ));
  };

  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}

      <Autocomplete
        multiple={allowMultiple}
        options={processedOptions}
        groupBy={
          groupByFirstLetter
            ? (option) => option.label[0].toUpperCase()
            : undefined
        }
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            {...props}
            component="li"
            display="flex"
            alignItems="center"
            key={option.label}
            sx={{
              '&:hover': { backgroundColor: '#f0f0f0' },
              padding: '5px',
            }}
          >
            {option.icon && (
              <Avatar
                src={option.icon}
                alt={option.label}
                sx={{ width: 24, height: 24, marginRight: 1 }}
              />
            )}
            <Typography>{option.label}</Typography>
          </Box>
        )}
        renderTags={(selectedOptions, getTagProps) =>
          allowMultiple
            ? renderTagsCallback(selectedOptions, getTagProps)
            : null
        }
        onChange={(event, value) => {
          if (onOptionSelect) onOptionSelect(value);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder={placeholder} />
        )}
        sx={{
          '& .MuiAutocomplete-groupLabel': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
          width: '100%',
        }}
      />
    </>
  );
};

export default AutoCompleteField;
