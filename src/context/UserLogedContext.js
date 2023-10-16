import { createContext, useState } from "react";

export const UserLogedContext = createContext()

export function UserLogedProvider({ children }) {
    const [userLogedData, setUserLogedData] = useState(null);
    const [userLogedDataCollection, setUserLogedDataCollection] = useState(null);


    return (
        <UserLogedContext.Provider value={{
            userLogedData,
            setUserLogedData,
            userLogedDataCollection,
            setUserLogedDataCollection,
        }}
        >
            {children}
        </UserLogedContext.Provider>
    )
}