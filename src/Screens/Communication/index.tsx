import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import UserCardWithAvatar from '../../Components/UserCardWithAvatar';
import {
  CommunicationChatContainer,
  CommunicationMainContainer,
  CommunicationUserContainer,
  CommunicationHeaderContainer,
  SearchBox,
  ToggleContainer,
  SearchContainer,
  CommunicationDetailContainer,
} from './style';
import { IoCall, IoChatbox } from 'react-icons/io5';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';
import {
  AvatarComponent,
  Search,
  SelectionToggle,
  DropDownSelect,
} from '../../Components';
import { CallOptionsMenu, dummyData, toggleMenu } from './menuFile';
import { MdOutlineEmail } from 'react-icons/md';
import UserEmail from './Component/UserEmail';
import UserChat from './Component/UserChat';
import UserNewCall from './Component/UserNewCall';
import UserCallDetails from './Component/UserCallDetails';
import { useTranslation } from 'react-i18next';
const Communication = () => {
  const [currentUser, setcurrentUser] = useState<any>(null);
  const [toggle, setToggle] = useState<number | string>(1);
  const [userData, setUserData] = useState(dummyData);
  const [search, setSearch] = useState<string>('');
  const [callModal, setCallModal] = useState<string | string[]>('call');
  const { t } = useTranslation();

  const handleUserClick = (item: any) => {
    setcurrentUser(item);
    if (toggle === 4) {
      setToggle(3);
    }
  };

  const renderCallOptions = () => {
    return (
      <DropDownSelect
        options={CallOptionsMenu}
        placeholder={<IoCall fontSize={'25px'} style={{ marginTop: '5px' }} />}
        valueAsIcon={true}
        setSelectedOptions={(selected) => setCallModal(selected)}
      />
    );
  };

  useEffect(() => {
    const filterData = dummyData.filter((item: any) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    setUserData(filterData);
  }, [search]);

  return (
    <>
      <CommunicationHeaderContainer>
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {toggle === 1 ? (
            <MdOutlineEmail fontSize={'25px'} color={Colors.darkOrgane} />
          ) : toggle === 2 ? (
            <IoChatbox fontSize={'25px'} color={Colors.darkOrgane} />
          ) : (
            <IoCall fontSize={'25px'} color={Colors.darkOrgane} />
          )}

          <Typography color={Colors.darkOrgane} sx={GenericStyle.font16Bold}>
            {toggle === 1 ? 'Email' : toggle === 2 ? 'Chat' : t('call')}
          </Typography>
        </Box>

        <Typography
          color={Colors.darkOrgane}
          sx={(GenericStyle.font16Bold, { cursor: 'pointer' })}
          onClick={() => {
            setToggle(4);
            setcurrentUser(null);
          }}
        >
          {toggle === 3 || toggle === 4 ? renderCallOptions() : ''}
        </Typography>
      </CommunicationHeaderContainer>

      <CommunicationMainContainer>
        {/* User Container */}
        <CommunicationUserContainer>
          <SearchBox>
            <SearchContainer>
              <Search
                onSearchTermChange={(searchValue: string) =>
                  setSearch(searchValue)
                }
                onCrossIconClick={() => setSearch('')}
              />
            </SearchContainer>
            <ToggleContainer>
              <SelectionToggle
                menu={toggleMenu(t)}
                selectedButton={toggle}
                setSelectedButton={setToggle}
                direction="row"
                size="medium"
                activeColor={Colors.darkOrgane}
                activeTextColor={Colors.white}
              />
            </ToggleContainer>
          </SearchBox>
          {userData.map((singleData: any) => {
            // change original data
            return (
              <Box sx={{ width: '100%', mb: '10px' }}>
                <UserCardWithAvatar
                  name={singleData.name}
                  url={singleData.url}
                  time={singleData.time}
                  message={toggle === 2 && singleData.messages[0]?.content}
                  onClick={() => handleUserClick(singleData)}
                  isActive={singleData.id === currentUser?.id}
                />
              </Box>
            );
          })}
        </CommunicationUserContainer>
        {/* Chat Container */}
        <CommunicationChatContainer isNewCall={toggle === 4}>
          {toggle === 4 ? (
            <UserNewCall callModal={callModal === 'call' ? true : false} />
          ) : currentUser === null ? (
            <Typography sx={GenericStyle.font16Bold}>Select a User</Typography>
          ) : (
            <>
              {toggle === 1 ? (
                <UserEmail />
              ) : toggle === 2 ? (
                <UserChat
                  userData={currentUser}
                  setData={setUserData}
                  data={userData}
                />
              ) : (
                <UserCallDetails userData={currentUser} />
              )}
            </>
          )}
        </CommunicationChatContainer>

        {/* Profile Container */}
        <CommunicationUserContainer
          sx={{
            display: { xs: 'none', md: toggle === 4 ? 'none' : 'block' },
          }}
        >
          <CommunicationDetailContainer>
            {currentUser ? (
              <>
                <AvatarComponent
                  imageUrl={currentUser?.url}
                  name={currentUser?.name}
                  size="xxlarge"
                />
                <Typography>{currentUser?.name}</Typography>
                <Typography>
                  Email:{' '}
                  {`${currentUser?.name.split(' ')[0].toLowerCase()}@gmail.com`}
                </Typography>
                <Typography>+1 234 567 8901</Typography>
              </>
            ) : (
              <Typography>Select User</Typography>
            )}
          </CommunicationDetailContainer>
        </CommunicationUserContainer>
      </CommunicationMainContainer>
    </>
  );
};

export default Communication;
