import { createContext, useState } from "react";

export const PlaceOfertContext = createContext()

export function PlaceOfertProvider({ children }) {
    const [ placesOfert , setPlacesOfert] = useState({
        places: [],
    });

    return (
        <PlaceOfertContext.Provider value={{
            placesOfert,
            setPlacesOfert,
        }}
        >
            {children}
        </PlaceOfertContext.Provider>
    )
}