import {
  EmailCardContainer,
  EmailCardNameContainer,
  EmailCardSubjectContainer,
} from './ComponentStyle';
import { DummyEmailDataType } from '../menuFile';
import { RxStarFilled } from 'react-icons/rx';
import { MdStarOutline } from 'react-icons/md';
import { Box, Typography } from '@mui/material';
import EmailModal from './EmailModal';
import { useEffect, useState } from 'react';

interface EmailCardProps {
  email: DummyEmailDataType;
  emailData: DummyEmailDataType[];
  setEmailData: React.Dispatch<React.SetStateAction<DummyEmailDataType[]>>;
}

const EmailCard = ({ email, setEmailData, emailData }: EmailCardProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [subjectLength, setSubjectLength] = useState(100);
  const onHandleFav = () => {
    const emailIndex = emailData.findIndex((item) => item.id === email?.id);

    if (emailIndex !== -1) {
      const updatedEmail = { ...email, isFav: !email?.isFav };

      const updatedEmailData = [
        ...emailData.slice(0, emailIndex),
        updatedEmail,
        ...emailData.slice(emailIndex + 1),
      ];

      setEmailData(updatedEmailData);
    }
  };

  const updateSubjectLength = () => {
    const width = window.innerWidth;

    if (width <= 600) {
      setSubjectLength(40);
    } else if (width <= 960) {
      setSubjectLength(45);
    } else if (width <= 1600) {
      setSubjectLength(60);
    } else if (width <= 2000) {
      setSubjectLength(80);
    } else {
      setSubjectLength(100);
    }
  };

  useEffect(() => {
    updateSubjectLength();
    window.addEventListener('resize', updateSubjectLength);
    return () => window.removeEventListener('resize', updateSubjectLength);
  }, []);

  const userName = email?.SenderName?.split(' ')[0];
  const subject =
    email?.Subject?.length > subjectLength
      ? `${email?.Subject.slice(0, subjectLength)}...`
      : email?.Subject;

  return (
    <>
      <EmailCardContainer onClick={() => setOpenModal(true)}>
        <EmailCardNameContainer>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              onHandleFav();
            }}
          >
            {email?.isFav ? (
              <RxStarFilled color="#FFC107" size={14} />
            ) : (
              <MdStarOutline size={14} />
            )}
          </Box>
          <Typography>{userName}</Typography>
        </EmailCardNameContainer>
        <EmailCardSubjectContainer>{subject}</EmailCardSubjectContainer>
        <Typography>{email?.time}</Typography>
      </EmailCardContainer>

      <EmailModal
        handleClose={() => setOpenModal(false)}
        openModal={openModal}
        isCompose={false}
        emailData={email}
      />
    </>
  );
};

export default EmailCard;
