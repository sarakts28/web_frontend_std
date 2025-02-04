import { Box } from '@mui/material';
import React from 'react';
import ChatCard from './ChatCard';
import { ChatContainer, TypingChatBox } from './ComponentStyle';
import { EmptyComponent, InputField } from '../../../Components';
import { BiSend } from 'react-icons/bi';
import { useCommunication } from '../../../Hooks/useCommunication';

const UserChat = () => {
  const { currentCustomer, handleSendSms, smsText, setSmsText } =
    useCommunication();

  return (
    <>
      {currentCustomer === null ? (
        <EmptyComponent text="noChatSelected" />
      ) : (
        <ChatContainer>
          <Box sx={{ overflowY: 'scroll', height: '75vh', padding: '5px' }}>
            {currentCustomer &&
              currentCustomer.messages &&
              currentCustomer?.messages.map((messageItem: any) => {
                return <ChatCard messageItem={messageItem} />;
              })}
          </Box>

          <TypingChatBox>
            <InputField
              name="message"
              placeholder="typing..."
              value={smsText}
              onChange={(e: any) => setSmsText(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  handleSendSms();
                }
              }}
              endAdornment={
                <BiSend
                  onClick={() => handleSendSms()}
                  style={{ cursor: 'pointer' }}
                />
              }
            />
          </TypingChatBox>
        </ChatContainer>
      )}
    </>
  );
};

export default UserChat;
