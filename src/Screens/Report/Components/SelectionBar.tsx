import { useTranslation } from 'react-i18next';
import DropDownSelect from '../../../Components/Dropdown/Index';
import { SelectionFilterMenu } from '../menuFile';
import { SelectionConatiner, SelectionBox } from './style';
import { Box, useMediaQuery } from '@mui/material';
interface SelectionBarProps {
  menu: { label: string; key: number }[];
  setSelectedButton: any;
  selectedButton: number;
  setSelectionBarDropDown: any;
  selectionBarDropDown: number;
}
const SelectionBar = ({
  menu,
  setSelectedButton,
  selectedButton,
  setSelectionBarDropDown,
  selectionBarDropDown,
}: SelectionBarProps) => {
  const { t } = useTranslation();

  const selectionFiltersMenu = SelectionFilterMenu(t);
  const onHandleDropdownChange = (value: any) => {
    const selectedValue = selectionFiltersMenu.find(
      (item: any) => item.value === value
    );

    if (!selectedValue) return;
    setSelectionBarDropDown(selectedValue.id);
    setSelectedButton(1);
  };

  const screenSize = useMediaQuery('(max-width: 400px)');

  return (
    <>
      <Box>
        <SelectionConatiner>
          <DropDownSelect
            options={selectionFiltersMenu}
            onChange={onHandleDropdownChange}
            height={30}
            borderRadius={0}
            defaultValue={'timeReport'}
            variant="standard"
            disableUnderline
          />
          <Box
            sx={{
              display: 'flex',
              overflow: 'scroll',
              maxWidth: screenSize ? '200px' : '100%',
            }}
          >
            {menu.map((button: { label: string; key: number }) => {
              return (
                <>
                  <SelectionBox
                    ButtonType={selectionBarDropDown}
                    isActive={selectedButton === button.key}
                    onClick={() => setSelectedButton(button.key)}
                  >
                    {button.label}
                  </SelectionBox>
                </>
              );
            })}
          </Box>
        </SelectionConatiner>
      </Box>
    </>
  );
};

export default SelectionBar;
