import './MainPage.css';

import MainPageToolBar from '../../components/MainPageToolBar/MainPageToolBar'
import Login from '../../components/Login/Login'
import Logo from '../../assets/icons/LogoNoColor.png'
import { useState, useEffect } from 'react';
import FacebookLogo from '../../assets/icons/FacebookLogo.png';
import GoogleLogo from '../../assets/icons/GoogleLogo.png';
import RegisterOverlay from '../../components/RegisterOverlay/RegisterOverlay';



function MainPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        const loginData = {
            email,
            password
        };

        console.log(loginData); 
        
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [showRegistration, setShowRegistration] = useState(false);

    const handleOpenRegistration = () => {
        setShowRegistration(true);
    };
    return (
        <div className='MainPageParentContainer'>
            <MainPageToolBar/>
            <div className='MainPageContainer'>
                
                <div className='left-div'>
                    <img src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2017/12/arequipa-43286_1280.jpg" alt="Descripción 1" className={`fade-image ${activeIndex === 0 ? 'active' : ''}`} />
                    <img src="https://blog.redbus.pe/wp-content/uploads/2017/04/shutterstock_439732774.jpg" alt="Descripción 2" className={`fade-image ${activeIndex === 1 ? 'active' : ''}`} />
                    <img src="https://www.machupicchuperutours.com/wp-content/uploads/monasterio-de-santa-catalina.jpg" alt="Descripción 3" className={`fade-image ${activeIndex === 2 ? 'active' : ''}`} />
                </div>
                {/* contenedor de la derecha */}
                <div className='right-div'>
                    <img src={Logo} alt="Logo" className='MainPage-Logo' />
                    <Login/>
                    <button className='MainPage-GoogleAuth'>
                        <img src={GoogleLogo} alt="Google Logo" className="auth-logo" />
                        Ingresar con Google
                    </button>
                    <button className='MainPage-FacebookAuth'>
                        <img src={FacebookLogo} alt="Facebook Logo" className="auth-logo" />
                        Ingresar con Facebook
                    </button>
                    <div className='MainPage-WhiteLine'>

                    </div>
                    <div className='MainPage-RegistrarSpan'>
                        <span>¿No tienes cuenta? </span>
                        <span className='MainPage-RegistrateSpan'  onClick={handleOpenRegistration}>
                            Registrate
                        </span>
                    </div>
                    
                </div>
                
            </div>
            {showRegistration && <RegisterOverlay onClose={() => setShowRegistration(false)} />}
        </div>

    );

}
export default MainPage;