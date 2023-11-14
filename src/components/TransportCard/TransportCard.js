import React, { useContext } from 'react';
import './TransportCard.css';
import starIcon from '../../assets/icons/starIcon.png';
import arrowIcon from '../../assets/icons/arrowIcon.png';
import plusIcon from '../../assets/icons/plus 1.png'
import { PlaceGuideContext } from '../../context/PlaceGuideContext';

function TransportCard({data, precio}) {
    const { setTransportTourData } = useContext(PlaceGuideContext)

    const setTransport = () =>{
        setTransportTourData(data)
    }

    return (
        <div className="transport-card" onClick={setTransport}>
            <div className="transport-card-row">
                <div className="transport-card-middle">
                    <div className="transport-card-middle-left">
                        <img src={data.imageUrl} alt="Transport" className="transport-image"/>
                    </div>
                    <div className="transport-card-middle-center">
                        <span className="transport-name">{data.ownerName}</span>
                        <div>
                            <span className="transport-capacity">
                                {data.persons} personas
                            </span>
                        </div>
                        <div className="transport-details">
                            <div className="transport-modelo">Modelo: {data.model}</div>
                            <div className="transport-placa">Placa: {data.licensePlate}</div>
                        </div>
                    </div>
                    <div className="transport-card-middle-right">
                        <div className="transport-rating">{data.assessment} <img src={starIcon} alt="star rating" className="star-icon" /></div>
                        <span className="transport-price">S/.{precio}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransportCard;