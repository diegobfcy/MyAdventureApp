import React, { useState, useEffect } from 'react';
import './OfertaRutaPage.css';  // Asegúrate de crear también un archivo CSS si es necesario
import MapToolBar from '../../components/MapToolBar/MapToolBar';
import RutaListMap from '../../components/RutaListMap/RutaListMap';  // Asegúrate de tener este componente
import { CSSTransition } from 'react-transition-group';
import Toolbar from '../../components/Toolbar/Toolbar';

function OfertaRutaPage() {
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false); 
    }, []);
  
    return (
        <CSSTransition in={inProp} timeout={1000} classNames="slide">
            <div>
                <Toolbar />
                <div className="ofertaRutaPage">
                    <RutaListMap />
                </div>
            </div>
        </CSSTransition>
    );
}

export default OfertaRutaPage;