// CurrentAdventureContent.jsx
import React, { useState, useEffect, useContext } from 'react';
import './CurrentAdventureContent.css';  // Importamos el CSS
import DestinosCard from '../DestinosCard/DestinosCard';
import { CartInfoContext } from '../../context/CartInfoContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'

const CurrentAdventureContent = () => {
    const {LugarCardAdded, setLugarCardAdded, ErrorMessageCart} = useContext(CartInfoContext);
        const [errorMessage, setErrorMessage] = useState("");

    //Aqui, selectedPlaces es la variable que tiene los lugares seleccionados, a estos hay que enviarlos con el boton "Confirmar Ruta" junto con la fehcha y la cantidad de personas
    //para que se muestre la ruta a los guias y ellos den su oferta.
    
    const [mes, setMes] = useState("");  
    const [dias, setDias] = useState(0);     
    const [dia, setDia] = useState(0);
    
    const [numPersonas, setNumPersonas] = useState(0);

    const SubmitPlaceCart = () =>{
        const updatedState = {
            ...LugarCardAdded,
            day: dia,
            month: mes,
            persons: numPersonas,
        };

        for (const dato in updatedState) {
            if (updatedState[dato] === 0 || updatedState[dato] === '' || updatedState[dato].length === 0) {
                setErrorMessage(ErrorMessageCart[dato]);
                return;
            }
        }       

        setErrorMessage('');    
        setLugarCardAdded(prev => ({
            ...prev,
            places: [],
            day: 0,
            month: 0,
            persons: 0,
        }))
        setDia(0);
        setMes("");
        setNumPersonas(0);
        
        createRequestPlaces(updatedState);
    };

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
        const newPlaces = LugarCardAdded.places.filter(place => place.nombre !== placeName);
        console.log(LugarCardAdded.places)
        setLugarCardAdded(prev => ({
            ...prev,
            places: newPlaces,
        }));
    }

    const handleNumPersons = (e) =>{
        const num = e.target.value;
        if (num <= 0) {
            setErrorMessage('El número de personas tiene que ser mayor a 0');
        } else {
            setErrorMessage('');
            setNumPersonas(num);
        }
    }

    const createRequestPlaces = async(place) =>{
        try {
            const request = collection(db, 'RequestPlaces');
            await addDoc(request, place);
        } catch (error) {
            alert("No se pudo crear la peticion")
        }
    }

    return (
        <div className='CurrentAdventureContent-Container'>
            <div className='CurrentAdventureContent-Container-FechaCantidad'>
                <select className="dropdown" name="dia" defaultValue="" onChange={(e) => setDia(e.target.value)}>
                    <option value="" disabled>Día</option>
                    {[...Array(dias).keys()].map((dia) => (
                        <option key={dia + 1} value={dia + 1}>{dia + 1}</option>
                    ))}
                </select>

                <select className="dropdown" name="mes" defaultValue="" onChange={(e) => setMes(e.target.value)}>
                    <option value="" disabled>Mes</option>
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
                <input className='CurrentAdventure-PersonasInput' type="number" name="cantidadPersonas" placeholder="Personas" onChange={handleNumPersons} />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <div className='CurrentAdventureContent-Container-BotonConfirmarRutaContainer'>
                <button className='CurrentAdventureContent-Container-BotonConfirmarRuta' onClick={SubmitPlaceCart}>
                    Confirmar Ruta
                </button>
            </div>

             <div className='CurrentAdventureContent-Container-DestinosCardContainer'>
                {LugarCardAdded.places.map((place, index) => (
                    <DestinosCard key={index} imageUrl={place.imagen[0]} text={place.nombre} onRemove={() => handleRemovePlace(place.nombre)} />
                ))}
            </div>

        </div>
    );
}

export default CurrentAdventureContent; 