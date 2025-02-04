import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { EmailFilterDataType } from '../Screens/Communication/menuFile';
import { useTranslation } from 'react-i18next';
import { useThunkDispatch } from './useThunkDispatch';
import { getGmailAccess } from '../Store/Thunk/GoogleActivityThunk';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllEmailGmail,
  getGoogleActivityLoading,
  getNextPageToken,
  getTokenArray,
  getTotalEmails,
} from '../Store/Selectors/GoogleActivitySelector';
import { addTokenPage } from '../Store/Reducer/GoogleActivitySlice';
import { getCustomersList } from '../Store/Thunk/CustomersThunk';
import {
  getAllCustomers,
  getCustomersLoading,
  getTotalCount,
  getTotalPages,
} from '../Store/Selectors/CustomersSelector';
import { CustomerDataType } from '../Store/Types/CustomersType';
import { useToast } from '../Components/Toast';
import { postCustomerSms } from '../Store/Thunk/TwilioThunk';
import { Fullfiled } from '../Utilities/ApplicationConstants';

const CommunicationContext = createContext<any>(null);

export const CommunicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  const thunkDispatch = useThunkDispatch();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // data from store
  const listEmail = useSelector(getAllEmailGmail);
  const totalEmails = useSelector(getTotalEmails);
  const nextPageToken = useSelector(getNextPageToken);
  const tokenArray = useSelector(getTokenArray);
  const isEmailLoading = useSelector(getGoogleActivityLoading);
  const customerList = useSelector(getAllCustomers);
  const customerListLoading = useSelector(getCustomersLoading);
  const totalCustomerListPages = useSelector(getTotalPages);
  const totalCustomers = useSelector(getTotalCount);

  // state
  const [userData, setUserData] = useState(customerList);
  const [currentCustomer, setCurrentCustomer] =
    useState<CustomerDataType | null>(null);
  const [currentCustomerPage, setCurrentCustomerPage] = useState<number>(0);
  const [toggle, setToggle] = useState<number | string>(1);
  const [search, setSearch] = useState<string>('');
  const [callModal, setCallModal] = useState<string | string[]>('call');
  const [currentEmailPage, setCurrentEmailPage] = useState<number>(0);
  const [emailToggle, setEmailToggle] = useState<number>(1);
  const [smsText, setSmsText] = useState('');

  // functions
  const handleUserClick = (item: any) => {
    setCurrentCustomer(item);
    if (toggle === 4) {
      setToggle(3);
    }
  };
  // function to check which type of email need to be fetched based on tab is active

  const fetchEmailData = useCallback(async () => {
    const getLabel = () => {
      switch (emailToggle) {
        case 1:
          return 'inbox';
        case 2:
          return 'sent';
        case 3:
          return 'spam';
        case 4:
          return 'draft';
        case 5:
          return 'starred';
        case 6:
          return 'important';
        default:
          return 'inbox';
      }
    };

    const payload: EmailFilterDataType = {
      filters: {
        label: getLabel(),
        ...(currentEmailPage !== 0 && {
          pageToken: tokenArray[currentEmailPage - 1]?.pageToken,
        }),
        ...(getLabel() === 'draft' &&
          !currentCustomer && {
            to: [],
          }),
        ...(currentCustomer && {
          [getLabel() === 'sent' || getLabel() === 'draft' ? 'to' : 'from']:
            currentCustomer.email,
        }),
      },
    };

    await thunkDispatch(getGmailAccess(payload));
  }, [
    currentEmailPage,
    thunkDispatch,
    tokenArray,
    emailToggle,
    currentCustomer,
  ]);

  // function to fetch custom data

  const fetchCustomData = useCallback(async () => {
    await thunkDispatch(
      getCustomersList({ pageNumber: currentCustomerPage + 1 })
    );
  }, [thunkDispatch, currentCustomerPage]);

  const handleSendSms = async () => {
    if (!currentCustomer || !smsText) {
      showToast('error', t('noMessage'));
      return;
    }

    let payload = {
      ToPhoneNumber: currentCustomer?.phoneNumber,
      Message: smsText,
    };

    const resp = await thunkDispatch(postCustomerSms(payload));

    if (resp?.type?.includes(Fullfiled)) {
      showToast('success', resp.payload);
    } else {
      showToast('error', resp.payload || t('somethingWentWrong'));
    }

    setSmsText('');
  };

  //userEffects

  // useEffect to search customer list

  useEffect(() => {
    let filterData: any = customerList;

    if (search !== '' && customerList.length > 0) {
      filterData = customerList.filter((item: CustomerDataType) =>
        item.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setUserData(filterData);
  }, [search, customerList]);

  // useEffect to fetch emails

  useEffect(() => {
    fetchEmailData();
  }, [currentEmailPage, fetchEmailData, emailToggle]);

  // useEffect to dispatch new page token

  useEffect(() => {
    if (nextPageToken) {
      const tokenExists = tokenArray.some(
        (item) => item.pageToken === nextPageToken
      );

      if (!tokenExists) {
        dispatch(addTokenPage({ pageToken: nextPageToken }));
      }
    }
  }, [nextPageToken, tokenArray, dispatch]);

  useEffect(() => {
    setCurrentEmailPage(0);
  }, [emailToggle]);

  useEffect(() => {
    fetchCustomData();
  }, [fetchCustomData, currentCustomerPage]);

  return (
    <CommunicationContext.Provider
      value={{
        t,
        currentCustomer,
        setCurrentCustomer,
        toggle,
        setToggle,
        userData,
        setUserData,
        search,
        setSearch,
        callModal,
        setCallModal,
        handleUserClick,
        listEmail,
        totalEmails,
        currentEmailPage,
        setCurrentEmailPage,
        isEmailLoading,
        emailToggle,
        setEmailToggle,
        customerListLoading,
        totalCustomerListPages,
        totalCustomers,
        currentCustomerPage,
        setCurrentCustomerPage,
        handleSendSms,
        smsText,
        setSmsText,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  );
};

export const useCommunication = () => {
  return useContext(CommunicationContext);
};
