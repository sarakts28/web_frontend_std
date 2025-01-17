import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MdMoreVert } from 'react-icons/md';

export interface MenuItemType {
  id: string;
  label: string;
  icon?: any;
  onClick: () => void;
}

interface VerticalMenuProps {
  menuItems: MenuItemType[];
  trigger?: JSX.Element;
}

export const VerticalMenu = ({ menuItems, trigger }: VerticalMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: MenuItemType) => {
    if (item.onClick) {
      item.onClick();
    }

    handleClose();
  };

  return (
    <>
      {trigger ? (
        <div onClick={handleClick}>{trigger}</div>
      ) : (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MdMoreVert />
        </IconButton>
      )}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item: MenuItemType) => (
          <MenuItem key={item.id} onClick={() => handleItemClick(item)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
