import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import GuideRutasPendientesCard from "../GuideRutasPendientesCard/GuideRutasPendientesCard";
import GuideRutasDisponiblesCard from "../GuideRutasDisponiblesCard/GuideRutasDisponiblesCard";
import './GuideMainComponent.css';
import { UserLogedContext } from "../../context/UserLogedContext";
 
function GuideOverlay() {
  const [dataDisponible, setDataDisponible] = useState([]);
  const [dataOffered, setDataOffered] = useState([]);
  const { userLogedData } = useContext(UserLogedContext)

  useEffect(() => {
    const fetchDataRutasDisponibles = async () => {
      const q = query(collection(db, 'RequestPlaces'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(request => ({
        ...request.data(),
        id: request.id,
      }));

      const dataAvaible = filterData(data);
      setDataDisponible(dataAvaible.notOffered);
      setDataOffered(dataAvaible.offered);
    }
    fetchDataRutasDisponibles();
  }, []);

  const filterData = (data)=>{
    const result = data.reduce(
      (accumulator, objeto) => {
        if (objeto.hasOwnProperty("oferts") && objeto.oferts.hasOwnProperty(userLogedData.email)) {
          accumulator.offered.push(objeto) 
        } else { 
          accumulator.notOffered.push(objeto);
        }      
        return accumulator;
      },
      { offered: [], notOffered: [] }
    );
    return result;
  }

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
          {dataOffered.map((item, key) => (
            <GuideRutasDisponiblesCard key={key} data={item} offered={true}/>
          ))}
          {dataDisponible.map((item, key) => (
            <GuideRutasDisponiblesCard key={key} data={item} offered={false}/>
          ))}
          {dataDisponible.length === 0 && dataOffered.length === 0 && (
            <p style={{ height: '800px' }}>No hay peticiones disponibles</p>
          )}
        </div>
      </div>
    </div>

  );

}

export default GuideOverlay;