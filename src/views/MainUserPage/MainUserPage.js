import React, { useState, useEffect, useContext } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import LugarCardLarge from '../../components/LugarCardLarge/LugarCardLarge';// Ajusta la ruta si es necesario
import './MainUserPage.css'
import firebase from 'firebase/app';
import 'firebase/database';
import { db } from '../../firebaseConfig';
import AddData from '../../components/AddData/AddData';
import { collection, getDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import LugarCardSmallContainer from '../../components/LugarCardSmallContainer/LugarCardSmallContainer';
import { CSSTransition } from 'react-transition-group';
import GuideOverlay from '../../components/GuideOverlay/GuideOverlay';

import { FiltersProvider } from '../../context/filters';
import { CartInfoProvider } from '../../context/CartInfoContext';
import { UserLogedContext } from '../../context/UserLogedContext';

function MainUserPage() {
  const [inProp, setInProp] = useState(false);
  const { userLogedDataCollection } = useContext(UserLogedContext);
  const [ rol, setRol ] =  useState("")

  useEffect(() =>{
    if(userLogedDataCollection && !(userLogedDataCollection.rol === undefined)){
      setRol(userLogedDataCollection.rol);
    }
  }, [userLogedDataCollection]);

  useEffect(() => {
    setInProp(true);
    return () => setInProp(false); // Esto establecerá el estado inProp en false cuando se desmonte el componente
  }, []);

  return (
    <CSSTransition in={inProp} timeout={1000} classNames="slide">

      <div>
        <Toolbar />

        { rol === "" ? (
          <>
            <LugarCardLarge />
            <FiltersProvider>
              <CartInfoProvider>
                <LugarCardSmallContainer />
              </CartInfoProvider>
            </FiltersProvider>
          </>
        ) : (
          <GuideOverlay />
        )}
      </div>
    </CSSTransition>

  );

}

export default MainUserPage;