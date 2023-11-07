import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import TuristaRutasPendientesCard from "../TuristaRutasPendientesCard/TuristaRutasPendientesCard";
import './TuristaCardRutasContainer.css';
import { UserLogedContext } from "../../context/UserLogedContext";
 

function TuristaCardRutasContainer({ onClose }) {
    const [dataPendiente, setDataPendiente] = useState([]);
    const { userLogedData } = useContext(UserLogedContext)

    useEffect(() => {
        const fetchDataRutasDisponibles = async () => {
        const q = query(collection(db, 'RequestPlaces'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(request => ({
            ...request.data(),
            id: request.id,
        }));

        const dataAvaible = data.filter( (place) => place.user === userLogedData.email);
        setDataPendiente(dataAvaible)

        }
        fetchDataRutasDisponibles();
    }, []);

    return (
        <div className="TuristaCardRutasContainerOverlay">
            <div className="TuristaCardRutasContainer-infoContainer">

                <div className="TuristaCardRutasContainer-leftContainer">
                    <h2 className="TuristaCardRutasContainer-title">Rutas Confirmadas</h2>
                    <div className="TuristaCardRutasContainer-cardContainer">
                        
                    </div>
                </div>

                <div className="TuristaCardRutasContainer-rightContainer">
                    <h2 className="TuristaCardRutasContainer-title">Rutas esperando oferta</h2>
                    <div className="TuristaCardRutasContainer-cardContainer"> 
                        {dataPendiente.map((item, key) => (
                            <TuristaRutasPendientesCard key={key} data={item} offered={false}/>
                        ))}
                        {dataPendiente.length === 0 && (
                            <p style={{ height: '800px' }}>No hay peticiones disponibles</p>
                        )}
                    </div>
                </div>

                <button className="TuristaCardRutasContainer-closeButton" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default TuristaCardRutasContainer;
