import React from 'react';
import './OfertaLugarCard.css';

function OfertaLugarCard({data}) {
    return (
        <div className="OfertaLugarCard">
            <div className="OfertaLugarCard-row">
                <div className="OfertaLugarCard-image-container">
                    <img src={data.urlImagen} alt="Lugar" className="OfertaLugarCard-image"/>  {/* Corregido aquí */}
                </div>
                <div className="OfertaLugarCard-name">
                    <span>{data.nombre}</span>
                </div>
            </div>
        </div>
    );
}

export default OfertaLugarCard;