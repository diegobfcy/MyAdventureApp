import React from 'react';
import './CardMasInformacion.css';

function CardMasInformacion({ onClose }) {
  return (
    <div className="CardMasInformacionOverlay">
      <div className="CardMasInformacion-infoContainer">
        {/* Aquí puedes añadir el contenido que quieras en tu card */}

        <button className="CardMasInformacion-closeButton" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default CardMasInformacion;