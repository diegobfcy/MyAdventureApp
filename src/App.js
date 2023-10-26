import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import './index.css';
import LugarCardLarge from './components/LugarCardLarge/LugarCardLarge';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MainPage from './views/MainPage/MainPage';
import MainUserPage from './views/MainUserPage/MainUserPage';
import MapPage from './views/MapPage/MapPage';
import BookingPage from './views/BookingPage/BookingPage';
import React, {useContext} from 'react';
import { UserLogedContext } from './context/UserLogedContext';
import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';
import OfertaRutaPage from './views/OfertaRutaPage/OfertaRutaPage';

function App() {
  const { userLogedData, setUserLogedData, userLogedDataCollection} = useContext( UserLogedContext );

  onAuthStateChanged(auth, (usuarioFireBase)=>{
      if(usuarioFireBase)
          setUserLogedData(usuarioFireBase)
      else
          setUserLogedData(null)
  })
  console.log(userLogedDataCollection)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={userLogedData ? <MainUserPage /> : <MainPage />}/>
        <Route path='/mapPage' element={<MapPage/>}/>
        <Route path='/bookingPage' element={<BookingPage/>}/>
        <Route path='/ofertaRuta' element={<OfertaRutaPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

