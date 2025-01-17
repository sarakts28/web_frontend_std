import { UserCardContainer, TextBox, TextStyle, CardElements } from './styled';
import AvatarComponent from '../Avatar';
import { MdArrowForwardIos } from 'react-icons/md';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import { Colors } from '../../Utilities/Colors';
interface UserCardWithAvatarProps {
  cardHeight?: number;
  avatarSize?: 'small' | 'medium' | 'large';
  name: string;
  url?: string;
  message?: string;
  time?: string | Date;
  onClick: () => void;
  isActive?: boolean;
  activeColor?: string;
}

const UserCardWithAvatar = ({
  cardHeight = 50,
  avatarSize = 'small',
  name,
  url,
  message,
  time,
  onClick,
  isActive,
  activeColor = Colors.darkOrgane,
}: UserCardWithAvatarProps) => {
  const timeToShow = useMemo(() => {
    if (!time) return '';
    return time.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }, [time]);

  return (
    <UserCardContainer
      height={cardHeight}
      onClick={onClick}
      isActive={isActive}
      activeColor={activeColor}
    >
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <AvatarComponent
          size={avatarSize}
          name={name ? name : ''}
          imageUrl={url}
        />
      </Box>
      <CardElements>
        <TextBox>
          <TextStyle size="large" isActive={isActive}>
            {name}
          </TextStyle>
          {message && (
            <TextStyle size="small" isGrey={true} isActive={isActive}>
              {message}
            </TextStyle>
          )}
        </TextBox>
        {time ? (
          <TextStyle size="large" isActive={isActive}>
            {timeToShow}
          </TextStyle>
        ) : (
          <MdArrowForwardIos size={12} color={isActive ? Colors.white : ''} />
        )}
      </CardElements>
    </UserCardContainer>
  );
};

export default UserCardWithAvatar;
