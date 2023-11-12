import React, { useContext, useState } from 'react';
import OfertaLugarCard from '../OfertaLugarCard/OfertaLugarCard';
import { useNavigate } from 'react-router-dom';
import { PlaceOfertContext } from '../../context/PlaceOfertContext';
import { UserLogedContext } from '../../context/UserLogedContext';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';
import { doc, updateDoc} from 'firebase/firestore' 
import { db } from '../../firebaseConfig'
import './OfertaLugarCardContainer.css';
import { PrivateRoutes } from '../../routes';

function OfertaLugarCardContainer({ isVisible, onClose }) {
    const { placesOfert, setPlacesOfert } = useContext( PlaceOfertContext);
    const { setIsOfert } = useContext(RoutesFlagsContext)
    const { userLogedDataCollection } = useContext(UserLogedContext)
    const UserEmail = userLogedDataCollection.email;
    const rol = userLogedDataCollection.rol
    const docElement = userLogedDataCollection.rol === "Guia" ? "oferts" : "ofertsTransport";

    const [ofertaValue, setOfertaValue] = useState(placesOfert.offered ? placesOfert[docElement][UserEmail].price : '');
    const [transporte, setTransporte] = useState(placesOfert.offered ? 'con transporte' : 'sin transporte');
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const animationClass = isVisible ? 'slideIn' : 'slideOut';

    const toggleVisibility = () => {
        onClose();
    };

    const handleSendOfert = () => {
        let errorMessage = '';
        if (ofertaValue <= 0) {
            errorMessage = 'El precio tiene que ser mayor a 0';
        } else {
            const ofert = {
            price: ofertaValue,
            username: `${userLogedDataCollection.name} ${userLogedDataCollection.surname}`,
            email: userLogedDataCollection.email,
            };

            if (rol === "Guia") {
            ofert.transport = transporte === "con transporte";
            updateRequestOfert(ofert);
            } else {
            updateRequestTransport(ofert);
            }
            resetOFert();
        }
        setErrorMessage(errorMessage);
    };


    const updateRequestOfert = async (updatedState) => {
        try {
            const requestRef = doc(db, 'RequestPlaces', placesOfert.id);
            const existingOferts = placesOfert.oferts || {};
            
            existingOferts[updatedState.email] = updatedState;
            await updateDoc(requestRef, { oferts: existingOferts });

            setOfertaValue('');
        } catch (error) {
            console.log(error);
        }
    }

    const updateRequestTransport = async (updatedState) => {
        try {
            const requestRef = doc(db, 'RequestPlaces', placesOfert.id);
            const existingOfertsTransport = placesOfert.ofertsTransport || {};
            
            existingOfertsTransport[updatedState.email] = updatedState;
            await updateDoc(requestRef, { ofertsTransport: existingOfertsTransport });

            setOfertaValue('');
        } catch (error) {
            console.log(error);
        }
    }

    const resetOFert = () => {
        navigate(`../${PrivateRoutes.USERPAGE}`);
            setPlacesOfert({
                places: [],
            });
        setIsOfert(false);
    }

    return (
        <div className={`OfertaLugarCardContainer-card-container ${animationClass}`}>
            <div className="OfertaLugarCardContainer-title">
                Ingresa tu oferta:
                <input
                    type="number"
                    value={ofertaValue}
                    onChange={(e) => setOfertaValue(e.target.value)}
                    placeholder="Escribe tu oferta aquí"
                    min="1"
                />
            </div>
            {rol === "Guia" &&
            <div className="OfertaLugarCardContainer-transporteOptions">
                <label>
                    <input
                        type="radio"
                        value="con transporte"
                        checked={transporte === 'con transporte'}
                        onChange={(e) => setTransporte(e.target.value)}
                    />
                    Con transporte
                </label>
                <label>
                    <input
                        type="radio"
                        value="sin transporte"
                        checked={transporte === 'sin transporte'}
                        onChange={(e) => setTransporte(e.target.value)}
                    />
                    Sin transporte
                </label>

            </div>
            } 
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className='OfertaLugarCardContainer-enviarOfertaBtn'>
                <button className="OfertaLugarCardContainer-OfertaBtn" onClick={handleSendOfert}>
                    Enviar Oferta
                </button>
                <button className="OfertaLugarCardContainer-OfertaBtn" onClick={resetOFert}>
                    Cancelar
                </button>
            </div>
            <div className="OfertaLugarCardContainer-divider"></div>
            {
                placesOfert.places.map((oferta, idx) => (
                    <OfertaLugarCard
                        key={idx}
                        data={oferta}
                    />
                ))
            }
        </div>
    );
}

export default OfertaLugarCardContainer;