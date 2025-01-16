import React from 'react';
import {
  RiDashboardHorizontalLine,
  RiDashboardFill,
  RiCommunityLine,
  RiCommunityFill,
  RiTeamLine,
  RiTeamFill,
} from 'react-icons/ri';
import { HiDocumentReport, HiOutlineDocumentReport } from 'react-icons/hi';
import { IoTimerOutline, IoTimerSharp } from 'react-icons/io5';
import { Colors } from '../../Utilities/Colors';

export interface MenuItemProps {
  text: string;
  unSelectedIcon: JSX.Element;
  selectedIcon: JSX.Element;
  navLink: string;
  key: string;
}

export const menuItem = (role: string, t: any): MenuItemProps[] => {
  const baseMenu = [
    {
      text: t('dashboard'),
      unSelectedIcon: (
        <RiDashboardHorizontalLine size={24} color={Colors.applicationColor} />
      ),
      selectedIcon: (
        <RiDashboardFill size={24} color={Colors.secondaryApplicationColor} />
      ),
      key: 'dashboard',
      navLink: '/dashboard',
    },
    {
      text: t('timetracker'),
      unSelectedIcon: (
        <IoTimerOutline size={24} color={Colors.applicationColor} />
      ),
      selectedIcon: (
        <IoTimerSharp size={24} color={Colors.secondaryApplicationColor} />
      ),
      key: 'timetracker',
      navLink: '/timetracker',
    },
  ];

  const adminMenu = [
    ...baseMenu,
    {
      text: t('communication'),
      unSelectedIcon: (
        <RiCommunityLine size={24} color={Colors.applicationColor} />
      ),
      selectedIcon: (
        <RiCommunityFill size={24} color={Colors.secondaryApplicationColor} />
      ),
      key: 'communication',
      navLink: '/communication',
    },
    {
      text: t('user'),
      unSelectedIcon: <RiTeamLine size={24} color={Colors.applicationColor} />,
      selectedIcon: (
        <RiTeamFill size={24} color={Colors.secondaryApplicationColor} />
      ),
      key: 'user',
      navLink: '/user',
    },
    {
      text: t('Reports'),
      unSelectedIcon: (
        <HiOutlineDocumentReport size={24} color={Colors.applicationColor} />
      ),
      selectedIcon: (
        <HiDocumentReport size={24} color={Colors.secondaryApplicationColor} />
      ),
      key: 'report',
      navLink: '/report',
    },
  ];

  const userMenu = [
    ...baseMenu,
    {
      text: t('communication'),
      unSelectedIcon: (
        <RiCommunityLine size={24} color={Colors.applicationColor} />
      ),
      selectedIcon: (
        <RiCommunityFill size={24} color={Colors.secondaryApplicationColor} />
      ),
      key: 'communication',
      navLink: '/communication',
    },
  ];

  switch (role) {
    case 'admin':
      return adminMenu;
    case 'user':
      return userMenu;
    case 'client':
      return baseMenu;
    default:
      return [];
  }
};
