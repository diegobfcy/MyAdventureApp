import React from 'react';
import './RegisterOverlay.css';
import Logo from '../../assets/icons/LogoColor.png';
import { useState, useEffect } from 'react';



function RegisterOverlay({ onClose }){
    const [showRegistration, setShowRegistration] = useState(true);

    const handleClose = () => {
        setShowRegistration(false);
    };



    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        const userData = {
            name,
            surname,
            email,
            password 
        };
        

        console.log(userData);  


        onClose();
    };

    return (
        <div className='RegisterOverlay-Fondo'>
            <div className='RegisterOverlay-RegisterContainer'>
                <div className='RegisterOverlay-RegisterContainer-CloseButton' onClick={onClose}>x</div>
                <img src={Logo} alt="Logo" className='RegisterOverlay-RegisterContainer-Logo'/>
                <div className='RegisterOverlay-NombreApellidoContainer'>
                    <span className='RegisterOverlay-NombreApellidoContainer-NombreApellidoSpan'>Nombre y Apellido</span>
                    <div className='RegisterOverlay-NombreInput'>
                        <input placeholder="Ingresa tu nombre" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='RegisterOverlay-ApellidoInput'>
                        <input placeholder="Ingresa tu apellido" value={surname} onChange={e => setSurname(e.target.value)}/>    
                    </div> 
                </div>
                <div className='RegisterOverlay-CorreoContainer'>
                    <span className='RegisterOverlay-CorreoContainer-CorreoSpan'>Correo Electronico</span>
                    <div className='RegisterOverlay-CorreoInput'>
                        <input type='email' placeholder='Ingresa tu correo' value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    
                </div>
                <div className='RegisterOverlay-PasswordConfirmPasswordContainer'>
                    <span className='RegisterOverlay-PasswordConfirmPasswordContainer-PasswordSpan'>Contraseña</span>
                    <div className='RegisterOverlay-PasswordInput'>
                        <input type='password' placeholder='Ingresa tu contraseña' value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div className='RegisterOverlay-ConfirmPasswordInput'>
                        <input type='password' placeholder='Confirma tu contraseña' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <div className='RegisterOverlay-RegisterButtonContainer'>
                        <button className='RegisterOverlay-RegisterButton' onClick={handleRegister}>
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegisterOverlay;