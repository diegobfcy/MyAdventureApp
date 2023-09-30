import React from 'react';
import './styles.css';  
import starIcon from '../../assets/icons/starIcon.png';
function LugarCardSmall({ data, isVisible }) {
  return (
    <div className={`lugarCardSmall ${isVisible ? 'animate-card' : ''}`}>
    <div className="imageContainer" style={{ backgroundImage: `url(${data.imagen[0]})` }}></div>

    <div className="cardInfo1">
      <div className="cardHeader1">
        <h3>{data.nombre}</h3>
        <div className="cardRating1">
          {data.valoracion}
          <img src={starIcon} alt="Rating" className="ratingIcon1" />
        </div>
      </div>

      <div className="cardTags1">
        {data.etiquetas.map((tag, index) => tag && <span key={index}>{tag}</span>)}
      </div>

      <p>{data.descripcion}</p>
    </div>
  </div>
  );
}

export default LugarCardSmall;