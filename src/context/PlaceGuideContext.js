import { createContext, useState } from "react";

export const PlaceGuideContext = createContext()

export function PlaceGuideProvider({ children }) {
    const [ guideTourData , setGuideTourData] = useState(null);
    const [ transportTourData, setTransportTourData] = useState(null)

    return (
        <PlaceGuideContext.Provider value={{
            guideTourData,
            setGuideTourData,
            transportTourData,
            setTransportTourData,
        }}
        >
            {children}
        </PlaceGuideContext.Provider>
    )
}