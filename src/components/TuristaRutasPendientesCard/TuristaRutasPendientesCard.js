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
        <span>Estado:</span>
        <span>{estado}</span>
      </div>
      { data.guia && 
        <div className="TuristaRutasPendientesCard-card-row">
          <span>Guia:</span>
          <span>{data.guia}</span>
        </div>
      }
      { data.transporte && 
        <div className="TuristaRutasPendientesCard-card-row">
          <span>Transporte:</span>
          <span>{data.transporte}</span>
        </div>
      }
      <div className="TuristaRutasPendientesCard-card-row">
        <button className="TuristaRutasPendientesCard-btn">Rutas</button>
        <button className="TuristaRutasPendientesCard-btn">Oferta Guias</button>
        <button className="TuristaRutasPendientesCard-btn">Oferta Transporte</button>
      </div>

    </div>
  );
};

export default TuristaRutasPendientesCard;