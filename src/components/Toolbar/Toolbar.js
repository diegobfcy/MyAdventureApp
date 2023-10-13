import './Toolbar.css';
import React from 'react';
import { IconContext } from 'react-icons';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';  // Importando iconos de ejemplo
import logo from '../../assets/icons/LogoLetrasSinFondo.png';
import { FaSearch } from 'react-icons/fa';
import plusIcon from '../../assets/icons/plus 1.png';
import profileIcon from '../../assets/icons/perfilIcon.png';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth';


function Toolbar({correoUsuario}) {
  const salir = async() =>{
    await signOut(auth)
  } 

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
        <button onClick={salir}>
          Salir
        </button>
        <button className="btn-perfil">
          <img src={profileIcon} alt="Perfil" className="profile-icon" />
        </button>
      </div>



    </div>
    <label>{correoUsuario}</label>
    </>
  );
}

export default Toolbar;