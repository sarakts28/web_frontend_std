import React, { useState } from 'react';
import {
  CallDetailCardContainer,
  ChatContainer,
  UserEmailSelectionContainer,
} from './ComponentStyle';
import { Box, Typography, useMediaQuery } from '@mui/material';
import {
  HiPhoneMissedCall,
  HiPhoneIncoming,
  HiPhoneOutgoing,
} from 'react-icons/hi';
import {
  formatDateTime,
  generateRandomId,
} from '../../../Utilities/commonFunctions';
import { Colors } from '../../../Utilities/Colors';
import { GenericStyle } from '../../../Utilities/GenericStyle';
import { SelectionToggle } from '../../../Components';
import { toggleCallMenu } from '../menuFile';
import { useTranslation } from 'react-i18next';
import UserNewCall from './UserNewCall';

interface UserCallDetailsProps {
  userData: any;
}

const renderCallDetailCard = (item: any) => {
  return (
    <CallDetailCardContainer type={true} key={generateRandomId(5)}>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {item.type === 'incoming' ? (
          <>
            <HiPhoneIncoming color={Colors.green500} />
            <Typography sx={{ fontWeight: 'bold', color: Colors.green500 }}>
              Recevie Inivation
            </Typography>
          </>
        ) : item.type === 'outgoing' ? (
          <>
            <HiPhoneOutgoing color={Colors.blue500} />
            <Typography sx={{ fontWeight: 'bold', color: Colors.blue500 }}>
              Send Inivation
            </Typography>
          </>
        ) : (
          <>
            <HiPhoneMissedCall color={Colors.red} />
            <Typography sx={{ fontWeight: 'bold', color: Colors.red }}>
              Missed Call
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography style={GenericStyle.font14Regular}>
          Invitation Send by:{' '}
          <span style={GenericStyle.font18Bold}> {item.inviationSenderId}</span>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography style={GenericStyle.font14Regular}>
          Invitation Room Id:{' '}
          <span style={GenericStyle.font18Bold}> {item.roomId}</span>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography style={GenericStyle.font14Regular}>
          Invitation Date and time:{' '}
          <span style={GenericStyle.font18Bold}>
            {formatDateTime(item?.inviationTime)}
          </span>
        </Typography>
      </Box>
    </CallDetailCardContainer>
  );
};

const UserCallDetails: React.FC<UserCallDetailsProps> = ({ userData }) => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState<number | string>(0);
  const smallScreen = useMediaQuery('(max-width: 550px)');
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  return (
    <>
      <UserEmailSelectionContainer>
        <SelectionToggle
          menu={toggleCallMenu(t)}
          selectedButton={toggle}
          setSelectedButton={setToggle}
          direction="row"
          size={smallScreen ? 'small' : largeScreen ? 'large' : 'medium'}
          activeColor={Colors.darkOrgane}
          activeTextColor={Colors.white}
        />
      </UserEmailSelectionContainer>
      <Box>
        {toggle === 1 ? (
          <UserNewCall callModal={true} />
        ) : toggle === 2 ? (
          <UserNewCall callModal={false} />
        ) : (
          <ChatContainer>
            {userData?.calls?.map((item: any) => renderCallDetailCard(item))}
          </ChatContainer>
        )}
      </Box>
    </>
  );
};

export default UserCallDetails;
