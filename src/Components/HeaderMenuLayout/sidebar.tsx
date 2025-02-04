import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CompanyLogo } from '../../Assests/Svg';
import AvatarComponent from '../Avatar';
import { useTranslation } from 'react-i18next';
import TranslationButton from '../TranslationButton';
import { AppbarContainer } from './styled';
import { Colors } from '../../Utilities/Colors';
import { menuItem, MenuItemProps } from './menuList';
import { IoLogOut, IoSettings } from 'react-icons/io5';
import MobileDrawer from './MobileDrawer';
import { useToast } from '../Toast';
import { useScreenTimeTrack } from '../../Hooks/useScreenTimeTracker';
import { useNavigate } from 'react-router-dom';
import { useThunkDispatch } from '../../Hooks/useThunkDispatch';
import { useSelector } from 'react-redux';
import { getUserData } from '../../Store/Selectors/AuthSelector';
import { resetState } from '../../Store/Reducer/AuthSlice';
// import { postTimeTracker } from '../../Store/Thunk/TimeTrackerThunk';
import { MenuItemStyled, AvatarWrapper } from './styled';
import { getActivityTrackerList } from '../../Store/Thunk/ActivityTrackerThunk';
import { TbSettingsCog } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { logout } from '../../Store/Thunk/AuthThunk';

const MenuBar: React.FC = () => {
  const theme = useTheme();
  const path = window.location.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState('dashboard');

  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useThunkDispatch();
  const currentUserData = useSelector(getUserData);
  const { updateScreenTime } = useScreenTimeTrack(true);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();

  const menuList = menuItem('admin', t);

  const handleMenuItemClick = (item: MenuItemProps) => {
    updateScreenTime(item.key);
    setSelectedItem(item.key);
    navigate(item.navLink);
  };

  const handleCommonMenuItemClick = (itemText: string) => {
    updateScreenTime(itemText);
    setSelectedItem(itemText);

    if (itemText === 'logout') {
      // setTimeout(() => {
      dispatch(logout());
      dispatch(resetState());
      showToast('success', 'Successfully logged out');
      navigate('/login');
      // }, 1000);
      return;
    }

    navigate(`/${itemText}`);
  };

  // useEffect(() => {
  //   if (screenTime.length > 0) {
  //     const currentScreen = screenTime[screenTime.length - 1];

  //     if (currentScreen.timeSpent / 1000 > 5) {
  //       dispatch(
  //         postTimeTracker({
  //           userId: currentUserData?.userId,
  //           taskDescription: currentScreen.eventName,
  //           pageId: `${currentScreen.id}`,
  //           pageTitle: currentScreen.eventName,
  //           timeSpent: Math.round(currentScreen.timeSpent / 1000),
  //         })
  //       );
  //     }
  //   }
  // }, [screenTime]);

  useEffect(() => {
    setSelectedItem(path.split('/')[1]);
    dispatch(getActivityTrackerList({}));
  }, []);

  return (
    <>
      {isMobile ? (
        <AppbarContainer
          position="fixed"
          sx={{
            bgcolor: 'background.default',
            padding: 0,
          }}
        >
          {/* Drawer for mobile */}
          <Drawer
            variant={'permanent'}
            open={true}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                width: 60,
              },
            }}
          >
            <MobileDrawer
              onClickMeunItem={handleMenuItemClick}
              onClickCommonItem={handleCommonMenuItemClick}
              selectedItem={selectedItem}
              activeUser={currentUserData}
            />
          </Drawer>
          <TranslationButton />
        </AppbarContainer>
      ) : (
        <AppBar position="fixed" sx={{ bgcolor: 'background.default' }}>
          <Toolbar>
            <CompanyLogo style={{ width: '50px', height: '50px' }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
                color: Colors.applicationColor,
                gap: 4,
              }}
            >
              {menuList.map((item) => (
                <MenuItemStyled
                  key={item.key}
                  onClick={() => handleMenuItemClick(item)}
                  selected={selectedItem === item.key ? true : false}
                >
                  {item.text}
                </MenuItemStyled>
              ))}
            </Box>

            <AvatarWrapper onClick={handleMenuOpen}>
              <AvatarComponent size="small" name={currentUserData?.name} />
            </AvatarWrapper>

            <TranslationButton />

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => handleCommonMenuItemClick('profile')}
                sx={{ display: 'flex', gap: 2 }}
              >
                <CgProfile size={24} color={Colors.applicationColor} />
                {t('profile')}
              </MenuItem>
              <MenuItem
                onClick={() => handleCommonMenuItemClick('settings')}
                sx={{ display: 'flex', gap: 2 }}
              >
                <IoSettings size={24} color={Colors.applicationColor} />
                {t('settings')}
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleCommonMenuItemClick('application integration')
                }
                sx={{ display: 'flex', gap: 2 }}
              >
                <TbSettingsCog size={24} color={Colors.applicationColor} />
                {t('applicationintegration')}
              </MenuItem>
              <MenuItem
                onClick={() => handleCommonMenuItemClick('logout')}
                sx={{ display: 'flex', gap: 2 }}
              >
                <IoLogOut size={24} color={Colors.applicationColor} />
                {t('logout')}
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default MenuBar;
