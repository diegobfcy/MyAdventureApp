import React, {useState} from 'react';
import './GuideCard.css';
import starIcon from '../../assets/icons/starIcon.png';  // Asegúrate de tener este archivo en la ubicación adecuada
import plusIcon from '../../assets/icons/plus 1.png';  
import arrowIconRight from '../../assets/icons/arrowIconRight.png'; 
import arrowIcon from '../../assets/icons/arrowIcon.png';
import GuideProfile from '../GuideProfile/GuideProfile';
import { Link } from 'react-router-dom';

function GuideCard({data}) {
    const [showProfile, setShowProfile] = useState(false);

    const handleProfileClick = () => {
        setShowProfile(true);
    }
    const handleAddClick = () => {
        // Almacenar el objeto data en localStorage
        localStorage.setItem('guideData', JSON.stringify(data));
    
        // Navegar a BookingPage (esto asume que estás usando el historial de react-router-dom)
        // Si no es así, el click en el botón con el Link debería ser suficiente.
        // history.push('/bookingPage');
    }
    return (
        <div className="guide-card">
            <div className="guide-card-row">
                <div className="guide-card-left">
                <Link to="/bookingPage">
                    <button className="btn-add" onClick={handleAddClick}>
                        <img src={plusIcon} alt="Add icon" />
                    </button>
                </Link>
                </div>
                <div className="guide-card-middle">
                    <div className="guide-card-middle-left">
                        <img src={data.imagen} alt="Guide" className="guide-image"/>
                    </div>
                    <div className="guide-card-middle-center">
                        <span className="guide-name">{data.nombre}</span>
                        <div>
                            <span className={`transport-status ${data.transporte ? 'with-transport' : 'without-transport'}`}>
                                {data.transporte ? 'Con Transporte' : 'Sin Transporte'}
                            </span>
                        </div>
                        <div className="guide-tags">
                            {data.etiquetas.map((tag, index) => tag && <span key={index}>{tag}</span>)}
                        </div>
                    </div>
                    <div className="guide-card-middle-right">
                        <div className="guide-rating">{data.valoracion} <img src={starIcon} alt="star rating" className="star-icon" /></div>
                        <span className="guide-price">S/.{data.precio}</span>
                    </div>
                </div>
                <div className="guide-card-right">
                <button className="btn-profile" onClick={handleProfileClick}>
                    <img src={arrowIcon} alt="Profile icon" />
                </button>
                </div>
            </div>
                {showProfile && <GuideProfile guideData={data} />}

        </div>
        
    );
}

export default GuideCard;