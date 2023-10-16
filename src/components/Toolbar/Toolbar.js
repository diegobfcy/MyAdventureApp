import './Toolbar.css';
import React, {useContext, useEffect, useState} from 'react';
import { IconContext } from 'react-icons';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';  // Importando iconos de ejemplo
import logo from '../../assets/icons/LogoLetrasSinFondo.png';
import { FaSearch } from 'react-icons/fa';
import plusIcon from '../../assets/icons/plus 1.png';
import { Link } from 'react-router-dom';
import UserDataOverlay from '../UserDataOverlay/UserDataOverlay'

function Toolbar() {

  return (
    <>
    <div className="toolbar">
      <Link to='/'>
        <img src={logo} alt="Logo" className='logo' />
      </Link> 

      {/* <Link to='/mapPage'>
                <button className="btn-crear">
                    <img src={plusIcon} alt="Icono Crear" className="btn-icon" />
                    Crear
                </button>
      </Link> */}

      <div className='ToolBar-Buttons'>
        <button className="btn-crear">Tus Rutas</button>
      <UserDataOverlay />
      </div>
    </div>
    </>
  );
}

export default Toolbar;