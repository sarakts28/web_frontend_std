import React, { useCallback, useState } from 'react';
import { DailContainer, DailMainContainer, PhoneInputFieldBox } from './style';
import ButtonField from '../ButtonField';
import InputField from '../InputField';
import { Box } from '@mui/material';
import { MdBackspace } from 'react-icons/md';
import { Colors } from '../../Utilities/Colors';
import { useTranslation } from 'react-i18next';
import { useToast } from '../Toast';

export const buttons = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '#',
  '0',
  '+',
  'Clear',
];

interface DialingPadProps {
  setIsCallConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialingPad = ({ setIsCallConnected }: DialingPadProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { showToast } = useToast();
  const isSmallScreen = window.innerWidth <= 600;
  const isDesktop = window.innerWidth > 1500;

  const { t } = useTranslation();

  const handleButtonClick = useCallback(
    (value: string) => {
      if (value === 'Clear') {
        setInputValue('');
      } else if (value === '+') {
        if (inputValue === '') {
          setInputValue((prev) => prev + value);
        }
      } else if (/^[0-9*]$/.test(value)) {
        setInputValue((prev) => prev + value);
      }
    },
    [inputValue]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoinCall();
    }
  };

  const handleJoinCall = () => {
    if (inputValue.length >= 10) {
      showToast('success', 'Call joined successfully');
      setIsCallConnected(true);
    } else showToast('warning', 'Please enter a valid number');
  };

  const renderButton = useCallback(
    (value: string) => (
      <ButtonField
        key={value}
        label={
          value === 'Clear' ? (
            <MdBackspace style={{ marginTop: '8px' }} />
          ) : (
            value
          )
        }
        onClick={() => handleButtonClick(value)}
        width={isSmallScreen ? '20px' : isDesktop ? '60px' : ''}
        minWidth={isSmallScreen ? '20px' : isDesktop ? '80px' : ''}
        height={isSmallScreen ? '30px' : isDesktop ? '80px' : ''}
        labelStyle={
          isDesktop
            ? { fontSize: '32px', color: Colors.black }
            : { color: Colors.black }
        }
        backgroundColor={Colors.white}
      />
    ),
    [isDesktop, isSmallScreen, handleButtonClick]
  );

  return (
    <DailMainContainer>
      <PhoneInputFieldBox>
        <InputField
          name="phone"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Phone number"
          type="number"
        />
      </PhoneInputFieldBox>
      <DailContainer>
        {buttons.map(renderButton)}

        <Box
          sx={{
            display: 'grid',
            gridColumn: 'span 2',
          }}
        >
          <ButtonField
            label={t('call')}
            onClick={handleJoinCall}
            height={isSmallScreen ? '30px' : isDesktop ? '80px' : ''}
            labelStyle={isDesktop ? { fontSize: '32px' } : {}}
          />
        </Box>
      </DailContainer>
    </DailMainContainer>
  );
};

export default DialingPad;
