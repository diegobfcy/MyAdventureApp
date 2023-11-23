import React, {useState, useEffect, useContext} from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import { useNavigate } from 'react-router-dom';
import 'firebase/database';
import './TransportOfertPage.css';
import BookingGuideCard from '../../components/BookingGuideCard/BookingGuideCard';
import { collection, getDocs, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import TransportCard from '../../components/TransportCard/TransportCard';
import PopupComponent from '../../components/ConfirmationPopUp/ConfirmationPopUp'
import { CSSTransition } from 'react-transition-group';
import { PlaceOfertContext } from '../../context/PlaceOfertContext';
import { PlaceGuideContext } from '../../context/PlaceGuideContext';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';
import { PrivateRoutes } from '../../routes';


const fetchTransportsFromFirebase = async () => {
    const q = collection(db, 'Transport');
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};

function TransportOfertPage() {
    const [transports, setTransports] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false); 
    const [inProp, setInProp] = useState(false);
    const { placesOfert, setPlacesOfert } = useContext(PlaceOfertContext)
    const { setIsOfert } = useContext(RoutesFlagsContext)
    const { transportTourData } = useContext(PlaceGuideContext)

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
        reservationTransport();
    };

    const reservationTransport = async () => {
        try {
        const requestRef = doc(db, 'RequestPlaces', placesOfert.id);
        const queryUpdate = {
            status: 'Por Confirmar',
            transporte: transportTourData,
            ofertsTransport: deleteField(),
            price: (parseInt(placesOfert.price) || 0) + (parseInt(placesOfert.ofertsTransport[transportTourData.email]?.price) || 0),
        };

        await updateDoc(requestRef, queryUpdate);

        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        const fetchTransports = async () => {
            const fetchedTransports = await fetchTransportsFromFirebase();
            const transportes = placesOfert.ofertsTransport
            ? fetchedTransports.filter((guia) => Object.keys(placesOfert.ofertsTransport).includes(guia.email))
            : [];
            setTransports(transportes);
        };
    
        fetchTransports();
    }, [placesOfert]);

    const resetOFert = () => {
        navigate(`../${PrivateRoutes.USERPAGE}`);
        setPlacesOfert({
        places: [],
        });
        setIsOfert(false);
    };

    return (
        <CSSTransition in={inProp} timeout={1000} classNames="slide">
        <div>
            <Toolbar />
            <div className="container">
                <div className="half-screen-left">
                    <div className="sub-container text-line-container">
                        <span className="transport-ofert-text">Tu Guia</span>
                        <div className="line"></div>
                    </div>

                    <div className="sub-container">
                        {placesOfert.guia ? 
                        <BookingGuideCard data={placesOfert.guia} precio={placesOfert.price}/> 
                        : "No tienes asignado un guia"}
                    </div>

                    <div className="sub-container text-line-container">
                        <span className="transport-ofert-text">Escoge tu Transporte</span>
                        <div className="line"></div>
                    </div>

                    <div className="sub-container-transportes-container">
                    {
                        transports.map((transport, idx) => (
                            <TransportCard 
                                key={idx}
                                data={transport}
                                precio={placesOfert.ofertsTransport?.[transport.email]?.price ?? ''}
                            />
                        ))
                    }
                    </div>
                    <button className="regresar-btn" onClick={resetOFert}>
                        Regresar
                    </button>
                </div>
                <div className="half-screen-right">
                    <div className="summary-container">
                        <span className="duration-text">Duración: 9:00 - 17:00</span>

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
                        <div className="guide-title-summary">Guia</div>
                        <div className="guide-line-summary"></div>
                        <div className="guide-summary">  
                            <span>{placesOfert.guia ? placesOfert.guia.guideName : "Aun no tienes Guia"}</span>
                            <span>{placesOfert.price ? `S./${placesOfert.price}` : ""}</span>
                        </div>
                        <div className="transport-title-summary">Transporte</div>
                        <div className="transport-line-summary"></div>
                        <div className="transport-summary">
                            <span>{transportTourData?.ownerName || "No seleccionado"}</span>
                            <span>S/. {placesOfert?.ofertsTransport?.[transportTourData?.email]?.price || 0}</span>
                        </div>
                         <div className="transport-summary">
                            <span>{transportTourData ?  transportTourData.description :  ""}</span>
                        </div>
                        <div className="total-title-summary">Total</div>
                        <div className="total-line-summary"></div>
                        <div className="total-summary">
                                <span>Total</span>
                                <span>S/. {+(placesOfert.price ?? 0) + (transportTourData && placesOfert.ofertsTransport ? +(placesOfert.ofertsTransport[transportTourData.email]?.price ?? 0) : 0)}</span>
                        </div>
                        {transportTourData && <button className="reservation-btn" onClick={handleReservation}>Generar Reserva</button>}
                        <PopupComponent isVisible={popupVisible} />
                    </div>
                </div>

                
            </div>
        </div>
        </CSSTransition>
    );    

}

export default TransportOfertPage;