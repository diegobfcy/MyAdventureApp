import { useState, useEffect } from "react";
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import GuideRutasPendientesCard from "../GuideRutasPendientesCard/GuideRutasPendientesCard";
import GuideRutasDisponiblesCard from "../GuideRutasDisponiblesCard/GuideRutasDisponiblesCard";
import './GuideMainComponent.css';

function GuideOverlay() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'RequestPlaces'));
      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  console.log(data)

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
          <GuideRutasDisponiblesCard 
            nombre="Juan Pérez" 
            fecha="20-10-2023" 
            cantidad="3" 
          />
        </div>
      </div>
    </div>

  );

}

export default GuideOverlay;