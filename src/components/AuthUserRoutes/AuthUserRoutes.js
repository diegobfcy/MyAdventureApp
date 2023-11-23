import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../../routes';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';

export const AuthUserRoutes = () => {
  const { isLoged } = useContext(RoutesFlagsContext);

  return isLoged ? <Outlet /> : <Navigate replace to={PublicRoutes.MAINPAGE} />;
};

export const AuthOfertRoute = () =>{
  const { isOfert } = useContext(RoutesFlagsContext);
  return isOfert ? <Outlet /> : <Navigate replace to={PrivateRoutes.USERPAGE} />;
}
