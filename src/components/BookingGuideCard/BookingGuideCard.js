import React from 'react';
import './BookingGuideCard.css';
import starIcon from '../../assets/icons/starIcon.png'; // Ajusta la ruta si es necesario

function BookingGuideCard({ data }) {
    return (
        <div className="booking-guide-card">
            <div className="booking-guide-card-row">
                <div className="booking-guide-card-middle">
                    <div className="booking-guide-card-middle-left">
                        <img src={data.imagen} alt="Guide" className="booking-guide-image" />
                    </div>
                    <div className="booking-guide-card-middle-center">
                        <span className="booking-guide-name">{data.nombre}</span>
                        <div>
                            <span className={`booking-transport-status ${data.transporte ? 'with-transport' : 'without-transport'}`}>
                                {data.transporte ? 'Con Transporte' : 'Sin Transporte'}
                            </span>
                        </div>
                        <div className="booking-guide-tags">
                            {data.etiquetas.map((tag, index) => tag && <span key={index}>{tag}</span>)}
                        </div>
                    </div>
                    <div className="booking-guide-card-middle-right">
                        <div className="booking-guide-rating">{data.valoracion} <img src={starIcon} alt="star rating" className="booking-star-icon" /></div>
                        <span className="booking-guide-price">S/.{data.precio}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingGuideCard;