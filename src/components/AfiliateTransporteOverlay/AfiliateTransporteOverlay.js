import React, { useState, useEffect } from 'react';
import './AfiliateTransporteOverlay.css';
import Logo from '../../assets/icons/LogoColor.png'; 
import { collection, addDoc,  getDocs, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Asegúrate de tener el path correcto a tu logo

function AfiliateTransporteOverlay({ onClose }) {
    
    const initial = {
        imageUrl: '',
        ownerName: '',
        description: '',
        model: '',
        licensePlate: '',
        phoneNumber: '',
        email: ''
    };

    const [transportData, setValues] = useState(initial)
    const [Users, setDataUsers] = useState([]);
    
    const changeData = e => {
        const {name, value} = e.target;
        setValues({...transportData, [name]: value})
    }

    const handleAffiliation = () => {
        const isUserExist = Users.find(elemento => elemento.email === transportData.email);
    
        if (isUserExist && isUserExist.rol) {
            alert(`El correo ya está registrado como ${isUserExist.rol}`);
        } else if (isUserExist) {
            updToTransport(isUserExist);
            saveTransportToDatabase();
            onClose();
        } else {
            alert("El correo no está registrado como usuario");
        }
    };

    const updToTransport = async (user) => {
        try {
            const userRef = doc(db, 'Usuario', user.id)
            const act = {
                rol: 'Transporte',
            };
            updateDoc(userRef,act);
        } catch (error) {
            console.log(error)
        }
    }

    const saveTransportToDatabase = async () => {
        try {
            const transportCollection = collection(db, 'Transport');
            addDoc(transportCollection, transportData);
        } catch (error) {
            alert("No se pudo guardar el transporte");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {   
                const usersCollection = collection(db, 'Usuario');
                const usersSnapshot = await getDocs(query(usersCollection));
                setDataUsers(usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    

    return (
        <div className='AfiliateTransporteOverlay-Fondo'>
            <div className='AfiliateTransporteOverlay-Container'>
                <div className='AfiliateTransporteOverlay-CloseButton' onClick={onClose}>x</div>
                <img src={Logo} alt="Logo" className='AfiliateTransporteOverlay-Logo'/>

                <div className='AfiliateTransporteOverlay-InputContainer'>
                    <span className='AfiliateTransporteOverlay-Span'>URL de imagen de transporte</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input placeholder="Ingresa la URL de la imagen" name='imageUrl' onChange={changeData} />
                    </div>
                    
                    <span className='AfiliateTransporteOverlay-Span'>Nombre del dueño</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input placeholder="Ingresa el nombre del dueño" name='ownerName' onChange={changeData} />
                    </div>

                    <span className='AfiliateTransporteOverlay-Span'>Descripción del transporte</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input placeholder="Describe el transporte" name='description' onChange={changeData} />
                    </div>

                    <span className='AfiliateTransporteOverlay-Span'>Modelo del transporte</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input placeholder="Ingresa el modelo del transporte" name='model' onChange={changeData} />
                    </div>

                    <span className='AfiliateTransporteOverlay-Span'>Placa del transporte</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input placeholder="Ingresa la placa" name='licensePlate' onChange={changeData} />
                    </div>

                    <span className='AfiliateTransporteOverlay-Span'>Número de teléfono</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input placeholder="Ingresa el número de teléfono" name='phoneNumber' onChange={changeData} />
                    </div>

                    <span className='AfiliateTransporteOverlay-Span'>Correo Electrónico</span>
                    <div className='AfiliateTransporteOverlay-Input'>
                        <input type='email' placeholder='Ingresa tu correo' name='email' onChange={changeData} />
                    </div>

                    <div className='AfiliateTransporteOverlay-ButtonContainer'>
                        <button className='AfiliateTransporteOverlay-Button' onClick={handleAffiliation}>
                            Afiliarse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AfiliateTransporteOverlay;