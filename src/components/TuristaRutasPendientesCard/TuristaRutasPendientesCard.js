import React from 'react';
import './TuristaRutasPendientesCard.css';

const TuristaRutasPendientesCard = ({ data }) => {
  const fecha = `${data.day}-${data.month}-2023`;
  const cantidad = data.persons;
  const estado = data.status;
  
  return (
    <div className="TuristaRutasPendientesCard-card-container" >
      <div className="TuristaRutasPendientesCard-card-row">
        <span>Fecha:</span>
        <span>{fecha}</span>
      </div>
      <div className="TuristaRutasPendientesCard-card-row">
        <span>Cantidad de personas:</span>
        <span>{cantidad}</span>
      </div>
      <div className="TuristaRutasPendientesCard-card-row">
        <span>Estado</span>
        <span>{estado}</span>
      </div>
        <div className="TuristaRutasPendientesCard-card-row">
          <button className="TuristaRutasPendientesCard-btn">Mas detalles</button>
        </div>
    </div>
  );
};

export default TuristaRutasPendientesCard;