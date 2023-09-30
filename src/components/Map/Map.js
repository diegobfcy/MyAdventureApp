import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import MapCard from '../MapCard/MapCard';
import './Map.css';
import MapMarker from '../../assets/icons/location-pin.png';
import { Polyline } from '@react-google-maps/api';
import GuideCardContainer from '../GuideCardContainer/GuideCardContainer';

const config = require('../../config');
const GOOGLE_MAPS_API_KEY = config.googleMapsApiKey;
const mapContainerStyle = {
    width: '100%',
    height: '98vh'
};
const center = {
    lat: -16.406884,
    lng: -71.537302
};
const mapOptions = {
    styles: [ // Este estilo elimina los puntos de interés
        {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
        }
    ]
};



const fetchDataFromFirebase = async () => {
    const q = collection(db, 'Lugares');
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};
function Map() {
    const [data, setData] = useState([]);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    const googleMapsRef = useRef(null);
    const [showGuideCardContainer, setShowGuideCardContainer] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchDataFromFirebase();
                setData(fetchedData);
            } catch (error) {
                console.error("Error al obtener datos de Firebase: ", error);  // Esto mostrará errores si los hay
            }
        }
        fetchData();
    }, []);
    
    const handleGoogleMapsLoad = () => {
        googleMapsRef.current = window.google;
    };
    const handleMarkerDoubleClick = (item) => {
        setSelectedMarkers(prevMarkers => [...prevMarkers, { lat: item.latitud, lng: item.longitud }]);
    };

    return (
        <div className='MapContainer'>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} onLoad={handleGoogleMapsLoad}>
                
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    options={{mapOptions, 
                            disableDefaultUI: true,  // Desactiva la mayoría de los elementos de la interfaz de usuario
                            zoomControl: false}}  // Establecer las opciones de estilo aquí
                >
                    {data.map((item, idx) => {
                        if (!googleMapsRef.current) return null;

                        return (
                            <Marker
                                key={idx}
                                position={{ lat: item.latitud, lng: item.longitud }}
                                onClick={() => setSelectedPoints(item)}
                                onDblClick={() => handleMarkerDoubleClick(item)}
                                icon={{
                                    url: MapMarker,
                                    scaledSize: new googleMapsRef.current.maps.Size(40, 40)
                                }}
                            >
                                {selectedPoints === item && (
                                    <InfoWindow 
                                        position={{ lat: item.latitud, lng: item.longitud }}
                                        onCloseClick={() => setSelectedPoints(null)}
                                    >
                                        <MapCard data={item} />
                                    </InfoWindow>
                                )}
                            </Marker>
                        );
                    })}
                    {selectedMarkers.length >= 2 && (
                        <Polyline
                            path={selectedMarkers}
                            options={{
                                strokeColor: "#792A49",
                                strokeOpacity: 0,
                                strokeWeight: 4,  // Aumentamos el grosor de la línea
                                clickable: false,
                                draggable: false,
                                editable: false,
                                visible: true,
                                zIndex: 1,
                                geodesic: true,
                                icons: [{
                                    icon: {
                                        path: 'M 0,-1 0,1',
                                        strokeOpacity: 1, 
                                        scale: 4  
                                    },
                                    offset: `0`, 
                                    repeat: `20px`  // Esto define la longitud visible de la línea punteada
                                }]
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
            <button 
                className='btnAceptar'
                onClick={() => setShowGuideCardContainer(true)}
            >
                Aceptar
            </button>

            <GuideCardContainer isVisible={showGuideCardContainer} onClose={() => setShowGuideCardContainer(false)} />

        </div>
    );
}

export default Map;