import React, {useContext } from 'react';
import './GuideRutasDisponiblesCard.css';
import { useNavigate } from 'react-router-dom';
import { PlaceOfertContext } from "../../context/PlaceOfertContext";
import { PrivateRoutes } from '../../routes';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';

const GuideRutasDisponiblesCard = ({ data }) => {
  const { setPlacesOfert } = useContext(PlaceOfertContext)
  const { setIsOfert } = useContext(RoutesFlagsContext)
  const fecha = `${data.day}-${data.month}-2023`;
  const cantidad = data.persons;
  const nombre = data.username;
  const navigate = useNavigate();
  
  const handleMoreInfo = () =>{
    setPlacesOfert(data);
    setIsOfert(true);
    navigate(`../${PrivateRoutes.OFERTROUTE}`);
  }

  return (
    <div className="GuideRutasDisponiblesCard-card-container">
      <div className="GuideRutasDisponiblesCard-card-row">
        <span>Fecha:</span>
        <span>{fecha}</span>
      </div>
      <div className="GuideRutasDisponiblesCard-card-row">
        <span>Nombre del usuario:</span>
        <span>{nombre}</span>
      </div>
      <div className="GuideRutasDisponiblesCard-card-row">
        <span>Cantidad de personas:</span>
        <span>{cantidad}</span>
      </div>
      <div className="GuideRutasDisponiblesCard-card-row">
        <button className="GuideRutasDisponiblesCard-btn" onClick={handleMoreInfo}>Mas detalles y dar oferta</button>
      </div>
    </div>
  );
};

export default GuideRutasDisponiblesCard;