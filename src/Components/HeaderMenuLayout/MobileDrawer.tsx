import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { CompanyLogo } from '../../Assests/Svg';
import { menuItem, MenuItemProps } from './menuList';
import { useTranslation } from 'react-i18next';
import { IoLogOut, IoSettings } from 'react-icons/io5';
import { Colors } from '../../Utilities/Colors';
import { Logout, Settings } from '../../Utilities/ApplicationConstants';
import AvatarComponent from '../Avatar';

interface MobileDrawerProps {
  onClickMeunItem: (item: MenuItemProps) => void;
  onClickCommonItem: (item: string) => void;
  selectedItem: string;
  activeUser: any;
}

const MobileDrawer = ({
  onClickMeunItem,
  onClickCommonItem,
  selectedItem,
  activeUser,
}: MobileDrawerProps) => {
  const { t } = useTranslation();

  const menuList = menuItem('admin', t);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 1,
        }}
      >
        <CompanyLogo width={80} height={80} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          {menuList.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: Colors.sagaGreen,
                  },
                  px: 2.5,
                }}
                onClick={() => onClickMeunItem(item)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 6,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {selectedItem === item.key
                    ? item.selectedIcon
                    : item.unSelectedIcon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mb: 3 }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
                bgcolor: 'transparent',

                '&:hover': {
                  bgcolor: Colors.sagaGreen,
                },
              }}
              onClick={() => onClickCommonItem('profile')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 6,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <AvatarComponent size="small" name={activeUser?.name} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
                bgcolor: 'transparent',

                '&:hover': {
                  bgcolor: Colors.sagaGreen,
                },
              }}
              onClick={() => onClickCommonItem('settings')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 6,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoSettings
                  size={24}
                  color={
                    selectedItem === Settings
                      ? Colors.secondaryApplicationColor
                      : Colors.applicationColor
                  }
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 4,
                bgcolor: 'transparent',

                '&:hover': {
                  bgcolor: Colors.sagaGreen,
                },
              }}
              onClick={() => onClickCommonItem('logout')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 6,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoLogOut
                  size={24}
                  color={
                    selectedItem === Logout
                      ? Colors.secondaryApplicationColor
                      : Colors.applicationColor
                  }
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </>
  );
};

export default MobileDrawer;
