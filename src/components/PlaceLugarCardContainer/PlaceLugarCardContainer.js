import React, { useContext } from 'react';
import OfertaLugarCard from '../OfertaLugarCard/OfertaLugarCard';
import { useNavigate } from 'react-router-dom';
import { PlaceOfertContext } from '../../context/PlaceOfertContext';
import { UserLogedContext } from '../../context/UserLogedContext';
import { RoutesFlagsContext } from '../../context/RoutesFlagsContext';
import { doc, deleteDoc} from 'firebase/firestore' 
import { db } from '../../firebaseConfig'
import './PlaceLugarCardContainer.css';
import { PrivateRoutes } from '../../routes';

function PlaceLugarCardContainer({ isVisible, onClose }) {
    const { placesOfert, setPlacesOfert } = useContext( PlaceOfertContext);
    const navigate = useNavigate();
    const animationClass = isVisible ? 'slideIn' : 'slideOut';

    const deleteOfert = async () => {
        await deleteDoc(doc(db, 'RequestPlaces', placesOfert.id));
        resetOFert();
    }

    const resetOFert = () => {
        navigate(`../${PrivateRoutes.USERPAGE}`);
            setPlacesOfert({
                places: [],
            });
    }

    return (
        <div className={`OfertaLugarCardContainer-card-container ${animationClass}`}>
            <div className="OfertaLugarCardContainer-title">
                Rutas del paseo:
            </div>

            <div className='OfertaLugarCardContainer-enviarOfertaBtn'>
                <button className="OfertasLugarCardContainer-OfertaBtn" onClick={resetOFert}>
                    Cancelar
                </button>
                <button className="OfertasLugarCardContainer-OfertaBtn" onClick={deleteOfert}>
                    Eliminar Oferta
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

export default PlaceLugarCardContainer;