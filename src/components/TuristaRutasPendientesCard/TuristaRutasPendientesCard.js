import React, {useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceOfertContext } from "../../context/PlaceOfertContext";
import { PrivateRoutes } from '../../routes';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './TuristaRutasPendientesCard.css';
import { PlaceGuideContext } from '../../context/PlaceGuideContext';

const TuristaRutasPendientesCard = ({ data }) => {
  const fecha = `${data.day}-${data.month}-2023`;
  const cantidad = data.persons;
  const estado = data.status;
  const { setPlacesOfert } = useContext(PlaceOfertContext)
  const { setIsOfert, setJustView } = useContext(RoutesFlagsContext)
  const { setGuideTourData, setTransportTourData }  = useContext(PlaceGuideContext)
  const navigate = useNavigate();
  
  const handleMoreInfo = () =>{
    setPlacesOfert({...data});
    setIsOfert(true);
    setJustView(true);
    navigate(`../${PrivateRoutes.OFERTROUTE}`);
  }

  const handleOfertGuide = () =>{
    setPlacesOfert({...data});
    setIsOfert(true);
    setGuideTourData(null)
    navigate(`../${PrivateRoutes.GUIDEOFFERTPAGE}`);
  }

  const handleOfertTransport = () =>{
    setPlacesOfert({...data});
    setIsOfert(true);
    setTransportTourData(null)
    navigate(`../${PrivateRoutes.TRANSPORTOFFERTPAGE}`);
  }

  const handleConfirmTransport = async () =>{
     try {
        const requestRef = doc(db, 'RequestPlaces', data.id);
        const queryUpdate = {
          status: 'Confirmado',
        };
        await updateDoc(requestRef, queryUpdate);
    } catch (error) {
        console.log(error);
    }  
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
      {data.status === "Por Confirmar" && 
        <div className="TuristaRutasPendientesCard-card-row">
          <span>Transporte:</span>
          <span>{data.transporte?.ownerName ?? data.guia?.guideName}</span>
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
          <button className="TuristaRutasPendientesCard-btn" onClick={handleConfirmTransport}>Confirmar</button>
        }
      </div>

    </div>
  );
};

export default TuristaRutasPendientesCard;