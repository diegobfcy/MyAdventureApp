import './Footer.css';
import React from 'react';

function Footer(){

    return(
        <div className='FooterContainer'>
            <div className='FooterContainer-RightContainer'>
                <p>Right</p>
            </div>
            <div className='FooterContainer-MidContainer'>
                <p>Mid</p>
            </div>
            <div className='FooterContainer-LeftContainer'>
                <p>Left</p>
            </div>
        </div>
    )
}
export default Footer;