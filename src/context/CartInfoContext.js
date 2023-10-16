import { createContext, useState } from "react";

export const CartInfoContext = createContext()

export function CartInfoProvider({ children }) {
    const [LugarCardAdded, setLugarCardAdded] = useState({
        user: "",
        places: [],
        day: 0,
        month: 0,
        persons: 0,
    });

    const ErrorMessageCart = {
        places: "El carrito de lugares esta vacio",
        day: "Agrege el valor del dia",
        month: "Agrege el valor del mes",
        persons: "Agrege número de personas",
    };

    return (
        <CartInfoContext.Provider value={{
            LugarCardAdded,
            setLugarCardAdded,
            ErrorMessageCart,
        }}
        >
            {children}
        </CartInfoContext.Provider>
    )
}