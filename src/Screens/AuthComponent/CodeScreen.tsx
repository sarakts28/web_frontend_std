import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { InputField, ButtonField } from '../../Components';
import { InnerContainer, MainContainer } from './style';
import { CompanyLogo } from '../../Assests/Svg';
import { GenericStyle } from '../../Utilities/GenericStyle';
import { Colors } from '../../Utilities/Colors';
import { useToast } from '../../Components/Toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CodeScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(15);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];
    const value = e.target.value;

    if (value.length === 1) {
      newCode[index] = value;
      setCode(newCode);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0) {
      newCode[index] = '';
      setCode(newCode);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleVerifyCode = () => {
    // const enteredCode = code.join('');

    showToast('success', 'Code Verified');
    navigate('/resetPassword');
  };

  const isCodeComplete = code.every((char) => char.length === 1);

  return (
    <MainContainer>
      <CompanyLogo style={{ width: '200px', height: '200px' }} />
      <InnerContainer>
        <Typography sx={GenericStyle.font18Bold}>
          {t('enterVerificationCode')}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          {code.map((char, index) => (
            <Box key={`code-box-${index}`}>
              <InputField
                value={char}
                onChange={(e: any) => handleChange(e, index)}
                ref={(ref) => {
                  if (ref) {
                    inputRefs.current[index] = ref;
                  }
                }}
                key={`code-input-${index}`}
                maxlength={1}
                sx={{
                  fontSize: '25px', // Overrides the default font-size
                  textAlign: 'center',
                }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={GenericStyle.flexRowCompleteCenter} gap={0.5}>
          <Typography sx={GenericStyle.font16Medium}>
            {timeLeft === 0
              ? t('codeExpired')
              : `${t('codeExpires')}: ${formatTime(timeLeft)}`}
          </Typography>
          {timeLeft === 0 && (
            <ButtonField
              label={t('resendCode')}
              onClick={() => setTimeLeft(15)}
              variant="text"
              sx={{
                fontSize: '14px',
                height: 'auto',
                backgroundColor: 'transparent',
                color: Colors.littleBlue,
              }}
            />
          )}
        </Box>
        <ButtonField
          label={t('verify')}
          onClick={handleVerifyCode}
          variant="contained"
          disabled={!isCodeComplete}
        />
      </InnerContainer>
    </MainContainer>
  );
};

export default CodeScreen;
