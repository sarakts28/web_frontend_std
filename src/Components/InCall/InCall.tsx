import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import ButtonField from '../ButtonField';
import { FcEndCall } from 'react-icons/fc';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { Waves, WavesContainer } from './style';
import { GenericStyle } from '../../Utilities/GenericStyle';

interface InCallProps {
  setIsCallConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const InCall = ({ setIsCallConnected }: InCallProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const endCall = () => {
    setIsCallConnected(false);
  };

  return (
    <>
      <Typography sx={(GenericStyle.font16Regular, { marginY: '10px' })}>
        {formatTime(seconds)}
      </Typography>
      <WavesContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          mb: 4,
        }}
      >
        {['0s', '0.2s', '0.4s', '0.6s', '0.8s', '1s'].map((delay, index) => (
          <Waves key={index} delay={delay} />
        ))}
      </WavesContainer>
      <WavesContainer>
        <ButtonField
          label={<FcEndCall fontSize={32} style={{ marginTop: '5px' }} />}
          onClick={endCall}
          backgroundColor="transparent"
        />
        <ButtonField
          label={isMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}
          labelStyle={{ color: isMuted ? '#ffcc00' : '#ff4d4f', fontSize: 24 }}
          onClick={() => setIsMuted(!isMuted)}
          backgroundColor="transparent"
        />
      </WavesContainer>
    </>
  );
};

export default InCall;
