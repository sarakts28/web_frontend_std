import React from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';
import { FaUserAlt } from 'react-icons/fa';

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  defaultImageUrl?: string;
}

const sizePx = {
  xsmall: 24,
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 56,
  xxlarge: 64,
};

const AvatarComponent = ({
  imageUrl,
  name,
  size = 'medium',
  defaultImageUrl = '/placeholder.svg',
}: AvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const initials = name ? getInitials(name) : '';
  const backgroundColor = name ? getColorFromName(name) : undefined;

  const avatarSx: SxProps<Theme> = {
    width: sizePx[size],
    height: sizePx[size],
    fontSize:
      size === 'small'
        ? 14
        : size === 'xsmall'
          ? 12
          : size === 'medium'
            ? 16
            : 20,
    backgroundColor,
  };

  return (
    <>
      {imageUrl ? (
        <Avatar src={imageUrl} alt={name || 'Avatar'} sx={avatarSx} />
      ) : (
        <Avatar alt={name || 'Avatar'} sx={avatarSx}>
          {initials ||
            (defaultImageUrl && <FaUserAlt size={size} color="black" />)}
        </Avatar>
      )}
    </>
  );
};

export default AvatarComponent;
