import './MapToolBar.css';
import React from 'react';
import { IconContext } from 'react-icons';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';  // Importando iconos de ejemplo
import logo from '../../assets/icons/LogoLetrasSinFondo.png';
import { FaSearch } from 'react-icons/fa';
import plusIcon from '../../assets/icons/plus 1.png';
import profileIcon from '../../assets/icons/perfilIcon.png';
import { Link } from 'react-router-dom';

function MapToolBar() {
  return (
    <div className="MapToolBar">
      <Link to='/'>
        <img src={logo} alt="Logo" className='MapLogo' />
      </Link> 
      <div className="MapSearchBar">
        <FaSearch className="MapSearchIcon" />
        <input type="text" placeholder="Busca tu propia aventura" />
      </div>

      <Link to='/mapPage'>
                <button className="btnCrearMapToolBar">
                    <img src={plusIcon} alt="Icono Crear" className="btnIconMapToolBar" />
                    Crear
                </button>
      </Link>
      <button className="btnPerfilMapToolBar">
        <img src={profileIcon} alt="Perfil" className="profileIconMapToolBar" />
      </button>

    </div>
  );
}

export default MapToolBar;