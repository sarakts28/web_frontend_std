import { useState } from 'react';
import {
  CallContainer,
  NewCallCardContainer,
  CallButtonContainer,
} from './ComponentStyle';
import { NewVideoLink, DialingPad, InCall } from '../../../Components';

interface UserNewCallProps {
  callModal: boolean;
}

const UserNewCall = ({ callModal }: UserNewCallProps) => {
  const [isCallConnected, setIsCallConnected] = useState(false);

  return (
    <>
      <CallContainer>
        <NewCallCardContainer>Need to give a message</NewCallCardContainer>
        {callModal ? (
          <>
            <CallButtonContainer>
              {isCallConnected ? (
                <>
                  <InCall setIsCallConnected={setIsCallConnected} />
                </>
              ) : (
                <DialingPad setIsCallConnected={setIsCallConnected} />
              )}
            </CallButtonContainer>
          </>
        ) : (
          <NewVideoLink />
        )}
      </CallContainer>
    </>
  );
};

export default UserNewCall;
