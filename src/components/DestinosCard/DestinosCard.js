import React from 'react';
import './DestinosCard.css';

const DestinosCard = ({ imageUrl, text, onRemove }) => {
    return (
        <div className='DestinosCard'>
            <div className='DestinosCard-ImageContainer'>
                <img src={imageUrl} alt="Imagen del destino" className='DestinosCard-Image' />
            </div>
            
            <p className='DestinosCard-Text'>{text}</p>
            <button className='DestinosCard-Button' onClick={onRemove}>Eliminar</button>
            
        </div>
    );
}

export default DestinosCard;