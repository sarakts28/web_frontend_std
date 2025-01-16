import { Box, useMediaQuery } from '@mui/material';
import { Colors, theme } from '../../Utilities/Colors';
import { useTranslation } from 'react-i18next';
import DropDownSelect from '../Dropdown/Index';

const TranslationButton = () => {
  const { i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const changeLanguage = (value: any) => {
    i18n.changeLanguage(value);
  };

  const languageOptions = [
    { value: 'en', label: 'Eng', icon: '🇬🇧' },
    { value: 'da', label: 'Dan', icon: '🇩🇰' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        backgroundColor: Colors.white,
        m: 1,
      }}
    >
      <DropDownSelect
        options={languageOptions}
        placeholder="Language"
        onChange={(value: any) => changeLanguage(value)}
        defaultValue={i18n.language}
        valueAsIcon={true}
        height={isMobile ? 32 : 44}
      />
    </Box>
  );
};

export default TranslationButton;
