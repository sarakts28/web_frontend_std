import { Box } from '@mui/material';
import { AvatarComponent } from '../../../Components';
import {
  ChatCardContainer,
  ChatCardElements,
  ChatCardElementsTime,
} from './ComponentStyle';

const ChatCard = ({ messageItem }: any) => {
  return (
    <ChatCardContainer type={messageItem.sender === 'self' ? true : false}>
      <Box>
        <ChatCardElements>{messageItem.content}</ChatCardElements>
        <ChatCardElementsTime
          type={messageItem.sender === 'self' ? true : false}
        >
          {messageItem.time.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </ChatCardElementsTime>
      </Box>
      <AvatarComponent size="small" name={messageItem.sender} />
    </ChatCardContainer>
  );
};

export default ChatCard;
