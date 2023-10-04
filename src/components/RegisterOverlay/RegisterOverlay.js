import React from 'react';
import './RegisterOverlay.css';
import Logo from '../../assets/icons/LogoColor.png';
import { useState } from 'react';// useEffect 
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword} from 'firebase/auth'; // onAuthStateChanged
import { db, auth } from '../../firebaseConfig'




function RegisterOverlay({ onClose }){
    //const [showRegistration, setShowRegistration] = useState(true);

    //const handleClose = () => {
        //setShowRegistration(false);
    //};
    
    const initial = {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [userData, setValues] = useState(initial)
    
    const changeData = e =>{
        const {name, value} = e.target;
        setValues({...userData, [name]: value})
    }

    const handleRegister = () => {
        if (userData.password !== userData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        console.log(userData);  
        functAutenticacion();

        onClose();
    };

    const functAutenticacion = async(e) => {
        try {
            await createUserWithEmailAndPassword (auth, userData.email,userData.password);
            const user = collection(db, 'Usuario');
            addDoc(user, userData);
        } catch (error) {
            alert("No se pudo crear Usuario")
        }
    }


    return (
        <div className='RegisterOverlay-Fondo'>
            <div className='RegisterOverlay-RegisterContainer'>
                <div className='RegisterOverlay-RegisterContainer-CloseButton' onClick={onClose}>x</div>
                <img src={Logo} alt="Logo" className='RegisterOverlay-RegisterContainer-Logo'/>
                <div className='RegisterOverlay-NombreApellidoContainer'>
                    <span className='RegisterOverlay-NombreApellidoContainer-NombreApellidoSpan'>Nombre y Apellido</span>
                    <div className='RegisterOverlay-NombreInput'>
                        <input placeholder="Ingresa tu nombre" name='name' onChange={changeData} />
                    </div>
                    <div className='RegisterOverlay-ApellidoInput'>
                        <input placeholder="Ingresa tu apellido" name='surname' onChange={changeData}/>    
                    </div> 
                </div>
                <div className='RegisterOverlay-CorreoContainer'>
                    <span className='RegisterOverlay-CorreoContainer-CorreoSpan'>Correo Electronico</span>
                    <div className='RegisterOverlay-CorreoInput'>
                        <input type='email' placeholder='Ingresa tu correo' name='email' onChange={changeData}></input>
                    </div>
                    
                </div>
                <div className='RegisterOverlay-PasswordConfirmPasswordContainer'>
                    <span className='RegisterOverlay-PasswordConfirmPasswordContainer-PasswordSpan'>Contraseña</span>
                    <div className='RegisterOverlay-PasswordInput'>
                        <input type='password' placeholder='Ingresa tu contraseña' name='password' onChange={changeData}></input>
                    </div>
                    <div className='RegisterOverlay-ConfirmPasswordInput'>
                        <input type='password' placeholder='Confirma tu contraseña' name='confirmPassword' onChange={changeData}></input>
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