import { Modal, Typography, Box, ListItem, Checkbox } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import {
  SubSelectorButton,
  SubSelectorContainer,
  SubSelectorContent,
  SearchContainer,
} from './style';
import ButtonField from '../ButtonField';
import Search from '../Search';
import { useTranslation } from 'react-i18next';

interface MultiLevelSelectorProps {
  data: any[];
  handleModalClose: () => void;
  isModalOpen: boolean;
  setPaths: React.Dispatch<
    React.SetStateAction<{ level: number; value: string }[]>
  >;
  setOptions?: React.Dispatch<React.SetStateAction<string[]>>;
  levelNameArray: string[];
  searchKeywords?: string[];
}
const MultiLevelSelector = ({
  data,
  handleModalClose,
  isModalOpen,
  setPaths,
  setOptions,
  levelNameArray,
  searchKeywords,
}: MultiLevelSelectorProps) => {
  const [expandedPaths, setExpandedPaths] = useState<
    { level: number; value: string }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dataArray, setDataArray] = useState<any[]>(data);
  const { t } = useTranslation();
  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return '#000';
      case 1:
        return '#2D6A4F';
      case 2:
        return '#F1C40F';
      case 3:
        return '#E74C3C';
      case 4:
        return '#8E44AD';
      default:
        return '#ffffff';
    }
  };

  const handleOptionClick = (
    selectedOption: { value: string; label: string },
    level: number
  ) => {
    setExpandedPaths((prev) =>
      prev.some(
        (item) => item.level === level && item.value === selectedOption.value
      )
        ? prev.filter(
            (item) =>
              !(item.level === level && item.value === selectedOption.value)
          )
        : [
            ...prev.filter((item) => item.level !== level),
            { level, value: selectedOption.value },
          ]
    );

    setSelectedOptions((prev) =>
      prev.includes(selectedOption.label)
        ? prev.filter((label) => label !== selectedOption.label)
        : [...prev, selectedOption.label]
    );
  };

  useEffect(() => {
    if (expandedPaths.length === 0) return;

    const a = expandedPaths.map((item) => item.level);
    const count = Math.max(...a);
    let missingLevel: number | undefined;

    for (var i = 0; i <= count; i++) {
      if (a.indexOf(i) === -1) {
        missingLevel = i;
        break;
      }
    }

    if (missingLevel !== undefined) {
      setExpandedPaths((prev) =>
        prev.filter((item) => item.level < missingLevel)
      );

      const updatedSelectedOptions = selectedOptions.filter(
        (_, index) => index < missingLevel
      );

      setSelectedOptions(updatedSelectedOptions);
    }
  }, [expandedPaths, selectedOptions]);

  const renderOptions = (options: any[], level: number = 0) => {
    return options.map((option) => {
      const isSelected = expandedPaths.some(
        (item) => item.level === level && item.value === option.value
      );
      const optionKeys = Object.keys(option);

      return (
        <div
          key={option.value}
          style={{ marginBottom: '5px', paddingRight: '10px' }}
        >
          <ListItem
            onClick={() => handleOptionClick(option, level)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mb: 1,
              borderRadius: '4px',
              padding: '5px',
              marginLeft: `${level * 8}px`,
              backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
            }}
          >
            <Checkbox
              checked={isSelected}
              onChange={() => handleOptionClick(option, level)}
            />
            <Typography color={getColor(level)}>{option.label}</Typography>
            {levelNameArray.includes(optionKeys[optionKeys.length - 1]) && (
              <span style={{ marginLeft: 'auto' }}>
                {isSelected ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </span>
            )}
          </ListItem>

          {isSelected &&
            (option.mainCategory ||
              option.subTasks ||
              option.subDetailedTask ||
              option.context) && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {renderOptions(
                  option.mainCategory ||
                    option.subTasks ||
                    option.subDetailedTask ||
                    option.context,
                  level + 1
                )}
              </Box>
            )}
        </div>
      );
    });
  };

  const buttonDisable = useMemo(() => {
    if (expandedPaths.length >= 4) return false;
    return true;
  }, [expandedPaths]);

  const handleDoneClick = () => {
    setPaths(expandedPaths);
    if (setOptions) setOptions(selectedOptions);

    setExpandedPaths([]);
    setSelectedOptions([]);
    handleModalClose();
  };

  const handleSearchTermChange = (term: string) => {
    if (term && searchKeywords?.length) {
      const filteredActivities = data.filter((option) => {
        const isPrimaryMatch = option.value
          ?.toLowerCase()
          .includes(term.toLowerCase());

        const isAdditionalMatch = searchKeywords.slice(1).some((key) => {
          if (key in option) {
            const field = option[key];

            if (Array.isArray(field)) {
              const filteredField = field.filter((item) =>
                item.value?.toLowerCase().includes(term.toLowerCase())
              );

              if (filteredField.length > 0) {
                option[key] = filteredField;
                return true;
              }

              return false;
            }

            return (
              typeof field === 'string' &&
              field.toLowerCase().includes(term.toLowerCase())
            );
          }

          return false;
        });

        return isPrimaryMatch || isAdditionalMatch;
      });

      setDataArray(filteredActivities);
    } else {
      setDataArray(data);
    }
  };

  const handleOutsideClickClose = () => {
    setDataArray(data);
    handleModalClose();
    setExpandedPaths([]);
    setSelectedOptions([]);
  };

  const handleModalCloseWrapper = (
    event: React.SyntheticEvent,
    reason: string
  ) => {
    if (reason === 'backdropClick') {
      handleOutsideClickClose();
    } else {
      handleModalClose();
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalCloseWrapper}>
      <SubSelectorContainer>
        {searchKeywords && searchKeywords.length > 0 && (
          <SearchContainer>
            <Search
              placeholder={t('SearchAll')}
              onSearchTermChange={handleSearchTermChange}
              customStyles={{
                container: {
                  marginBottom: '0.5rem',
                },
              }}
              onCrossIconClick={() => setDataArray(data)}
            />
          </SearchContainer>
        )}
        <Typography id="modal-title" variant="h6">
          {t('ActivityType')}
        </Typography>
        {selectedOptions && selectedOptions.length > 0 && (
          <Typography variant="body2" mb={2}>
            {t('SelectedOptions')}: {selectedOptions.join('> ')}
          </Typography>
        )}

        <SubSelectorContent>{renderOptions(dataArray)}</SubSelectorContent>
        <SubSelectorButton>
          <ButtonField
            label={t('Done')}
            onClick={handleDoneClick}
            disabled={buttonDisable}
          />
        </SubSelectorButton>
      </SubSelectorContainer>
    </Modal>
  );
};

export default MultiLevelSelector;
