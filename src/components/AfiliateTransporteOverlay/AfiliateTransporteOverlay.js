import React, { useState } from 'react';
import './AfiliateTransporteOverlay.css';
import Logo from '../../assets/icons/LogoColor.png';  // Asegúrate de tener el path correcto a tu logo

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
    
    const changeData = e => {
        const {name, value} = e.target;
        setValues({...transportData, [name]: value})
    }

    // Aquí podrías implementar el código para manejar el envío de datos a tu backend o base de datos
    const handleAfiliate = () => {
        console.log(transportData);  
        // Implementa tu función de autenticación o guardado aquí.

        onClose();
    };

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
                        <button className='AfiliateTransporteOverlay-Button' onClick={handleAfiliate}>
                            Afiliarse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AfiliateTransporteOverlay;