import React from 'react';
import LoginPage from '../Screens/AuthComponent/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import TimeTracker from '../Screens/TimeTracker';
import Communication from '../Screens/Communication';
import User from '../Screens/User';
import Settings from '../Screens/Setting';
import Profile from '../Screens/Profile';
import Report from '../Screens/Report';
import ForgetScreen from '../Screens/AuthComponent/ForgetScreen';
import CodeScreen from '../Screens/AuthComponent/CodeScreen';
import ResetPassword from '../Screens/AuthComponent/ResetPasswordScreen';

export const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forget-password',
    element: <ForgetScreen />,
  },
  {
    path: '/optCode',
    element: <CodeScreen />,
  },
  {
    path: '/resetPassword',
    element: <ResetPassword />,
  },
];

export const privateRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/timetracker',
    element: <TimeTracker />,
  },
  {
    path: '/communication',
    element: <Communication />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/report',
    element: <Report />,
  },
];
