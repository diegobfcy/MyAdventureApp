import React, { useState, useEffect } from 'react';
import starIcon from '../../assets/icons/starIcon.png';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Actualiza la ruta de importación según tu estructura
import './LugarCardLarge.css';  // Importa tus estilos si los tienes
import arrowIcon from '../../assets/icons/arrowIcon.png';

function LugarCardLarge() {
  const [data, setData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'Lugares', 'lugar');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (data?.imagen?.length || 1));
        setIsFading(false);
      }, 1000); // espera 1 segundo (la duración de la animación) antes de cambiar la imagen
    }, 6000); // cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [data]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className='mainContainer'>
      <h1 className="headerText">Recomendaciones para tu aventura</h1>
      <div className="headerLine"></div>
        <div className="cardLarge">
          <div className="cardImageContainer">
            <img src={data.imagen[currentImageIndex]} alt={data.nombre} style={isFading ? { opacity: 0 } : { opacity: 1 }} />
            {/* otros elementos... */}
          </div>
          <div className="cardInfo">
            <div className="cardHeader">
              <h2>{data.nombre}</h2>
              <div className="cardRating">
                {data.valoracion}
                <img src={starIcon} alt="Rating" className="ratingIcon" />
              </div>
            </div>
            <div className="cardTags">
              {data.etiquetas.map((tag, index) => tag && <span key={index}>{tag}</span>)}
            </div>
            <hr className='divider' />
            <p>{data.descripcion}</p>
            <hr />
            <div className="dividerLine"></div>
            <button className="arrowButton">
              <img src={arrowIcon} alt="Ver más" />
            </button>
          </div>
        </div>
      </div>
  );
}

export default LugarCardLarge;