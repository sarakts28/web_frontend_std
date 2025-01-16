import { useState } from 'react';
import {
  CallContainer,
  CallButtonContainer,
  NewCallCreateContainer,
  ExpiryTimeOptionContainer,
  NewCallRoomDetailContainer,
} from './style';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MdOutlineVideoCall } from 'react-icons/md';
import { BiCopy } from 'react-icons/bi';
import { IoCall } from 'react-icons/io5';
import { Colors } from '../../Utilities/Colors';
import { useToast } from '../Toast';
import InputField from '../InputField';
import ButtonField from '../ButtonField';
import DropDownSelect from '../Dropdown/Index';

const NewVideoLink = () => {
  const [roomId, setRoomId] = useState<string | null>(
    'https://video-app-8743-9605-dev.twil.io/?passcode=47746087439605'
  );
  const [joinRoomId, setJoinRoomId] = useState<string>(
    'https://video-app-8743-9605-dev.twil.io/?passcode=47746087439605'
  );
  const [, setSelectedExpiryTime] = useState<string | string[]>('3600');

  const { showToast } = useToast();
  const { t } = useTranslation();

  const handleCreateRoom = async () => {
    showToast('error', 'Failed to create room');
  };
  const handleJoinRoom = () => {
    if (!joinRoomId) {
      showToast('error', 'Please enter a valid room ID');
      return;
    }
    const newTab = window.open(joinRoomId, '_blank');
    if (!newTab) {
      showToast(
        'error',
        'Unable to open a new tab. Please check your browser settings.'
      );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        showToast('info', 'Copied to clipboard successfully!');
        setRoomId(text);
      },
      (err) => {
        showToast('error', 'Failed to copy text');
      }
    );
  };

  const ExpiryTimeOptions = [
    { label: '30 minutes', value: '1800' },
    { label: '1 hour', value: '3600' },
    { label: '2 hours', value: '7200' },
    { label: '6 hours', value: '21600' },
    { label: '12 hours', value: '43200' },
    { label: '1 Day', value: '86400' },
    { label: '2 Days', value: '172800' },
  ];

  return (
    <>
      <CallContainer>
        <CallButtonContainer>
          <NewCallCreateContainer>
            <ExpiryTimeOptionContainer>
              <DropDownSelect
                options={ExpiryTimeOptions}
                placeholder="Expiry time"
                variant="outlined"
                onChange={(value: string | string[]) =>
                  setSelectedExpiryTime(value)
                }
                autoWidth={false}
              />
            </ExpiryTimeOptionContainer>
            <ButtonField
              label={t('createNewRoom')}
              variant="contained"
              backgroundColor={Colors.applicationColor}
              textColor={Colors.white}
              startIcon={<MdOutlineVideoCall fontSize={20} />}
              onClick={handleCreateRoom}
            />
          </NewCallCreateContainer>
          {roomId && (
            <NewCallRoomDetailContainer>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '10px',
                  wordBreak: 'break-all',
                }}
              >
                {roomId}
              </Typography>
              <BiCopy fontSize={20} onClick={() => copyToClipboard(roomId)} />
            </NewCallRoomDetailContainer>
          )}

          <NewCallCreateContainer>
            <ExpiryTimeOptionContainer>
              <InputField
                placeholder="Enter room id"
                onChange={(e: any) => setJoinRoomId(e.target.value)}
                value={joinRoomId}
              />
            </ExpiryTimeOptionContainer>
            <ButtonField
              label={t('joinCall')}
              variant="contained"
              backgroundColor={Colors.darkOrgane}
              textColor={Colors.white}
              startIcon={<IoCall fontSize={20} />}
              onClick={handleJoinRoom}
            />
          </NewCallCreateContainer>
        </CallButtonContainer>
      </CallContainer>
    </>
  );
};

export default NewVideoLink;
