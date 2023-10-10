import React, { useState, useEffect } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import LugarCardLarge from '../../components/LugarCardLarge/LugarCardLarge';// Ajusta la ruta si es necesario
import './MainUserPage.css'
import firebase from 'firebase/app';
import 'firebase/database';
import { db } from '../../firebaseConfig';
import AddData from '../../components/AddData/AddData';
import { collection, getDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import LugarCardSmallContainer from '../../components/LugarCardSmall/LugarCardSmallContainer';
import { CSSTransition } from 'react-transition-group';

import { FiltersProvider } from '../../context/filters';

function MainUserPage({ correoUsuario }) {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
    return () => setInProp(false); // Esto establecerá el estado inProp en false cuando se desmonte el componente
  }, []);
  return (
    <CSSTransition in={inProp} timeout={1000} classNames="slide">

      <div>
        <Toolbar correoUsuario={correoUsuario} />

        <LugarCardLarge />

        <FiltersProvider>
          <LugarCardSmallContainer />
        </FiltersProvider>
      </div>
    </CSSTransition>

  );

}

export default MainUserPage;