import React, { useState } from 'react';
import './AfiliateEmpresaOverlay.css';
import Logo from '../../assets/icons/LogoColor.png';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function AfiliateEmpresaOverlay({ onClose }) {
    const initial = {
        imageUrl: '',
        placeName: '',
        description: '',
        latitude: '',
        longitude: '',
        price: '',
    };

    const [placeData, setValues] = useState(initial);
    
    const changeData = e => {
        const { name, value } = e.target;
        setValues({ ...placeData, [name]: value });
    }

    const handleAffiliation = () => {
        console.log(placeData);  
        savePlaceToDatabase();
        onClose();
    };

    const savePlaceToDatabase = async () => {
        try {
            const placeCollection = collection(db, 'Place');
            addDoc(placeCollection, placeData);
        } catch (error) {
            alert("No se pudo guardar el lugar");
        }
    }

    return (
        <div className='AfiliateEmpresaOverlay-Fondo'>
            <div className='AfiliateEmpresaOverlay-Container'>
                <div className='AfiliateEmpresaOverlay-CloseButton' onClick={onClose}>x</div>
                <img src={Logo} alt="Logo" className='AfiliateEmpresaOverlay-Logo'/>
                
                <div className='AfiliateEmpresaOverlay-InputContainer'>
                    <span className='AfiliateEmpresaOverlay-Span'>URL de imagen de lugar</span>
                    <div className='AfiliateEmpresaOverlay-Input'>
                        <input type='url' placeholder='Ingresa URL de la imagen' name='imageUrl' onChange={changeData} />
                    </div>
                    <span className='AfiliateEmpresaOverlay-Span'>Nombre del lugar</span>
                    <div className='AfiliateEmpresaOverlay-Input'>
                        <input placeholder='Ingresa nombre del lugar' name='placeName' onChange={changeData} />
                    </div>
                    <span className='AfiliateEmpresaOverlay-Span'>Descripción del lugar</span>
                    <div className='AfiliateEmpresaOverlay-Input'>
                        <textarea placeholder='Ingresa descripción del lugar' name='description' onChange={changeData}></textarea>    
                    </div> 
                    <span className='AfiliateEmpresaOverlay-Span'>Latitud del lugar</span>
                    <div className='AfiliateEmpresaOverlay-Input'>
                        <input placeholder='Ingresa latitud del lugar' name='latitude' onChange={changeData} />
                    </div>
                    <span className='AfiliateEmpresaOverlay-Span'>Longitud del lugar</span>
                    <div className='AfiliateEmpresaOverlay-Input'>
                        <input placeholder='Ingresa longitud del lugar' name='longitude' onChange={changeData} />
                    </div>
                    <span className='AfiliateEmpresaOverlay-Span'>Precio del lugar</span>
                    <div className='AfiliateEmpresaOverlay-Input'>
                        <input placeholder='Ingresa precio del lugar' name='price' onChange={changeData} />
                    </div>
                </div>

                <div className='AfiliateEmpresaOverlay-ButtonContainer'>
                    <button className='AfiliateEmpresaOverlay-Button' onClick={handleAffiliation}>
                        Afiliar Lugar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AfiliateEmpresaOverlay;