import React, { useState, useEffect } from 'react';
import './AfiliateGuiaOverlay.css';
import Logo from '../../assets/icons/LogoColor.png';
import { collection, addDoc,  getDocs, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function AfiliateGuiaOverlay({ onClose }) {
    const initial = {
        imageUrl: '',
        guideName: '',
        description: '',
        age: '',
        phoneNumber: '',
        email: '',
    };

    const [guideData, setValues] = useState(initial);
    const [Users, setDataUsers] = useState([]);


    const changeData = e => {
        const { name, value } = e.target;
        setValues({ ...guideData, [name]: value });
    }

    const handleAffiliation = () => {
        const isUserExist = Users.find(elemento => elemento.email === guideData.email);
    
        if (isUserExist && isUserExist.rol) {
            alert(`El correo ya está registrado como ${isUserExist.rol}`);
        } else if (isUserExist) {
            updToGuide(isUserExist);
            saveGuideToDatabase();
            onClose();
        } else {
            alert("El correo no está registrado como usuario");
        }
    };

    const updToGuide = async (user) => {
        try {
            const userRef = doc(db, 'Usuario', user.id)
            const act = {
                rol: 'Guia',
            };
            updateDoc(userRef,act);
        } catch (error) {
            console.log(error)
        }
    }

    const saveGuideToDatabase = async () => {
        try {
            const guideCollection = collection(db, 'Guide');
            addDoc(guideCollection, guideData);
        } catch (error) {
            alert("No se pudo guardar el guia");
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
        <div className='AfiliateGuiaOverlay-Fondo'>
            <div className='AfiliateGuiaOverlay-Container'>
                <div className='AfiliateGuiaOverlay-CloseButton' onClick={onClose}>x</div>
                <img src={Logo} alt="Logo" className='AfiliateGuiaOverlay-Logo'/>
                
                <div className='AfiliateGuiaOverlay-InputContainer'>
                    <span className='AfiliateGuiaOverlay-Span'>URL de imagen de guia</span>
                    <div className='AfiliateGuiaOverlay-Input'>
                        <input type='url' placeholder='Ingresa URL de la imagen' name='imageUrl' onChange={changeData} />
                    </div>
                    <span className='AfiliateGuiaOverlay-Span'>Nombre del guia</span>
                    <div className='AfiliateGuiaOverlay-Input'>
                        <input placeholder='Ingresa nombre del guia' name='guideName' onChange={changeData} />
                    </div>
                    <span className='AfiliateGuiaOverlay-Span'>Descripción del guia</span>
                    <div className='AfiliateGuiaOverlay-Input'>
                        <textarea placeholder='Ingresa descripción del guia' name='description' onChange={changeData}></textarea>    
                    </div>
                    <span className='AfiliateGuiaOverlay-Span'>Edad</span>
                    <div className='AfiliateGuiaOverlay-Input'>
                        <input type='number' placeholder='Ingresa edad del guia' name='age' onChange={changeData} />
                    </div>
                    <span className='AfiliateGuiaOverlay-Span'>Número de Teléfono</span>
                    <div className='AfiliateGuiaOverlay-Input'>
                        <input type='tel' placeholder='Ingresa teléfono del guia' name='phoneNumber' onChange={changeData} />
                    </div>
                    <span className='AfiliateGuiaOverlay-Span'>Correo Electrónico</span>
                    <div className='AfiliateGuiaOverlay-Input'>
                        <input type='email' placeholder='Ingresa correo del guia' name='email' onChange={changeData} />
                    </div>
                </div>

                <div className='AfiliateGuiaOverlay-ButtonContainer'>
                    <button className='AfiliateGuiaOverlay-Button' onClick={handleAffiliation}>
                        Afiliar Guia
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AfiliateGuiaOverlay;