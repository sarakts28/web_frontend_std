import { createTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';

export const Colors = {
  black: '#000000',
  white: '#ffffff',
  milkWhite: '#FEFDFB',
  littleGrey: '#D3D3D3',
  grey: '#c6d2d9',
  lightGrey: '#e4eaee',
  borderColor: '#E0E0E0',
  darkGrey: '#666666',
  applicationColor: '#203B21',
  secondaryApplicationColor: '#67573B',
  thirdApplicationColor: '#477948',
  sagaGreen: '#A3B4A2',
  darkOrgane: '#F1593A',
  red: '#d32f2f',
  littleBlue: '#63a4ff',
  green500: green[500],
  blue500: blue[500],
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#203B21', // Dark Green
      light: '#63a4ff', // Light blue
      dark: '#004ba0', // Dark blue
      contrastText: '#fff', // Text color for contrast
    },
    secondary: {
      main: '#d32f2f', // Red
      light: '#ff6659',
      dark: '#9a0007',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
    action: {
      hover: `${Colors.borderColor}`,
      disabled: '#ccc',
      disabledBackground: '#f5f5f5',
    },
  },
});
