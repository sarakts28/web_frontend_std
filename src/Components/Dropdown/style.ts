import styled from '@emotion/styled';
import { Box, FormControl, Paper } from '@mui/material';
import { theme } from '../../Utilities/Colors';

export const LabelContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledPaper = styled(Paper)({
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  height: 'auto',
  maxHeight: '300px',
  overflow: 'auto',
  marginTop: '5px',
});

export const DropDownContainer = styled(FormControl)({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});
