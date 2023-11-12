import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CSSTransition } from 'react-transition-group';
import Toolbar from '../../components/Toolbar/Toolbar';
import BookingGuideCard from '../../components/BookingGuideCard/BookingGuideCard';
import PopupComponent from '../../components/ConfirmationPopUp/ConfirmationPopUp';
import { PlaceGuideContext } from '../../context/PlaceGuideContext';
import { PlaceOfertContext } from '../../context/PlaceOfertContext';
import { PrivateRoutes } from '../../routes';
import './GuideOfertPage.css';

const fetchGuidesFromFirebase = async () => {
  const q = collection(db, 'Guide');
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

function GuideOfertPage() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [inProp, setInProp] = useState(false);
  const { guideTourData } = useContext(PlaceGuideContext);
  const [guides, setGuides] = useState([]);
  const { placesOfert, setPlacesOfert } = useContext(PlaceOfertContext);
  const navigate = useNavigate();

  useEffect(() => {
    setInProp(true);
    return () => setInProp(false);
  }, []);

  const handleReservation = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      resetOFert();
    }, 5000);
    reservationGuide();
  };

  const reservationGuide = async () => {
    try {
      const requestRef = doc(db, 'RequestPlaces', placesOfert.id);
      const queryUpdate = {
        status: placesOfert.oferts[guideTourData.email].transport ? 'Por Confirmar' : 'Transporte Pendiente',
        guia: guideTourData,
        oferts: deleteField(),
        price: placesOfert.oferts[guideTourData.email].price,
      };

      await updateDoc(requestRef, queryUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchGuides = async () => {
      const fetchedGuides = await fetchGuidesFromFirebase();
      const guides = placesOfert.oferts
        ? fetchedGuides.filter((guia) => Object.keys(placesOfert.oferts).includes(guia.email))
        : [];
      setGuides(guides);
    };
    fetchGuides();
  }, [placesOfert]);

  const resetOFert = () => {
    navigate(`../${PrivateRoutes.USERPAGE}`);
    setPlacesOfert({
      places: [],
    });
  };

  return (
    <CSSTransition in={inProp} timeout={1000} classNames="slide">
      <div>
        <Toolbar />
        <div className="container">
          <div className="half-screen-left">
            <div className="text-line-container">
              <span className="booking-text">Tu Guia</span>
              <div className="line"></div>
            </div>

            <div className="sub-container">
              {guides.map((guide, idx) => (
                <BookingGuideCard
                  key={idx}
                  data={guide}
                  transporte={placesOfert.oferts ? placesOfert.oferts[guide.email].transport : ''}
                  precio={placesOfert.oferts ? placesOfert.oferts[guide.email].price : ''}
                />
              ))}
            </div>
            <button className="regresar-btn" onClick={resetOFert}>
              Regresar
            </button>
          </div>

          <div className="half-screen-right">
            <div className="summary-container">
              <span className="duration-text">Duración: 9:00 - 17:00</span>

              {placesOfert.oferts && (
                <div className="date-and-people-container">
                  <div className="date-container">
                    <span>
                      {placesOfert.day} de {placesOfert.month} del 2023
                    </span>
                  </div>
                  <div className="people-container">
                    <span>Número de personas: {placesOfert.persons}</span>
                  </div>
                </div>
              )}
              {guideTourData && placesOfert.oferts ? (
                <>
                  <div className="guide-title-summary">Guia</div>
                  <div className="guide-line-summary"></div>
                  <div className="guide-summary">
                    <span>{guideTourData.guideName}</span>
                    <span>S/.{placesOfert.oferts[guideTourData.email].price}</span>
                  </div>
                  <div className="transport-title-summary">Datos del Guia</div>
                  <div className="transport-line-summary"></div>
                  <div className="transport-summary">
                    <span>Transporte: </span>
                    <span>
                      {placesOfert.oferts[guideTourData.email].transport
                        ? 'Con transporte'
                        : 'Sin transporte'}
                    </span>
                  </div>
                  <div className="transport-summary">
                    <span>Edad: </span>
                    <span>{guideTourData.age} años</span>
                  </div>
                  <div className="transport-summary">
                    <span>N° de viajes: </span>
                    <span>{guideTourData.viajes}</span>
                  </div>
                  <div className="total-title-summary">Descripción</div>
                  <div className="total-line-summary"></div>
                  <div className="total-summary">
                    <span>{guideTourData.description}</span>
                  </div>
                  <button className="reservation-btn" onClick={handleReservation}>
                    Generar Reserva
                  </button>
                </>
              ) : (
                <>
                  <div className="guide-title-summary">Guia</div>
                  <div className="guide-line-summary"></div>
                  <div className="guide-summary">
                    <span>
                      {placesOfert.oferts
                        ? 'Seleccione un guia'
                        : "Aun no hay ofertas :'("}
                    </span>
                    <span></span>
                  </div>
                </>
              )}
              <PopupComponent isVisible={popupVisible} />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default GuideOfertPage;
