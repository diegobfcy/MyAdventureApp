import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import GuideRutasPendientesCard from "../GuideRutasPendientesCard/GuideRutasPendientesCard";
import GuideRutasDisponiblesCard from "../GuideRutasDisponiblesCard/GuideRutasDisponiblesCard";
import './GuideMainComponent.css';
import { UserLogedContext } from "../../context/UserLogedContext";
 
function GuideOverlay() {
  const [dataDisponible, setDataDisponible] = useState([]);
  const [dataOffered, setDataOffered] = useState([]);
  const [dataPend, setDataPend] = useState([]);


  const { userLogedData, userLogedDataCollection } = useContext(UserLogedContext)
  const rol = userLogedDataCollection.rol;

  const statusAvaible = rol === "Guia" ? "Guía pendiente" : "Transporte Pendiente"
  const docElement = rol === "Guia" ? "oferts" : "ofertsTransport";


  useEffect(() => {
    const fetchDataRutasDisponibles = async () => {
      const q = query(collection(db, 'RequestPlaces'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(request => ({
        ...request.data(),
        id: request.id,
      }));
      const dataPending = data.filter((dataItem) => {
        return dataItem.hasOwnProperty(rol.toLowerCase()) && 
        dataItem[rol.toLowerCase()].email === userLogedData.email}
      );

      const dataAvaible = data.filter((data) => data.status === "A espera de Ofertas" || data.status === statusAvaible)
      const request = filterData(dataAvaible);
      setDataDisponible(request.notOffered);
      setDataOffered(request.offered);
      setDataPend(dataPending)
    }
    fetchDataRutasDisponibles();
  }, []);

  const filterData = (data)=>{
    const result = data.reduce(
      (accumulator, objeto) => {
        if (objeto.hasOwnProperty(docElement) && objeto[docElement].hasOwnProperty(userLogedData.email)) {
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
            data ={dataPend.length == 0 ? []: dataPend[0]} 
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