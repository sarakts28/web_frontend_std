import { CircularProgress, Stack } from '@mui/material';

interface SpinnerProps {
  size: number | string;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <Stack
      sx={{ height: '80vh' }}
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={size} color="primary" />
    </Stack>
  );
};

export default Spinner;
