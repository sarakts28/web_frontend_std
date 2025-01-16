import { Box } from '@mui/material';
import { WeeklyDateTypography } from '../styles';

interface WeelyDurationProps {
  weekArrayItem: { id: number; day: string }[];
}
const WeeklyDuration = ({ weekArrayItem }: WeelyDurationProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {weekArrayItem.map((item) => {
        return (
          <WeeklyDateTypography key={item.id} itemId={item.id}>
            {`${item.day}`}
          </WeeklyDateTypography>
        );
      })}
    </Box>
  );
};

export default WeeklyDuration;
