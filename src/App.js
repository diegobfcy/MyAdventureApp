import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import MainUserPage from './views/MainUserPage/MainUserPage';
import MapPage from './views/MapPage/MapPage';
import BookingPage from './views/BookingPage/BookingPage';
import AuthContainer from './components/AuthContainer/AuthContainer';
import {AuthUserRoutes, AuthOfertRoute} from './components/AuthUserRoutes/AuthUserRoutes';
import { UserLogedContext } from './context/UserLogedContext';
import { PrivateRoutes, PublicRoutes } from './routes';
import OfertaRutaPage from './views/OfertaRutaPage/OfertaRutaPage';
import { RoutesFlagsProvider } from './context/RoutesFlagsContext';

function App() {
  const { userLogedData } = useContext(UserLogedContext); 

  return (

    <Router>
      <RoutesFlagsProvider>
        <AuthContainer>
          <Routes>
              <Route path={PublicRoutes.MAINPAGE} element={userLogedData ? <Navigate replace to={PrivateRoutes.USERPAGE}/> : <MainPage/>} />
              <Route path='*' element={<h1>Not Found</h1>} />
            <Route element={<AuthUserRoutes />}>
              <Route path={PrivateRoutes.USERPAGE} element={userLogedData ? <MainUserPage /> : <Navigate replace to={PublicRoutes.MAINPAGE}/>}/>
              <Route path={PrivateRoutes.MAPPAGE} element={userLogedData ? <MapPage /> : <Navigate replace to={PublicRoutes.MAINPAGE}/>} />
              <Route path={PrivateRoutes.BOOKINGPAGE} element={userLogedData ? <BookingPage /> : <Navigate replace to={PublicRoutes.MAINPAGE}/>} />
              <Route element={<AuthOfertRoute/>}>
                <Route path={PrivateRoutes.OFERTROUTE} element={<OfertaRutaPage/>} />
              </Route>
            </Route>
          </Routes>
        </AuthContainer>
      </RoutesFlagsProvider>
    </Router>

  );
}

export default App;
