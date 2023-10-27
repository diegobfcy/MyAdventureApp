import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import GuideRutasPendientesCard from "../GuideRutasPendientesCard/GuideRutasPendientesCard";
import GuideRutasDisponiblesCard from "../GuideRutasDisponiblesCard/GuideRutasDisponiblesCard";
import './GuideMainComponent.css';
import { UserLogedContext } from "../../context/UserLogedContext";

function GuideOverlay() {
  const [dataDisponibles, setDataDisponibles] = useState([]);
  const { userLogedData } = useContext(UserLogedContext)

  useEffect(() => {
    const fetchDataRutasDisponibles = async () => {
      const q = query(collection(db, 'RequestPlaces'));
      const querySnapshot = await getDocs(q);
      setDataDisponibles(querySnapshot.docs.map(request => ({
        ...request.data(),
        id: request.id,
      })).filter(objeto => {
          if (objeto.hasOwnProperty("oferts")) {
              const oferts = objeto.oferts.filter(oferta => oferta.email === userLogedData.email);
              return oferts.length === 0;
          }
          return true;
      }));
    }
    fetchDataRutasDisponibles();
  }, []);

  return (
    
    <div className="GuideMainComponent">
      <div className="GuideMainComponent-RutasPendientes">
        <div>
          <GuideRutasPendientesCard 
            nombre="Juan Pérez" 
            fecha="20-10-2023" 
            estado="Pendiente" 
            cantidad="3" 
            precio="$100" 
          />
        </div>
      </div>
      <div className="GuideMainComponent-RutasDisponibles">
        <div>
          {dataDisponibles.map((item, key) => (
            <GuideRutasDisponiblesCard key={key} data={item}/>
          ))}
          {dataDisponibles.length === 0 && (
            <p style={{ height: '800px' }}>No hay peticiones disponibles</p>
          )}
        </div>
      </div>
    </div>

  );

}

export default GuideOverlay;