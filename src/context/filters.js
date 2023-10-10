import { createContext, useState } from "react";

export const FilterContext = createContext()

export function FiltersProvider({ children }) {
    const [filterCategories, setFilterCategories] = useState({
        category: [],
        minPrice: 0,
    });
    const [term, setTerm] = useState("");
    const categories = ["Aventura", "Paisaje", "Gastronomia", "Historia"];
    return (
        <FilterContext.Provider value={{
            filterCategories,
            setFilterCategories,
            term,
            setTerm,
            categories,
        }}
        >
            {children}
        </FilterContext.Provider>
    )
}