import { createContext, useState } from "react";

export const RoutesFlagsContext = createContext()

export function RoutesFlagsProvider({ children }) {
    const [isLoged, setIsLoged] = useState(true);
    const [isOfert, setIsOfert] = useState(false);
    const [justView, setJustView] = useState(false)

    return (
        <RoutesFlagsContext.Provider value={{
            isLoged,
            isOfert,
            setIsLoged,
            setIsOfert,
            justView,
            setJustView,
        }}
        >
            {children}
        </RoutesFlagsContext.Provider>
    )
}