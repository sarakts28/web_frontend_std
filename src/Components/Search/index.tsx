import React, { useState, useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  ListItemButton,
  Box,
} from '@mui/material';

import debounce from 'lodash/debounce';
import { IoMdSearch } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { SelectionOption } from '../../Utilities/TypeDeclaraction';
import InputField from '../InputField';
import { useTranslation } from 'react-i18next';

interface SearchProps {
  options?: SelectionOption[];
  onSearch: (searchTerm: string) => Promise<SelectionOption[]>;
  placeholder?: string;
  debounceTime?: number;
  maxResults?: number;
  minSearchLength?: number;
  highlightColor?: string;
  noResultsText?: string;
  customStyles?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    list?: React.CSSProperties;
    listItem?: React.CSSProperties;
  };
  onResultClick?: (result: SelectionOption) => void;
  onCrossIconClick?: () => void;
}

const Search = ({
  options,
  placeholder = 'Search',
  debounceTime = 300,
  minSearchLength = 2,
  highlightColor = '#FFFF00',
  noResultsText = 'No results found',
  customStyles = {},
  onSearchTermChange = () => {},
  onResultClick = () => {},
  onCrossIconClick = () => {},
}: Omit<SearchProps, 'onSearch' | 'maxResults'> & {
  onSearchTermChange?: (term: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SelectionOption[]>([]);
  const { t } = useTranslation();

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        if (options && term.length >= minSearchLength) {
          const filteredResults = options.filter((option) =>
            option.label.toLowerCase().includes(term.toLowerCase())
          );

          setResults(filteredResults);
        } else {
          setResults([]);
        }

        onSearchTermChange(term); // Notify the parent about the search term
      }, debounceTime),
    [options, minSearchLength, debounceTime, onSearchTermChange]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;

    setSearchTerm(term);
    debouncedSearch(term);
  };

  const highlightMatch = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: highlightColor }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleResultClick = (result: SelectionOption) => {
    setSearchTerm(result.label);
    setResults([]);
    onResultClick(result);
  };

  const handleCrossIconClick = () => {
    setSearchTerm('');
    setResults([]);

    if (onCrossIconClick) onCrossIconClick();
  };


  return (
    <Box sx={customStyles.container}>
      <InputField
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t(placeholder)}
        height="auto"
        startAdornment={
          <InputAdornment position="start">
            <IoMdSearch />
          </InputAdornment>
        }
        endAdornment={
          searchTerm && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleCrossIconClick}
                edge="end"
              >
                <RxCross2 />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          ...customStyles.input,
        }}
      />
      {options && results.length > 0 && (
        <Paper elevation={3} sx={customStyles.list}>
          <List>
            {results.map((result) => (
              <ListItem key={result.value} disablePadding>
                <ListItemButton
                  onClick={() => handleResultClick(result)}
                  sx={customStyles.listItem}
                >
                  <ListItemText
                    primary={highlightMatch(result.label, searchTerm)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {options &&
        searchTerm.length >= minSearchLength &&
        results.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            {noResultsText}
          </Typography>
        )}
    </Box>
  );
};

export default Search;
