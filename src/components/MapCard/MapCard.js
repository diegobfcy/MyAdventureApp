import React from 'react';
import './MapCard.css';  
import starIcon from '../../assets/icons/starIcon.png';
function MapCard({ data }) {
  return (
    <div className="MapCard">
    <div className="imageContainerMapCard" style={{ backgroundImage: `url(${data.imagen[0]})` }}></div>

    <div className="MapCardInfo">
      <div className="MapCardHeader">
        <h3>{data.nombre}</h3>
        <div className="MapCardRating">
          {data.valoracion}
          <img src={starIcon} alt="Rating" className="MapCardRatingIcon" />
        </div>
      </div>

    </div>
  </div>
  );
}

export default MapCard;