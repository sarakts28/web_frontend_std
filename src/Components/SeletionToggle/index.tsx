import { Box } from '@mui/material';
import { SelectionToggleItem } from './style';
import { Colors } from '../../Utilities/Colors';

interface MenuItem {
  label: string;
  value: number | string;
}

interface SelectionBoxProps {
  menu: MenuItem[];
  selectedButton: number | string;
  setSelectedButton: (value: number | string) => void;
  direction?: 'row' | 'column';
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  activeTextColor?: string;
}

const SelectionToggle = ({
  menu,
  selectedButton,
  setSelectedButton,
  direction = 'row',
  size = 'small',
  activeColor = Colors.lightGrey,
  activeTextColor = Colors.black,
}: SelectionBoxProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: direction,
      alignItems: 'center',
      border: `1px solid ${Colors.borderColor}`,
      borderRadius: '5px',
      overflow: 'auto',
    }}
  >
    {menu.map(({ label, value }, index) => (
      <SelectionToggleItem
        key={value}
        isActive={selectedButton === value}
        activeColor={activeColor}
        activeTextColor={activeTextColor}
        size={size}
        onClick={() => setSelectedButton(value)}
        isLastItem={index === menu.length - 1}
        isFirstChild={index === 0}
      >
        {label}
      </SelectionToggleItem>
    ))}
  </Box>
);

export default SelectionToggle;
