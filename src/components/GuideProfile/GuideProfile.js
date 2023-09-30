import React from 'react';
import './GuideProfile.css';
import starIcon from '../../assets/icons/starIcon.png';
import ReviewsContainer from '../ReviewCardContainer/ReviewCardContainer';

function GuideProfile({ guideData }) {
    return (
        <div className="guide-profile">
            <img src={guideData.background} alt="Guide background" className="background-image"/>
            <div className="profile-content">
                <div className="guide-details">
                    <img src={guideData.imagen} alt="Guide profile" className="guide-profile-image" />
                    <div className='guide-profile-name'>{guideData.nombre}</div>
                    <div className="tags-container">
                        {guideData.etiquetas.map((tag, index) => tag && <span key={index}>{tag}</span>)}
                    </div>
                </div>
                <div className="rating-viajes-container">
                    <div className="guide-profile-rating">
                        {guideData.valoracion} <img src={starIcon} alt="star rating" className="star-icon" />
                    </div>
                    <div className="guide-profile-viajes">
                        Viajes: {guideData.viajes}
                    </div>
                </div>
            </div>
            <div className="about-container">
                <h3>Sobre Mi</h3>
                <div className="description-container">
                    <p>{guideData.descripcion}</p>
                </div>
            </div>
            <div className="reviews-container">
                <h3>Reseñas</h3>
                <div className="rev-container">
                    <ReviewsContainer/>
                </div>
            </div>
        </div>
    );
}

export default GuideProfile;
