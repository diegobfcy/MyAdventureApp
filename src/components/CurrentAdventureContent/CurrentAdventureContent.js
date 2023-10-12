// CurrentAdventureContent.jsx
import React, { useState, useEffect } from 'react';
import './CurrentAdventureContent.css';  // Importamos el CSS
import DestinosCard from '../DestinosCard/DestinosCard';

const CurrentAdventureContent = ({selectedPlaces, onRemoveSelectedPlace}) => {
    const [places, setPlaces] = useState(selectedPlaces);

    //Aqui, selectedPlaces es la variable que tiene los lugares seleccionados, a estos hay que enviarlos con el boton "Confirmar Ruta" junto con la fehcha y la cantidad de personas
    //para que se muestre la ruta a los guias y ellos den su oferta.
    
    
    
    const [mes, setMes] = useState("Enero");  
    const [dias, setDias] = useState(31);     
    const [dia, setDia] = useState(1);
    
    const [numPersonas, setNumPersonas] = useState(null);

    useEffect(() => {
        switch (mes) {
            case 'Febrero':
                setDias(28);  
                break;
            case 'Abril':
            case 'Junio':
            case 'Septiembre':
            case 'Noviembre':
                setDias(30);
                break;
            default:
                setDias(31);
        }
    }, [mes]);

    const handleRemovePlace = (placeName) => {
        const newPlaces = places.filter(place => place.nombre !== placeName);
        setPlaces(newPlaces);
        onRemoveSelectedPlace(placeName);
    }

    return (
        <div className='CurrentAdventureContent-Container'>
            <div className='CurrentAdventureContent-Container-FechaCantidad'>
                <select className="dropdown" name="dia" onChange={(e) => setDia(e.target.value)}>
                    <option value="" disabled selected>Día</option>
                    {[...Array(dias).keys()].map((dia) => (
                        <option key={dia + 1} value={dia + 1}>{dia + 1}</option>
                    ))}
                </select>

                <select className="dropdown" name="mes" onChange={(e) => setMes(e.target.value)}>
                    <option value="" disabled selected>Mes</option>
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>

                </select>
                <input className='CurrentAdventure-PersonasInput' type="number" name="cantidadPersonas" placeholder="Personas" value={numPersonas} onChange={(e) => setNumPersonas(e.target.value)} />
            </div>
            <div className='CurrentAdventureContent-Container-BotonConfirmarRutaContainer'>
                <button className='CurrentAdventureContent-Container-BotonConfirmarRuta'>
                    Confirmar Ruta
                </button>
            </div>
            <div className='CurrentAdventureContent-Container-Relative'>
                <div className='CurrentAdventureContent-Container-DestinosCardContainer'>
                    {selectedPlaces.map((place, index) => (
                        <DestinosCard key={index} imageUrl={place.imagen[0]} text={place.nombre} onRemove={() => handleRemovePlace(place.nombre)} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default CurrentAdventureContent; 