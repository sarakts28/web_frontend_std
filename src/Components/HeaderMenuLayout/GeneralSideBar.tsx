//component use if need to have a back button
import React from 'react';
import TranslationButton from '../TranslationButton';
import {
  AppbarContainer,
  GenenalAppbarTitle,
  GeneralAppbarContainer,
} from './styled';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface GeneralSideBaProps {
  pageName: string;
}

const GeneralSideBar: React.FC<GeneralSideBaProps> = ({ pageName }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AppbarContainer sx={{ position: 'fixed' }}>
      <GeneralAppbarContainer>
        <GenenalAppbarTitle>
          <IoArrowBack onClick={handleBackClick} />
          {pageName}
        </GenenalAppbarTitle>
        <TranslationButton />
      </GeneralAppbarContainer>
    </AppbarContainer>
  );
};

export default GeneralSideBar;
