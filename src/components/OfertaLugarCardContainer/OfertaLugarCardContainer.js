import React, { useState } from 'react';
import OfertaLugarCard from '../OfertaLugarCard/OfertaLugarCard';
import './OfertaLugarCardContainer.css';

function OfertaLugarCardContainer({ isVisible, onClose }) {
    const ofertas = [       //URL e imagen de los lugares que se van a visitar
        {
            nombre: "Lugar A",
            urlImagen: "https://example.com/imagen-lugarA.jpg"
        },
        {
            nombre: "Lugar B",
            urlImagen: "https://example.com/imagen-lugarB.jpg"
        }
    ];
    const [ofertaValue, setOfertaValue] = useState('');
    const [transporte, setTransporte] = useState('sin transporte');

    const handleOfertaChange = (event) => {
        setOfertaValue(event.target.value);
    };

    const handleTransporteChange = (event) => {
        setTransporte(event.target.value);
    };

    const animationClass = isVisible ? 'slideIn' : 'slideOut';

    const toggleVisibility = () => {
        onClose();
    };

    return (
        <div className={`OfertaLugarCardContainer-card-container ${animationClass}`}>
            <div className="OfertaLugarCardContainer-title">
                Ingresa tu oferta:
                <input
                    type="number"
                    value={ofertaValue}
                    onChange={handleOfertaChange}
                    placeholder="Escribe tu oferta aquí"
                />
            </div>
            <div className="OfertaLugarCardContainer-transporteOptions">
                <label>
                    <input
                        type="radio"
                        value="con transporte"
                        checked={transporte === 'con transporte'}
                        onChange={handleTransporteChange}
                    />
                    Con transporte
                </label>
                <label>
                    <input
                        type="radio"
                        value="sin transporte"
                        checked={transporte === 'sin transporte'}
                        onChange={handleTransporteChange}
                    />
                    Sin transporte
                </label>

            </div>
            <div className='OfertaLugarCardContainer-enviarOfertaBtn'>
                <button className="OfertaLugarCardContainer-OfertaBtn">
                    Enviar Oferta
                </button>
            </div>
            <div className="OfertaLugarCardContainer-divider"></div>
            {
                ofertas.map((oferta, idx) => (
                    <OfertaLugarCard
                        key={idx}
                        data={oferta}
                    />
                ))
            }
        </div>
    );
}

export default OfertaLugarCardContainer;
