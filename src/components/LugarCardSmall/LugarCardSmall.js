import React,{ useContext , useState } from 'react';
import './LugarCardSmall.css';  
import starIcon from '../../assets/icons/starIcon.png';
import CardMasInformacion from '../CardMasInformacion/CardMasInformacion'
import ReactDOM from 'react-dom';
import { CartInfoContext } from '../../context/CartInfoContext';

function LugarCardSmall({ data, isVisible }) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { LugarCardAdded , setLugarCardAdded } = useContext( CartInfoContext)

  const OnSelectPlace = (placeData) => {
    if(!LugarCardAdded.places.includes(placeData)){
      setLugarCardAdded(
        prev => ({
            ...prev,
            places: [...prev.places, placeData],
        }));
    }
  };

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
        <div className="cardButtons">
        {showMoreInfo && ReactDOM.createPortal(
          <CardMasInformacion onClose={() => setShowMoreInfo(false)} data={data}/>,
          document.body
        )}
          <button className="customButton" onClick={() => setShowMoreInfo(true)}>Mas Informacion</button>
        
          <button className="customButton" onClick={() => OnSelectPlace(data)}>Agregar a mi ruta</button>
        </div>
      </div>
    </div>
  );
}

export default LugarCardSmall;