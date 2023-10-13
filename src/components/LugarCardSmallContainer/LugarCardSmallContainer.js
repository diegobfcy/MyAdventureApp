import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import LugarCardSmall from '../LugarCardSmall/LugarCardSmall';
import './LugarCardSmallContainer.css';
import nextIcon from '../../assets/icons/arrowIconRight.png';
import prevIcon from '../../assets/icons/arrowIconLeft.png';
import VisibilitySensor from 'react-visibility-sensor'; // Añade esto
import FilterList from '../FilterList/FilterList'
import { FilterContext } from '../../context/filters';
import { Button } from 'react-scroll';
import CurrentAdventureContent from '../CurrentAdventureContent/CurrentAdventureContent';

function SearchingTerm(data) {
  const { filterCategories } = useContext(FilterContext);
  const { term } = useContext(FilterContext);

  const termFilter = data.filter((x) => {
    return x.nombre.toLowerCase().includes(term.toLowerCase()) || !term;
  })

  const dataFilter = termFilter.filter(x => {
    return x.precio >= filterCategories.minPrice &&
      (
        !filterCategories.category ||
        filterCategories.category.every((selectedCategory) => x.etiquetas.includes(selectedCategory))
      );
  });

  return { dataFilter }
}

function LugarCardSmallContainer() {
  function changePage(direction) {
    return (e) => {
      e.preventDefault();
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
  const { dataFilter } = SearchingTerm(data);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'Lugares'), limit(15 * (currentPage + 1)));
      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, [currentPage]);

  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handlePlaceSelection = (placeData) => {
    setSelectedPlaces(prevPlaces => [...prevPlaces, placeData]);
  };
  const handleRemoveSelectedPlace = (placeName) => {
    const newPlaces = selectedPlaces.filter(place => place.nombre !== placeName);
    setSelectedPlaces(newPlaces);
  };

  const [isAccordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className='mainContainer1'>
      <h1 className="headerText1">EXPERIENCIAS QUE NO TE PUEDES PERDER!</h1>
      <div className="headerLine1"></div>
      <FilterList />
      <div className='LugarCardSmallContainer-ContainerAndCurrent'>
        <div className='CurrentAdventureContent'>
          <CurrentAdventureContent selectedPlaces={selectedPlaces} onRemoveSelectedPlace={handleRemoveSelectedPlace} />
        </div>
        <div className="CardSmallContainer">
          {dataFilter.slice(currentPage * 15, (currentPage + 1) * 15).map((item, index) => (
            <VisibilitySensor key={index} partialVisibility>
              {({ isVisible }) => <LugarCardSmall isVisible={isVisible} data={item} onSelectPlace={handlePlaceSelection} />}
            </VisibilitySensor>
          ))}
          {dataFilter.length === 0 && (
            <p style={{ height: '800px' }}>No se encontraron resultados.</p>
          )}
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
    </div>
  );

}


export default LugarCardSmallContainer;