import React from 'react';
import './TransportCard.css';
import starIcon from '../../assets/icons/starIcon.png';
import arrowIcon from '../../assets/icons/arrowIcon.png';
import plusIcon from '../../assets/icons/plus 1.png'

function TransportCard({data,onTransportSelected}) {

    return (
        <div className="transport-card">
            <div className="transport-card-row">
                <div className="transport-card-left">
                    <button className="btn-add" onClick={() => onTransportSelected(data)}>
                        <img src={plusIcon} alt="Add icon" />
                    </button>
                </div>
                <div className="transport-card-middle">
                    <div className="transport-card-middle-left">
                        <img src={data.imagen} alt="Transport" className="transport-image"/>
                    </div>
                    <div className="transport-card-middle-center">
                        <span className="transport-name">{data.dueño}</span>
                        <div>
                            <span className="transport-capacity">
                                {data.capacidad} personas
                            </span>
                        </div>
                        <div className="transport-details">
                            <div className="transport-modelo">Modelo: {data.modelo}</div>
                            <div className="transport-placa">Placa: {data.placa}</div>
                        </div>
                    </div>
                    <div className="transport-card-middle-right">
                        <div className="transport-rating">{data.valoracion} <img src={starIcon} alt="star rating" className="star-icon" /></div>
                        <span className="transport-price">S/.{data.precio}</span>
                    </div>
                </div>
                <div className="transport-card-right">
                    <button className="btn-profile">
                        <img src={arrowIcon} alt="Profile icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransportCard;