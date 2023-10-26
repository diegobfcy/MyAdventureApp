import React from 'react';
import './GuideRutasDisponiblesCard.css';
import { Link } from 'react-router-dom';
import OfertaRutaPage from '../../views/OfertaRutaPage/OfertaRutaPage';

const GuideRutasDisponiblesCard = ({ fecha, nombre, cantidad }) => {
  return (
    <div className="GuideRutasDisponiblesCard-card-container">
      <div className="GuideRutasDisponiblesCard-card-row">
        <span>Fecha:</span>
        <span>{fecha}</span>
      </div>
      <div className="GuideRutasDisponiblesCard-card-row">
        <span>Nombre del usuario:</span>
        <span>{nombre}</span>
      </div>
      <div className="GuideRutasDisponiblesCard-card-row">
        <span>Cantidad de personas:</span>
        <span>{cantidad}</span>
      </div>
      <div className="GuideRutasDisponiblesCard-card-row">
        <Link to="/ofertaRuta">
            <button className="GuideRutasDisponiblesCard-btn">Mas detalles y dar oferta</button>
        </Link>
      </div>
    </div>
  );
};

export default GuideRutasDisponiblesCard;