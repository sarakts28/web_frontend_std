import React, { useMemo, useState } from 'react';
import { ButtonField, InputField } from '../../Components';
import { useNavigate } from 'react-router-dom';
// import { useThunkDispatch } from '../../Hooks/useThunkDispatch';
// import { forgetPassword } from '../../Store/Thunk/AuthThunk';
import {
  ButtonWrapper,
  ForgetContainer,
  FormContainer,
  InnerContainer,
  MainContainer,
} from './style';
import { GenericStyle } from '../../Utilities/GenericStyle';
import { CompanyLogo } from '../../Assests/Svg';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../Components/Toast';

const ForgetScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleForgetPassword = async () => {
    setLoading(true);
    // const response = await thunkDispatch(forgetPassword({ email }));
    setLoading(false);
    showToast('success', 'Password OPT code sent to your email');
    // if (response?.status === 200) {
    //   setMessage('Password reset link sent to your email');
    // } else {
    //   setMessage('Something went wrong');
    // }
    navigate('/optCode');
  };

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }, [email]);

  return (
    <MainContainer>
      <CompanyLogo style={{ width: '200px', height: '200px' }} />
      <InnerContainer>
        <FormContainer>
          <Box sx={GenericStyle.flexRowCompleteCenter}>
            <Typography
              sx={{
                marginBottom: GenericStyle.primary_margin,
                ...GenericStyle.font18Bold,
              }}
            >
              {t('forgetPassword')}?
            </Typography>
          </Box>

          <InputField
            type="email"
            label="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <ForgetContainer onClick={() => navigate('/login')}>
            <Typography sx={GenericStyle.font14Regular}>
              {t('backToLogin')}?
            </Typography>
          </ForgetContainer>

          <Typography
            sx={
              (GenericStyle.font14Bold,
              { marginTop: '12px', marginBottom: '20px', textAlign: 'justify' })
            }
          >
            {t('resetPasswordStatment')}
          </Typography>
          <ButtonWrapper>
            <ButtonField
              disabled={!isEmailValid}
              label="Send OTP"
              onClick={handleForgetPassword}
              variant="contained"
              isLoading={loading}
            />
          </ButtonWrapper>
        </FormContainer>
      </InnerContainer>
    </MainContainer>
  );
};

export default ForgetScreen;
