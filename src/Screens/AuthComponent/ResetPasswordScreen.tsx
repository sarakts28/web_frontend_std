import React, { useState, useMemo } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { InputField, ButtonField } from '../../Components';
import {
  MainContainer,
  InnerContainer,
  FormContainer,
  ButtonWrapper,
} from './style';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../Utilities/Colors';
import { useToast } from '../../Components/Toast';
import { useNavigate } from 'react-router-dom';
import { CompanyLogo } from '../../Assests/Svg';

const PasswordVisibilityToggle = ({ isVisible, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: 'pointer',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {isVisible ? (
      <MdOutlineVisibility size={20} />
    ) : (
      <MdOutlineVisibilityOff size={20} />
    )}
  </div>
);

const ResetPasswordScreen = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 4) {
      setErrors({
        ...errors,
        password: 'Password must be at least 4 characters',
      });
      return;
    }

    if (formData.confirmPassword.length < 4) {
      setErrors({
        ...errors,
        confirmPassword: 'Password must be at least 4 characters',
      });
      return;
    }

    showToast('success', 'Password reset successfully');
    // Handle form submission

    navigate('/login');
  };

  const isButtonDisabled = useMemo(() => {
    return formData.password.length >= 4 &&
      formData.confirmPassword.length >= 4 &&
      formData.password === formData.confirmPassword
      ? false
      : true;
  }, [formData]);

  return (
    <MainContainer>
      <CompanyLogo style={{ width: '300px', height: '300px' }} />
      <InnerContainer>
        <FormContainer>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <InputField
              label={t('password')}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('enterPassword')}
              endAdornment={
                <PasswordVisibilityToggle
                  isVisible={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
            />
            <InputField
              label={t('confirmPassword')}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('enterConfirmPassword')}
              endAdornment={
                <PasswordVisibilityToggle
                  isVisible={showConfirmPassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            <ButtonWrapper>
              <ButtonField
                disabled={isButtonDisabled}
                type="submit"
                label={t('resetPassword')}
                backgroundColor={Colors.thirdApplicationColor}
              />
            </ButtonWrapper>
          </form>
        </FormContainer>
      </InnerContainer>
    </MainContainer>
  );
};

export default ResetPasswordScreen;
