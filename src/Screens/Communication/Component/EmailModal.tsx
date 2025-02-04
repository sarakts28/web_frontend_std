import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { ButtonField, InputField, DropDownSelect } from '../../../Components';
import { EmailButtonContainer } from './ComponentStyle';
import { EmailDataType, emailTemplates } from '../menuFile';
import { SelectionOption } from '../../../Utilities/TypeDeclaraction';
import { GenericStyle } from '../../../Utilities/GenericStyle';
import { EmailSenderModalField } from './ComponentStyle';

interface EmailModalProps {
  handleClose: () => void;
  openModal: boolean;
  isCompose: boolean;
  emailData?: EmailDataType;
  isDraft?: boolean;
}

const EmailModal = ({
  handleClose,
  openModal,
  isCompose,
  emailData,
  isDraft = false,
}: EmailModalProps) => {
  const [emailDetail, setEmailDetail] = useState({
    recipient: '',
    subject: '',
    body: '',
  });

  const handleCloseModal = () => {
    setEmailDetail({ recipient: '', subject: '', body: '' });
    handleClose();
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  const handleChange = (e: any) => {
    setEmailDetail({
      ...emailDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string[] | string) => {
    const selectedTemplate: SelectionOption | undefined = emailTemplates.find(
      (item: any) => item.value === value
    );

    if (!selectedTemplate) {
      return;
    }

    setEmailDetail({
      ...emailDetail,
      subject: selectedTemplate?.label,
      body: selectedTemplate?.value,
    });
  };

  const renderEmailDetail = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}
        >
          {isCompose ? (
            <>
              <Typography>
                You can select email template. To make your email more
                personalized
              </Typography>
              <DropDownSelect
                placeholder="Select Email Template"
                options={emailTemplates}
                onChange={handleSelectChange}
              />

              <InputField
                label={'Recipient'}
                value={emailDetail.recipient}
                onChange={isCompose ? handleChange : () => {}}
                name="recipient"
                placeholder="Enter Sender Name"
              />
              <InputField
                label={'Subject'}
                value={emailDetail.subject}
                onChange={isCompose ? handleChange : () => {}}
                name="subject"
                placeholder="Enter Subject"
              />
              <InputField
                label="Body"
                value={emailDetail.body}
                onChange={isCompose ? handleChange : () => {}}
                multiline
                rows={6}
                name="body"
                placeholder="Enter Body"
              />
            </>
          ) : (
            <>
              <Box>
                <Typography sx={{ ...GenericStyle.font16Bold, mb: 1 }}>
                  Sender
                </Typography>
                <EmailSenderModalField>
                  {emailDetail.recipient}
                </EmailSenderModalField>
              </Box>
              <Box>
                <Typography sx={{ ...GenericStyle.font16Bold, mb: 1 }}>
                  Subject
                </Typography>
                <EmailSenderModalField>
                  {emailDetail.subject}
                </EmailSenderModalField>
              </Box>

              <Box>
                <Typography sx={{ ...GenericStyle.font16Bold, mb: 1 }}>
                  Email Body
                </Typography>
                <Box sx={{ overflow: 'auto', maxHeight: '50vh' }}>
                  <Box dangerouslySetInnerHTML={{ __html: emailDetail.body }} />
                </Box>
              </Box>
            </>
          )}
        </form>
      </>
    );
  };

  useEffect(() => {
    if (isCompose && !isDraft) {
      return;
    }

    if (emailData) {
      const extractFormattedTextFromHTML = (html: string) => {
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = html;

        // Convert <br> and block elements into new lines
        tempDiv.querySelectorAll('br').forEach((br) => (br.outerHTML = '\n'));
        tempDiv
          .querySelectorAll('p, div')
          .forEach(
            (el) => (el.outerHTML = (el as HTMLElement).innerText + '\n\n')
          );

        return tempDiv.innerText.trim(); // innerText preserves some formatting
      };

      setEmailDetail({
        recipient: emailData.labelIds.includes('SENT')
          ? 'Need to update this from API'
          : emailData?.from,
        subject: emailData?.subject,
        body: isDraft
          ? extractFormattedTextFromHTML(emailData?.body)
          : emailData?.body, // Extract plain text
      });
    }
  }, [emailData, isCompose, isDraft]);

  return (
    <div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '600px' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isCompose ? 'Compose Email' : 'Email Details'}
          </Typography>
          {renderEmailDetail()}
          <EmailButtonContainer>
            <ButtonField
              label={isCompose ? 'Send' : 'Close'}
              type={isCompose ? 'submit' : 'button'}
              onClick={isCompose ? handleSubmit : handleClose}
            />
          </EmailButtonContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default EmailModal;
