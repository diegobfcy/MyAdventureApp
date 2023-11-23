import React from 'react';
import './TuristaRutasConfirmadasCard.css';

const TuristaRutasConfirmadasCard = ({ data }) => {
  const fecha = `${data.day}-${data.month}-2023`;
  const cantidad = data.persons;
  const estado = data.status;

  
  return (
    <div className="TuristaRutasConfirmadasCard-card-container" >
      <div className="TuristaRutasConfirmadasCard-card-row">
        <span>Fecha:</span>
        <span>{fecha}</span>
      </div>
      <div className="TuristaRutasConfirmadasCard-card-row">
        <span>Cantidad de personas:</span>
        <span>{cantidad}</span>
      </div>
      <div className="TuristaRutasConfirmadasCard-card-row">
        <span>Estado:</span>
        <span>{estado}</span>
      </div>
      { data.guia && 
        <div className="TuristaRutasConfirmadasCard-card-row">
          <span>Guia:</span>
          <span>{data.guia['guideName']}</span>
        </div>
      }
      <div className="TuristaRutasConfirmadasCard-card-row">
        <span>Transporte:</span>
        <span>{data.transporte?.ownerName ?? data.guia?.guideName}</span>
      </div>
      <div className="TuristaRutasConfirmadasCard-card-row">
        <span>Precio:</span>
        <span>S/. {data.price}</span>
      </div>
    </div>
  );
};

export default TuristaRutasConfirmadasCard;