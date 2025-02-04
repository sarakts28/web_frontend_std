import {
  EmailCardContainer,
  EmailCardNameContainer,
  EmailCardSubjectContainer,
} from './ComponentStyle';
import { EmailDataType } from '../menuFile';
import { RxStarFilled } from 'react-icons/rx';
import { MdStarOutline } from 'react-icons/md';
import { Box, Typography } from '@mui/material';
import EmailModal from './EmailModal';
import { useEffect, useMemo, useState } from 'react';
import { GenericStyle } from '../../../Utilities/GenericStyle';

interface EmailCardProps {
  email: EmailDataType;
  emailData: EmailDataType[];
  setEmailData: React.Dispatch<React.SetStateAction<EmailDataType[]>>;
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

  const senderName = useMemo(() => {
    return email?.from?.split('<')[0];
  }, [email]);

  const sendingDate = useMemo(() => {
    const date = new Date(email?.date);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  }, [email]);

  const isEmailFavorite = useMemo(() => {
    return email.labelIds.includes('STARRED') ? true : false;
  }, [email]);

  const subject = useMemo(() => {
    if (!email?.subject) {
      return 'No Subject';
    }

    return email?.subject?.length > subjectLength
      ? `${email?.subject.slice(0, subjectLength)}...`
      : email?.subject;
  }, [email?.subject, subjectLength]);

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
            {isEmailFavorite ? (
              <RxStarFilled color="#FFC107" size={14} />
            ) : (
              <MdStarOutline size={14} />
            )}
          </Box>
          <Typography>{senderName}</Typography>
        </EmailCardNameContainer>
        <EmailCardSubjectContainer>{subject}</EmailCardSubjectContainer>
        <Typography sx={{ ...GenericStyle.font14Regular }}>
          {sendingDate}
        </Typography>
      </EmailCardContainer>
      {openModal && (
        <EmailModal
          handleClose={() => setOpenModal(false)}
          openModal={openModal}
          isCompose={
            email.labelIds.some((label) => label === 'DRAFT') ? true : false
          }
          isDraft={
            email.labelIds.some((label) => label === 'DRAFT') ? true : false
          }
          emailData={email}
        />
      )}
    </>
  );
};

export default EmailCard;
