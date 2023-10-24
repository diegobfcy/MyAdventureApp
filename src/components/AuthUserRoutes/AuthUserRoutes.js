import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../../routes';

export const AuthUserRoutes = () => {
  return window.localStorage.getItem('user') ? <Outlet /> : <Navigate replace to={PublicRoutes.MAINPAGE} />;
};
