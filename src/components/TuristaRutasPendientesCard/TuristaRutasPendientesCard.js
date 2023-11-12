import React, {useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceOfertContext } from "../../context/PlaceOfertContext";
import { PrivateRoutes } from '../../routes';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';
import './TuristaRutasPendientesCard.css';

const TuristaRutasPendientesCard = ({ data }) => {
  const fecha = `${data.day}-${data.month}-2023`;
  const cantidad = data.persons;
  const estado = data.status;
  const { setPlacesOfert } = useContext(PlaceOfertContext)
  const { setIsOfert } = useContext(RoutesFlagsContext)
  const navigate = useNavigate();
  
  const handleMoreInfo = () =>{
    setPlacesOfert({...data});
    setIsOfert(true);
    navigate(`../${PrivateRoutes.OFERTROUTE}`);
  }

  const handleOfertGuide = () =>{
    setPlacesOfert({...data});
    navigate(`../${PrivateRoutes.GUIDEOFFERTPAGE}`);
  }

  const handleOfertTransport = () =>{
    setPlacesOfert({...data});
    navigate(`../${PrivateRoutes.BOOKINGPAGE}`);
  }
  
  return (
    <div className="TuristaRutasPendientesCard-card-container" >
      <div className="TuristaRutasPendientesCard-card-row">
        <span>Fecha:</span>
        <span>{fecha}</span>
      </div>
      <div className="TuristaRutasPendientesCard-card-row">
        <span>Cantidad de personas:</span>
        <span>{cantidad}</span>
      </div>
      <div className="TuristaRutasPendientesCard-card-row">
        <span>Estado:</span>
        <span>{estado}</span>
      </div>
      { data.guia && 
        <div className="TuristaRutasPendientesCard-card-row">
          <span>Guia:</span>
          <span>{data.guia['guideName']}</span>
        </div>
      }
      { data.transporte || data.status === "Por Confirmar" && 
        <div className="TuristaRutasPendientesCard-card-row">
          <span>Transporte:</span>
          <span>{data.transporte ? data.transporte : data.guia['guideName']}</span>
        </div>
      }
      { data.price && 
        <div className="TuristaRutasPendientesCard-card-row">
          <span>Precio:</span>
          <span>S/. {data.price}</span>
        </div>
      }
      <div className="TuristaRutasPendientesCard-card-row">
        <button className="TuristaRutasPendientesCard-btn" onClick={handleMoreInfo}>Rutas</button>
        { !data.guia && 
          <button className="TuristaRutasPendientesCard-btn" onClick={handleOfertGuide}>Oferta Guias</button>
        }
        { data.status !== "Por Confirmar" && 
          <button className="TuristaRutasPendientesCard-btn" onClick={handleOfertTransport}>Oferta Transporte</button>
        }
        { data.status === "Por Confirmar" && 
          <button className="TuristaRutasPendientesCard-btn">Confirmar</button>
        }
      </div>

    </div>
  );
};

export default TuristaRutasPendientesCard;