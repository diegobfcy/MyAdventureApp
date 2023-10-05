import React, { useState } from 'react';
import './Afiliate.css';
import AfiliateEmpresaOverlay from '../../components/AfiliateEmpresaOverlay/AfiliateEmpresaOverlay';
import AfiliateGuiaOverlay from '../../components/AfiliateGuiaOverlay/AfiliateGuiaOverlay';
import AfiliateTransporteOverlay from '../../components/AfiliateTransporteOverlay/AfiliateTransporteOverlay';

const Afiliate = () => {
    const [activeOverlay, setActiveOverlay] = useState(null); // 'empresa', 'guia', 'transporte' o null

    const openOverlay = (type) => {
        setActiveOverlay(type);
    }

    const closeOverlay = () => {
        setActiveOverlay(null);
    }

    return (
        <div className="AfiliateContainer">


            <h1 className="AfiliateTitle">Trabaja con nosotros</h1>

            <div className="CardsContainer">
                <div className="AfiliateCard">
                    <p className='AfiliateCard-Title'>Afiliate como empresa</p>
                    <p>Muestra tu emprendimiento a personas de todo el mundo</p>
                    <button onClick={() => openOverlay('empresa')}>Únete</button>
                </div>
                <div className="AfiliateCard">
                    <p className='AfiliateCard-Title'>Afiliate como guía</p>
                    <p>Encuentra turistas con sus propias aventuras que necesitan de tu ayuda</p>
                    <button onClick={() => openOverlay('guia')}>Únete</button>
                </div>
                <div className="AfiliateCard">
                    <p className='AfiliateCard-Title'>Afiliate como transporte</p>
                    <p>Encuentra grupos con aventuras increibles que necesitan de tus servicios</p>
                    <button onClick={() => openOverlay('transporte')}>Únete</button>
                </div>
            </div>
            {activeOverlay === 'empresa' && <AfiliateEmpresaOverlay onClose={closeOverlay} />}
            {activeOverlay === 'guia' && <AfiliateGuiaOverlay onClose={closeOverlay} />}
            {activeOverlay === 'transporte' && <AfiliateTransporteOverlay onClose={closeOverlay} />}
            {/* Aquí puedes añadir condiciones similares para los otros overlays. Por ejemplo:
            
            {activeOverlay === 'transporte' && <AfiliateTransporteOverlay onClose={closeOverlay} />} */}
        </div>
    );
};
export default Afiliate;