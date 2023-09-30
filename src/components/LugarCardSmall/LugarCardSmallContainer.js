import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import LugarCardSmall from './LugarCardSmall';
import './styles.css';  
import nextIcon from '../../assets/icons/arrowIconRight.png';
import prevIcon from '../../assets/icons/arrowIconLeft.png';
import VisibilitySensor from 'react-visibility-sensor'; // Añade esto

function LugarCardSmallContainer() {
  function changePage(direction) {
    return (e) => {
      e.preventDefault();  // Evita el comportamiento predeterminado
      if (direction === "next") {
        setCurrentPage(prev => prev + 1);
      } else if (direction === "previous") {
        setCurrentPage(prev => prev - 1);
      }
    }
  }
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);


  
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'Lugares'), limit(15 * (currentPage + 1)));
      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map(doc => doc.data()));
      console.log(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className='mainContainer1'>
      <h1 className="headerText1">EXPERIENCIAS QUE NO TE PUEDES PERDER!</h1>
      <div className="headerLine1"></div>
        <div className="CardSmallContainer">
          {data.slice(currentPage * 15, (currentPage + 1) * 15).map((item, index) => (
            <VisibilitySensor key={index} partialVisibility>
              {({ isVisible }) => <LugarCardSmall isVisible={isVisible} data={item} />}
            </VisibilitySensor>
          ))}
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              <img src={prevIcon} alt="Anterior" />
            </button>
            <button onClick={() => setCurrentPage(prev => prev + 1)}>
              <img src={nextIcon} alt="Siguiente" />
            </button>
          </div>
        </div>
      </div>        
  );

}


export default LugarCardSmallContainer;