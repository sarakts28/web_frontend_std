import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const NavBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;
