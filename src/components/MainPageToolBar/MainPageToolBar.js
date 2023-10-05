import './MainPageToolBar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/icons/LogoLetrasBlancoSinFondo.png'
import NewLogo from '../../assets/icons/LogoLetrasSinFondo.png'

function MainPageToolBar(){
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`MainPageToolBar ${scrolled ? "MainPageToolBar-scrolled" : ""}`}>
            <div className='MainPageToolBar-LeftDiv'>
                <img src={scrolled ? NewLogo : Logo} alt="Logo" className='MainPageToolBar-Logo' />
            </div>
            <div className='MainPageToolBar-MidDiv'>
                <span>Sobre Nosotros</span>
                <span>Afiliate</span>
            </div>
            <div className='MainPageToolBar-RightDiv'>  
                <span>Login</span>
                <span>or</span>
                <span>Register</span>
            </div>
        </div>
    );

}
export default MainPageToolBar;