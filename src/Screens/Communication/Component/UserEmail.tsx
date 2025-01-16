import { useEffect, useState } from 'react';
import { ButtonField, SelectionToggle } from '../../../Components';
import { UserEmailSelectionContainer } from './ComponentStyle';
import { Colors } from '../../../Utilities/Colors';
import { useTranslation } from 'react-i18next';
import {
  dummyEmailData,
  dummyEmailDataType,
  toggleEmailMenu,
} from '../menuFile';
import { IoPencil } from 'react-icons/io5';
import EmailCard from './EmailCard';
import { Box, useMediaQuery } from '@mui/material';
import EmailModal from './EmailModal';

const UserEmail = () => {
  const [toggle, setToggle] = useState<number | string>(1);
  const [composeModal, setComposeModal] = useState<boolean>(false);
  const smallScreen = useMediaQuery('(max-width: 550px)');
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  const [emailData, setEmailData] =
    useState<dummyEmailDataType[]>(dummyEmailData);

  const { t } = useTranslation();

  useEffect(() => {
    const filterData = dummyEmailData.filter((item: dummyEmailDataType) => {
      return (
        (item.type === 'inbox' && toggle === 1) ||
        (item.type === 'sent' && toggle === 2) ||
        (item.type === 'spam' && toggle === 3)
      );
    });

    setEmailData(filterData);
  }, [toggle]);
  return (
    <>
      <Box>
        <UserEmailSelectionContainer>
          <SelectionToggle
            menu={toggleEmailMenu(t)}
            selectedButton={toggle}
            setSelectedButton={setToggle}
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
        <Box sx={{ mt: 2, width: 'auto' }}>
          {emailData &&
            emailData.map((item: dummyEmailDataType, index: any) => (
              <EmailCard
                key={index}
                email={item}
                emailData={emailData}
                setEmailData={setEmailData}
              />
            ))}
        </Box>

        <EmailModal
          handleClose={() => setComposeModal(false)}
          openModal={composeModal}
          isCompose={true}
        />
      </Box>
    </>
  );
};

export default UserEmail;
