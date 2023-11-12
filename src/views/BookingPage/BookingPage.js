import React, {useState, useEffect, useContext} from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import { useLocation } from 'react-router-dom';
import GuideCard from '../../components/GuideCard/GuideCard';
import LugarCardLarge from '../../components/LugarCardLarge/LugarCardLarge';// Ajusta la ruta si es necesario
import './BookingPage.css'
import 'firebase/database';
import AddData from '../../components/AddData/AddData';
import LugarCardSmallContainer from '../../components/LugarCardSmallContainer/LugarCardSmallContainer';
import './BookingPage.css';
import BookingGuideCard from '../../components/BookingGuideCard/BookingGuideCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import TransportCard from '../../components/TransportCard/TransportCard';
import arrowIcon from '../../assets/icons/arrowIcon.png'
import PopupComponent from '../../components/ConfirmationPopUp/ConfirmationPopUp'
import { CSSTransition } from 'react-transition-group';
import { PlaceOfertContext } from '../../context/PlaceOfertContext';

const fetchTransportsFromFirebase = async () => {
    const q = collection(db, 'Transportes');
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};


function BookingPage() {
    const location = useLocation();
    const storedGuideData = localStorage.getItem('guideData');
    const guideData = storedGuideData ? JSON.parse(storedGuideData) : null;
    const [transports, setTransports] = useState([]);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false); // Estado para controlar la visibilidad del pop-up
    const [inProp, setInProp] = useState(false);
    
    const { placesOfert } = useContext(PlaceOfertContext)

    console.log(placesOfert)

    useEffect(() => {
      setInProp(true);
      return () => setInProp(false); // Esto establecerá el estado inProp en false cuando se desmonte el componente
    }, []);
  
    const handleReservation = () => {
        setPopupVisible(true); // Mostrar el pop-up
        setTimeout(() => {
            setPopupVisible(false); // Ocultar el pop-up después de 5 segundos, por ejemplo
        }, 5000);
    };
    const handleTransportSelection = (transport) => {
        setSelectedTransport(transport);
    }
    
    useEffect(() => {
        const fetchTransports = async () => {
            const fetchedTransports = await fetchTransportsFromFirebase();
            setTransports(fetchedTransports);
        };
    
        fetchTransports();
    }, []);
    console.log(guideData);
    return (
        <CSSTransition in={inProp} timeout={1000} classNames="slide">
        <div>
            <Toolbar />
            <div className="container">
                {/* Contenedor de la izquierda */}
                <div className="half-screen-left">
                    {/* Primer contenedor con texto y línea */}
                    <div className="sub-container text-line-container">
                        <span className="booking-text">Tu Guia</span>
                        <div className="line"></div>
                    </div>

                    {/* Contenedor de GuideCard */}
                    <div className="sub-container">
                        
                    </div>

                    {/* Otro contenedor con texto y línea */}
                    <div className="sub-container text-line-container">
                        <span className="booking-text">Escoge tu Transporte</span>
                        <div className="line"></div>
                    </div>

                    {/* Contenedor vacío de transporte */}
                    <div className="sub-container-transportes-container">
                    {
                        transports.map((transport, idx) => (
                            <TransportCard 
                                key={idx}
                                data={transport}
                                onTransportSelected={handleTransportSelection}
                            />
                        ))
                    }
                    </div>
                </div>

                {/* Contenedor de la derecha (aún vacío) */}
                <div className="half-screen-right">
                    <div className="summary-container">
                        <span className="duration-text">Duración: 9:00 - 17:00</span>

                        <div className="date-and-people-container">
                            <div className="date-container">
                                <span>19/09/23</span>
                                <img src={arrowIcon} alt="Arrow-Icon" className='arrow-icon-booking-page' />
                            </div>
                            <div className="people-container">
                                <span>2 Adultos 1 Niño</span>
                                <img src={arrowIcon} alt="Arrow-Icon" className='arrow-icon-booking-page'/>
                            </div>
                        </div>
                        <div className="guide-title-summary">Guia</div>
                        <div className="guide-line-summary"></div>
                        <div className="guide-summary">
                            
                            <span>Fernando</span>
                            <span>S/. 500</span>
                        </div>
                        <div className="transport-title-summary">Transporte</div>
                        <div className="transport-line-summary"></div>
                        <div className="transport-summary">
                            
                            <span>{selectedTransport?.dueño || "No seleccionado"}</span>
                            <span>S/. {selectedTransport?.precio || "0.00"}</span>
                        </div>
                        <div className="total-title-summary">Total</div>
                        <div className="total-line-summary"></div>
                        <div className="total-summary">
                            
                                <span>Total</span>
                                <span>S/. {(parseInt(guideData?.precio || 0) + parseInt(selectedTransport?.precio || 0))}</span>
                            
                        </div>

                        <button className="reservation-btn" onClick={handleReservation}>Generar Reserva</button>
                        <PopupComponent isVisible={popupVisible} />
                    </div>
                </div>

                
            </div>
        </div>
        </CSSTransition>
    );    

}

export default BookingPage;