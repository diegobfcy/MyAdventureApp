import React from "react";
import './DropdownMenu.css';

function DropdownMenu({ onOpenRegistration }) {
    return (
        <div className='DropdownMenu'>
            <a href='#sobre-nosotros'>
                <span>Sobre Nosotros</span>
            </a>
            <a href='#afiliate'>
                <span>Afiliate</span>
            </a>
            <a href="#login">
                <span>Login</span>
            </a>
            <span className="Dropdown-registerLink" onClick={onOpenRegistration}>Register</span>
        </div>
    );
}
export default DropdownMenu;