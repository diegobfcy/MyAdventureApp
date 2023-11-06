import { auth } from '../../firebaseConfig'
import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
    const [usuario, setUsuario] = useState(false);

    const initial = {
        email: '',
        password: '',
    };

    const [values, setValues] = useState(initial);

    const change = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const functAutenticacion = async (e) => {
        if (e) {  // Verificar si el evento existe
            e.preventDefault();
        }

        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
        } catch (error) {
            alert("El correo o la contraseña son equivocados");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            functAutenticacion(event);  // Pasar el evento
        }
    };
    return (
        <>
            <div className="email-input-container">
                <input type="email" placeholder="Ingresa tu correo electrónico" name='email' onChange={change} autoFocus />
            </div>
            <div className="password-input-container">
                <input type="password" placeholder="Ingresa tu contraseña" name='password' onChange={change} onKeyPress={handleKeyPress} />
            </div>
            <button className='MainPage-BtnLogin' onClick={functAutenticacion}>
                Ingresar
            </button>
        </>
    )
}

export default Login;