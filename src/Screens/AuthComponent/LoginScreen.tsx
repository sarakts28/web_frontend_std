import React, { useCallback, useMemo, useState } from 'react';
import { getLoginValidationSchema } from '../../Utilities/FormValidation/loginValidation';
import {
  ButtonWrapper,
  ForgetContainer,
  FormContainer,
  InnerContainer,
  MainContainer,
} from './style';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { CompanyLogo } from '../../Assests/Svg';
import { ButtonField, InputField, VerticalLines } from '../../Components';
import { Colors } from '../../Utilities/Colors';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../Components/Toast';
import { loginApplication } from '../../Store/Thunk/AuthThunk';
import { useThunkDispatch } from '../../Hooks/useThunkDispatch';
import { Fullfiled } from '../../Utilities/ApplicationConstants';
import { Typography } from '@mui/material';
import { GenericStyle } from '../../Utilities/GenericStyle';

const LoginPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const dispatch = useThunkDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = useCallback(() => {
    const validationErrors: any = {};
    const loginValidationSchema = getLoginValidationSchema(t);
    try {
      loginValidationSchema.validateSync(formData, { abortEarly: false });
    } catch (err: any) {
      (err as any).inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
    }
    return validationErrors;
  }, [formData, t]);

  const handleValidationErrors = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidationErrors();
    try {
      const resp = await dispatch(
        loginApplication({ email: formData.email, password: formData.password })
      );

      if (resp?.type?.includes(Fullfiled)) {
        showToast('success', t('loginSuccess'));
        navigate('/dashboard');
      } else {
        showToast('error', t('loginFailed'));
      }
    } catch (error) {
      showToast('error', t('loginFailed'));
    }
  };

  const handleNext = () => {
    const isValidEmail =
      formData.email !== '' && /\S+@\S+\.\S+/.test(formData.email);
    const isEmptyEmail = formData.email === '';
    if (isValidEmail) {
      setShowPasswordField(true);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !isValidEmail
          ? t('invalidEmail')
          : isEmptyEmail
            ? t('emailRequired')
            : '',
      }));
    }
  };

  const passwordVisibilityFunction = useCallback(() => {
    return (
      <div
        onClick={() => setShowPassword(!showPassword)}
        style={{
          cursor: 'pointer',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {showPassword ? (
          <MdOutlineVisibility size={20} />
        ) : (
          <MdOutlineVisibilityOff size={20} />
        )}
      </div>
    );
  }, [showPassword]);

  const isButtonDisbled = useMemo(() => {
    return formData.password.length >= 4 && formData.email.length > 0
      ? false
      : true;
  }, [formData]);

  return (
    <MainContainer>
      <CompanyLogo style={{ width: '300px', height: '300px' }} />
      <InnerContainer>
        <VerticalLines />
        <FormContainer>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {!showPasswordField && (
              <InputField
                label={t('email')}
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                placeholder={t('enterEmail')}
              />
            )}
            {showPasswordField && (
              <>
                <InputField
                  label={t('password')}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('enterPassword')}
                  endAdornment={passwordVisibilityFunction()}
                />
                <ForgetContainer onClick={() => navigate('/forget-password')}>
                  <Typography sx={GenericStyle.font14Regular}>
                    {t('forgetPassword')}?
                  </Typography>
                </ForgetContainer>
              </>
            )}

            <ButtonWrapper>
              {showPasswordField && (
                <ButtonField
                  disabled={isButtonDisbled}
                  type="submit"
                  label={t('login')}
                  backgroundColor={Colors.thirdApplicationColor}
                />
              )}

              <ButtonField
                label={showPasswordField ? t('back') : t('next')}
                onClick={
                  showPasswordField
                    ? () => setShowPasswordField(false)
                    : handleNext
                }
                backgroundColor={Colors.thirdApplicationColor}
              />
            </ButtonWrapper>
          </form>
        </FormContainer>
        <VerticalLines />
      </InnerContainer>
    </MainContainer>
  );
};

export default React.memo(LoginPage);
