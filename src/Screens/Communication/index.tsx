import { Box, Typography } from '@mui/material';
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
  AllEmailButtonContainer,
} from './style';
import { IoCall, IoChatbox } from 'react-icons/io5';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';
import {
  AvatarComponent,
  Search,
  SelectionToggle,
  ButtonField,
  DropDownSelect,
  Spinner,
  PageNavigation,
} from '../../Components';
import { toggleMenu, CallOptionsMenu } from './menuFile';
import { MdOutlineEmail } from 'react-icons/md';
import UserEmail from './Component/UserEmail';
import UserChat from './Component/UserChat';
import UserNewCall from './Component/UserNewCall';
import UserCallDetails from './Component/UserCallDetails';
import { useCommunication } from '../../Hooks/useCommunication';
import { CustomerDataType } from '../../Store/Types/CustomersType';
const Communication = () => {
  const {
    t,
    currentCustomer,
    userData,
    setCurrentCustomer,
    toggle,
    setToggle,
    setCallModal,
    setSearch,
    callModal,
    handleUserClick,
    customerListLoading,
    totalCustomerListPages,
    currentCustomerPage,
    setCurrentCustomerPage,
    totalCustomers,
  } = useCommunication();

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

  const renderCommunicationUser = () => {
    return (
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

        {toggle === 1 && (
          <AllEmailButtonContainer>
            <ButtonField
              label="All Emails"
              onClick={() => setCurrentCustomer(null)}
              backgroundColor={Colors.black}
              height={28}
              labelStyle={{ ...GenericStyle.font10Bold }}
            />
          </AllEmailButtonContainer>
        )}
        {customerListLoading ? (
          <Spinner size={20} />
        ) : userData && userData.length > 0 ? (
          <>
            {userData.map((singleData: CustomerDataType) => {
              return (
                <Box sx={{ width: '100%', mb: '10px' }}>
                  <UserCardWithAvatar
                    name={singleData.fullName}
                    onClick={() => handleUserClick(singleData)}
                    isActive={singleData.id === currentCustomer?.id}
                  />
                </Box>
              );
            })}
            {totalCustomerListPages > 1 && (
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', mt: '10px' }}
              >
                <PageNavigation
                  currentPage={currentCustomerPage}
                  rowsPerPage={25}
                  totalElements={totalCustomers}
                  setCurrentPage={setCurrentCustomerPage}
                  showRowsPerPage={false}
                />
              </Box>
            )}
          </>
        ) : (
          <Typography>No User Found</Typography>
        )}
      </CommunicationUserContainer>
    );
  };

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
            setCurrentCustomer(null);
          }}
        >
          {toggle === 3 || toggle === 4 ? renderCallOptions() : ''}
        </Typography>
      </CommunicationHeaderContainer>

      <CommunicationMainContainer>
        {/* User Container */}
        {renderCommunicationUser()}
        {/* Chat Container */}
        <CommunicationChatContainer isNewCall={toggle === 4}>
          {toggle === 4 ? (
            <UserNewCall callModal={callModal === 'call' ? true : false} />
          ) : (
            <>
              {toggle === 1 ? (
                <UserEmail />
              ) : toggle === 2 ? (
                <UserChat />
              ) : (
                <UserCallDetails userData={currentCustomer} />
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
            {currentCustomer ? (
              <>
                <AvatarComponent
                  name={currentCustomer.fullName}
                  size="xxlarge"
                />
                <Typography>{currentCustomer.fullName}</Typography>
                {currentCustomer.email &&
                  currentCustomer.email.length > 0 &&
                  currentCustomer.email.map((email: string, index) => {
                    return index === 0 ? (
                      <>
                        <Typography>{t('primaryEmail')}</Typography>
                        <Typography>{email}</Typography>
                      </>
                    ) : index === 1 ? (
                      <>
                        <Typography>{t('secondaryEmail')}</Typography>
                        <Typography>{email}</Typography>
                      </>
                    ) : (
                      <Typography>{email}</Typography>
                    );
                  })}

                <Typography>{t('phoneNumber')}</Typography>
                <Typography>{currentCustomer.phoneNumber}</Typography>
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
