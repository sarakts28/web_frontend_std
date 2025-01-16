import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import ChatCard from './ChatCard';
import { ChatContainer, TypingChatBox } from './ComponentStyle';
import { InputField } from '../../../Components';
import { BiSend } from 'react-icons/bi';

interface UserChatProps {
  userData: any;
  setData: any;
  data: any;
}
const UserChat = ({ userData, setData, data }: UserChatProps) => {
  const [text, setText] = useState('');

  const handleSendItem = () => {
    if (!text) return;

    const currentUser = data.find((item: any) => item.id === userData.id);

    if (!currentUser) return;

    const message = {
      content: text,
      sender: text.length % 2 === 0 ? 'self' : 'user',
      time: new Date(),
    };

    setData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === userData.id) {
          return {
            ...item,
            messages: [...item.messages, message],
          };
        }
        return item;
      });
    });

    setText('');
  };

  return (
    <ChatContainer>
      <Box sx={{ overflowY: 'scroll', height: '75vh', padding: '5px' }}>
        {userData &&
          userData.messages &&
          userData?.messages.map((messageItem: any) => {
            return <ChatCard messageItem={messageItem} />;
          })}
      </Box>

      <TypingChatBox>
        <InputField
          name="message"
          placeholder="typing..."
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              handleSendItem();
            }
          }}
          endAdornment={
            <BiSend onClick={handleSendItem} style={{ cursor: 'pointer' }} />
          }
        />
      </TypingChatBox>
    </ChatContainer>
  );
};

export default UserChat;
