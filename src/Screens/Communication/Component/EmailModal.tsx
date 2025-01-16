import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { ButtonField, InputField, DropDownSelect } from '../../../Components';
import { EmailButtonContainer } from './ComponentStyle';
import { emailTemplates } from '../menuFile';
import { SelectionOption } from '../../../Utilities/TypeDeclaraction';

interface EmailModalProps {
  handleClose: () => void;
  openModal: boolean;
  isCompose: boolean;
  emailData?: any;
}

const EmailModal = ({
  handleClose,
  openModal,
  isCompose,
  emailData,
}: EmailModalProps) => {
  const [emailDetail, setEmailDetail] = useState({
    recipient: '',
    subject: '',
    body: '',
  });

  const handleSubmit = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setEmailDetail({ recipient: '', subject: '', body: '' });
    handleClose();
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
          {isCompose && (
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
            </>
          )}

          <InputField
            label={isCompose || emailData?.type === 'sent' ? 'To' : 'From'}
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
        </form>
      </>
    );
  };

  useEffect(() => {
    if (isCompose) {
      return;
    }
    if (emailData) {
      setEmailDetail({
        recipient: emailData?.SenderName,
        subject: emailData?.Subject,
        body: emailData?.Body,
      });
    }
  }, [emailData]);

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
