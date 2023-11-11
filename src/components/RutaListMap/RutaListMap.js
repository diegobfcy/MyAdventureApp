import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import MapCard from '../MapCard/MapCard';
import './RutaListMap.css';
import MapMarker from '../../assets/icons/location-pin.png';
import { Polyline } from '@react-google-maps/api';
import OfertaLugarCardContainer from '../OfertaLugarCardContainer/OfertaLugarCardContainer';
import PlaceLugarCardContainer from '../PlaceLugarCardContainer/PlaceLugarCardContainer';

const config = require('../../config');
const GOOGLE_MAPS_API_KEY = config.googleMapsKey;

const mapContainerStyle = {
    width: '100%',
    height: '98vh'
};

const center = {
    lat: -16.406884,
    lng: -71.537302
};

const mapOptions = {
    styles: [ 
        {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
        }
    ],
    disableDefaultUI: true, 
    zoomControl: false
};

function RutaListMap({ coords = [] }) { //se ingresa las coordenadas de los lugares que se van a visitar
    const googleMapsRef = useRef(null);

    const handleGoogleMapsLoad = () => {
        googleMapsRef.current = window.google;
    };

    return (
        <div className='MapContainer'>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} onLoad={handleGoogleMapsLoad}>
                
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    options={mapOptions}
                >
                    {coords.map((item, idx) => {
                        if (!googleMapsRef.current) return null;

                        return (
                            <Marker
                                key={idx}
                                position={{ lat: item.latitud, lng: item.longitud }}
                                icon={{
                                    url: MapMarker,
                                    scaledSize: new googleMapsRef.current.maps.Size(40, 40)
                                }}
                            />
                        );
                    })}

                    {coords.length >= 2 && (
                        <Polyline
                            path={coords}
                            options={{
                                strokeColor: "#792A49",
                                strokeOpacity: 0,
                                strokeWeight: 4,  
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
                                    repeat: `20px` 
                                }]
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>

            {false &&
                <OfertaLugarCardContainer isVisible={true}  />
            }: {
                <PlaceLugarCardContainer isVisible={true}  />
            }
        </div>
    );
}

export default RutaListMap;