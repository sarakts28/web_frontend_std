import { AccordionSummary, Box, Typography } from '@mui/material';
import {
  breakWords,
  formatElapsedTime,
  generateColor,
  generateRandomId,
} from '../../../../../Utilities/commonFunctions';
import {
  AccordionDetailsContainer,
  AccordionMainContainer,
  NumberBox,
} from '../styles';
import { useDispatch } from 'react-redux';
import { addReportActivity } from '../../../../../Store/Reducer/ReportSlice';

interface GroupItemProps {
  toShow: string;
  groupData: any;
  setSelectionButton: (value: number) => void;
}

const GroupItem = ({
  toShow,
  groupData,
  setSelectionButton,
}: GroupItemProps) => {
  const dispatch = useDispatch();
  const renderContent = (data: any) => {
    let totalTime: string = '0';
    let title: string = '';
    let color = generateColor();
    let totalNumber: number = 0;

    if (data?.subItems?.length > 0) {
      title = breakWords(data?.key);
      totalTime = formatElapsedTime(
        data?.subItems?.reduce((a: any, b: any) => a + b.duration, 0)
      );
      totalNumber = data?.subItems?.length;
      color = generateColor(title + title.slice(0, 2));
    } else {
      title = data[toShow];
      totalTime = formatElapsedTime(data?.duration);
      totalNumber = 1;
      color = generateColor(title + title.slice(0, 2));
    }

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <NumberBox selectedColor={color}>{totalNumber}</NumberBox>
          <Typography>{title}</Typography>
        </Box>
        <Typography>{totalTime}</Typography>
      </Box>
    );
  };

  const handleClickedSubItem = (item: any) => {
    dispatch(addReportActivity(item));
    if (setSelectionButton) setSelectionButton(2);
  };


  return (
    <>
      {groupData.map((data: any) => {
        return (
          <AccordionMainContainer>
            <AccordionSummary>{renderContent(data)}</AccordionSummary>
            {data?.subItems?.map((child: any) => (
              <AccordionDetailsContainer
                onClick={() => handleClickedSubItem(child)}
                key={generateRandomId(5)}
              >
                {renderContent(child)}
              </AccordionDetailsContainer>
            ))}
          </AccordionMainContainer>
        );
      })}
    </>
  );
};

export default GroupItem;
