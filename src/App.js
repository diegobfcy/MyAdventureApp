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
import React from 'react';

import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [usuario, setUsuario] = React.useState(null)

  onAuthStateChanged(auth, (usuarioFireBase)=>{
    if(usuarioFireBase){
      setUsuario(usuarioFireBase)
    }else{
      setUsuario(null)
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={usuario ? <MainUserPage correoUsuario={usuario.email} /> : <MainPage />}/>
        <Route path='/mainUserPage' element={<MainUserPage/>}/>
        <Route path='/mapPage' element={<MapPage/>}/>
        <Route path='/bookingPage' element={<BookingPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
