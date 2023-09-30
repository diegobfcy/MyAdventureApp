import GuideCard from '../GuideCard/GuideCard';
import './GuideCardContainer.css';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 

const fetchGuidesFromFirebase = async () => {
    const q = collection(db, 'Guias');
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};


function GuideCardContainer({isVisible, onClose}) {
    const [guides, setGuides] = useState([]);
    const [animationClass, setAnimationClass] = useState('slideIn');



    const toggleVisibility = () => {
        setAnimationClass('slideOut'); // Comenzar la animación de cierre
        // Espera a que la animación termine y luego informa al componente padre para que oculte el contenedor
        setTimeout(onClose, 500);
    };
    useEffect(() => {
        if (!isVisible) {
            setAnimationClass('slideOut');
        } else {
            setAnimationClass('slideIn');
        }
    }, [isVisible]);

    useEffect(() => {
        const fetchGuides = async () => {
            const fetchedGuides = await fetchGuidesFromFirebase();
            setGuides(fetchedGuides);
        };
    
        fetchGuides();
    }, []);
    

    return(
        <div className={`guide-card-container ${animationClass}`}>
            <button className="guide-close-btn" onClick={toggleVisibility}>X</button>
            <div className="guide-title">Guías con ofertas disponibles</div>
            <div className="guide-divider"></div>
            {
                guides.map((guide, idx) => (
                    <GuideCard 
                        key={idx}
                        data={guide}
                    />
                ))
            }
    </div>

    );
}

export default GuideCardContainer;