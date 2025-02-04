import { useState } from 'react';
import {
  ButtonField,
  GoogleButton,
  PageNavigation,
  SelectionToggle,
  Spinner,
} from '../../../Components';
import {
  UserEmailSelectionContainer,
  EmailNavigationContainer,
} from './ComponentStyle';
import { Colors } from '../../../Utilities/Colors';
import { useTranslation } from 'react-i18next';
import { EmailDataType, toggleEmailMenu } from '../menuFile';
import { IoPencil } from 'react-icons/io5';
import EmailCard from './EmailCard';
import { Box, Typography, useMediaQuery } from '@mui/material';
import EmailModal from './EmailModal';
import { useCommunication } from '../../../Hooks/useCommunication';

const UserEmail = () => {
  const [composeModal, setComposeModal] = useState<boolean>(false);
  const smallScreen = useMediaQuery('(max-width: 550px)');
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  const {
    listEmail,
    totalEmails,
    currentEmailPage,
    setCurrentEmailPage,
    isEmailLoading: isLoading,
    emailToggle,
    setEmailToggle,
  } = useCommunication();

  const [emailData, setEmailData] = useState<EmailDataType[]>(listEmail);

  const { t } = useTranslation();

  if (isLoading) {
    return <Spinner size={40} />;
  }

  return (
    <>
      {listEmail.length >= 0 ? (
        <Box>
          <UserEmailSelectionContainer>
            <SelectionToggle
              menu={toggleEmailMenu(t)}
              selectedButton={emailToggle}
              setSelectedButton={setEmailToggle}
              direction="row"
              size={smallScreen ? 'small' : largeScreen ? 'large' : 'medium'}
              activeColor={Colors.darkOrgane}
              activeTextColor={Colors.white}
            />
            <ButtonField
              label={t('Compose')}
              variant="contained"
              backgroundColor={Colors.darkOrgane}
              textColor={Colors.white}
              startIcon={<IoPencil />}
              onClick={() => setComposeModal(true)}
              height={smallScreen ? 30 : 40}
            />
          </UserEmailSelectionContainer>
          <EmailNavigationContainer>
            <Box
              sx={{
                mt: 2,
                width: '100%',
                height: '65vh',
                overflow: 'auto',
              }}
            >
              {listEmail.length > 0 ? (
                listEmail.map((item: EmailDataType, index: any) => (
                  <EmailCard
                    key={index}
                    email={item}
                    emailData={emailData}
                    setEmailData={setEmailData}
                  />
                ))
              ) : (
                <Typography sx={{ textAlign: 'center' }}>
                  {t('noEmailFound')}
                </Typography>
              )}
            </Box>
            {listEmail.length > 0 && (
              <PageNavigation
                currentPage={currentEmailPage}
                totalElements={totalEmails}
                setCurrentPage={setCurrentEmailPage}
                showRowsPerPage={false}
              />
            )}
          </EmailNavigationContainer>
          <EmailModal
            handleClose={() => setComposeModal(false)}
            openModal={composeModal}
            isCompose={true}
          />
        </Box>
      ) : (
        <GoogleButton />
      )}
    </>
  );
};

export default UserEmail;
