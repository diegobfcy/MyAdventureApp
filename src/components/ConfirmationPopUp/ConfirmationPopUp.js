import React, { useEffect, useState } from 'react';
import './ConfirmationPopUp.css';
import logo from '../../assets/icons/LogoLetrasConFondo.png';
import gif from '../../assets/icons/checkBlanco.gif'

function ConfirmationPopUp({ isVisible }) {


    return (
        <div className={`popup ${isVisible ? 'visible' : ''}`}>
            <div className="popup-content">
                <div><img src={logo} alt="Logo" className="popup-logo" /></div>
                <div><img src={gif} alt="GIF" className="popup-gif" /></div>
                
                <p>Se ha reservado su tour con éxito</p>
            </div>
        </div>
    );
}

export default ConfirmationPopUp;