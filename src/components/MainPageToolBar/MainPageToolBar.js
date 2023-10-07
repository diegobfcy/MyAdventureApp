import './MainPageToolBar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/icons/LogoLetrasBlancoSinFondo.png'
import NewLogo from '../../assets/icons/LogoLetrasSinFondo.png'
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';

function MainPageToolBar({ onOpenRegistration }){
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
            <div className='MainPageToolBar-Hamburger' onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            {menuOpen && <DropdownMenu onOpenRegistration={onOpenRegistration} />}
            <div className='MainPageToolBar-NormalMenu'>
                <MenuContent />
            </div>
        </div>
    );
    
    function MenuContent() {
        return (
            <>
                <div className='MainPageToolBar-MidDiv'>
                    <a href='#sobre-nosotros'>
                        <span>Sobre Nosotros</span>
                    </a>
                    <a href='#afiliate'>
                        <span>Afiliate</span>
                    </a>
                </div>
                <div className='MainPageToolBar-RightDiv'>  
                    <a href="#login">
                        <span>Login</span>
                    </a>
                    <span>or</span>
                    <span className="registerLink" onClick={onOpenRegistration}>Register</span>
                </div>
            </>
        );
    }

}
export default MainPageToolBar;