import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { PlaceOfertContext } from "../../context/PlaceOfertContext";
import { PrivateRoutes } from '../../routes';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';
import './GuideRutasPendientesCard.css';

const GuideRutasPendientesCard = ({data}) => {
  const fecha = `${data.day}-${data.month}-2023`;
  const cantidad = data.persons;
  const nombre = data.username;
  const { setPlacesOfert } = useContext(PlaceOfertContext)
  const { setIsOfert } = useContext(RoutesFlagsContext)
  const navigate = useNavigate();

  const handleMoreInfo = () =>{
    setPlacesOfert({...data});
    setIsOfert(true);
    navigate(`../${PrivateRoutes.OFERTROUTE}`);
  }

  return (
    <div className="GuideRutasPendientesCard-guide-card-container">
      <div className="GuideRutasPendientesCard-guide-card-row">
        <span>Nombre del usuario:</span>
        <span>{nombre}</span>
      </div>
      <div className="GuideRutasPendientesCard-guide-card-row">
        <span>Fecha:</span>
        <span>{fecha}</span>
      </div>
      <div className="GuideRutasPendientesCard-guide-card-row">
        <span>Estado:</span>
        <span>{data.status}</span>
      </div>
      <div className="GuideRutasPendientesCard-guide-card-row">
        <span>Cantidad de personas:</span>
        <span>{cantidad}</span>
      </div>
      <div className="GuideRutasPendientesCard-guide-card-row">
        <span>Precio:</span>
        <span>{data.price}</span>
      </div>
      <div className="GuideRutasPendientesCard-guide-card-row">
            <button className="GuideRutasPendientesCard-btn" onClick={handleMoreInfo}>Sobre la Ruta</button>
      </div>
    </div>
  );
};
 
export default GuideRutasPendientesCard;