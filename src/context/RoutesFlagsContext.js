import { createContext, useState } from "react";

export const RoutesFlagsContext = createContext()

export function RoutesFlagsProvider({ children }) {
    const [isLoged, setIsLoged] = useState(false);
    const [isOfert, setIsOfert] = useState(false);
    return (
        <RoutesFlagsContext.Provider value={{
            isLoged,
            isOfert,
            setIsLoged,
            setIsOfert,
        }}
        >
            {children}
        </RoutesFlagsContext.Provider>
    )
}