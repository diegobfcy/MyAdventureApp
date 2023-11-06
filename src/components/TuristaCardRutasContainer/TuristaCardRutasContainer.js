import React from 'react';
import './TuristaCardRutasContainer.css';

function TuristaCardRutasContainer({ onClose }) {
    return (
        <div className="TuristaCardRutasContainerOverlay">
            <div className="TuristaCardRutasContainer-infoContainer">

                <div className="TuristaCardRutasContainer-leftContainer">
                    <h2 className="TuristaCardRutasContainer-title">Rutas Confirmadas</h2>
                    <div className="TuristaCardRutasContainer-cardContainer">
                        
                    </div>
                </div>

                <div className="TuristaCardRutasContainer-rightContainer">
                    <h2 className="TuristaCardRutasContainer-title">Rutas esperando oferta</h2>
                    <div className="TuristaCardRutasContainer-cardContainer">
                        
                    </div>
                </div>

                <button className="TuristaCardRutasContainer-closeButton" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default TuristaCardRutasContainer;
