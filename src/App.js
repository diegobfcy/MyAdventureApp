import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import MainUserPage from './views/MainUserPage/MainUserPage';
import MapPage from './views/MapPage/MapPage';
import BookingPage from './views/BookingPage/BookingPage';
import AuthContainer from './components/AuthContainer/AuthContainer';
import {AuthUserRoutes} from './components/AuthUserRoutes/AuthUserRoutes';
import { UserLogedContext } from './context/UserLogedContext';

import { PrivateRoutes, PublicRoutes } from './routes';

import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import OfertaRutaPage from './views/OfertaRutaPage/OfertaRutaPage';


function App() {
  const { userLogedData } = useContext(UserLogedContext); 

  return (

    <Router>
      <AuthContainer>
        <Routes>
            <Route path={PublicRoutes.MAINPAGE} element={userLogedData ? <Navigate to={PrivateRoutes.USERPAGE}/> : <MainPage/>} />
            <Route path='*' element={<h1>Not Found</h1>} />
          <Route element={<AuthUserRoutes />}>
            <Route path={PrivateRoutes.USERPAGE} element={<MainUserPage />} />
            <Route path={PrivateRoutes.MAPPAGE} element={<MapPage />} />
            <Route path={PrivateRoutes.BOOKINGPAGE} element={<BookingPage />} />
          </Route>
        </Routes>
      </AuthContainer>
    </Router>

  );
}

export default App;
