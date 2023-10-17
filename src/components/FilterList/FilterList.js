import { FaSearch, FaCaretDown, FaCaretUp  } from 'react-icons/fa';
import { FilterContext } from '../../context/filters';
import { useState } from 'react';
import './FilterList.css'

const { useId, useContext } = require("react")

function FilterList() {
    const { filterCategories, setFilterCategories, setTerm, categories } = useContext(FilterContext);
    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [showTagFilter, setShowTagFilter] = useState(false);


    const handleChangeMinPrice = e => {
        setFilterCategories(prev => ({
            ...prev,
            minPrice: e.target.value,
        }))
    }

    const handleChangeCheckbox = e => {
        if (e.target.checked) {
            setFilterCategories(prev => ({
                ...prev,
                category: [...prev.category, e.target.value],
            }))
        } else {
            setFilterCategories(prev => ({
                ...prev,
                category: [...prev.category.filter(x => {
                    return x !== e.target.value;
                })],
            }))
        }
    }

    return (
        <section className="filters">
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Busca tu propia aventura" onChange={e => setTerm(e.target.value)} />
            </div>
            
            <div className="accordion-section">
                <button className="accordion-title" onClick={() => setShowPriceFilter(!showPriceFilter)}>
                    Precio {showPriceFilter ? <FaCaretUp /> : <FaCaretDown />}
                </button>
                {showPriceFilter && (
                    <div className='FilterList-ContenedorPriceRange'>
                        <label htmlFor={minPriceFilterId}>Precio</label>
                        <input
                            type="range"
                            id={minPriceFilterId}
                            min='0'
                            max='1000'
                            onChange={handleChangeMinPrice}
                            value={filterCategories.minPrice}
                        />
                        <span>${filterCategories.minPrice}</span>
                    </div>
                )}
            </div>

            <div className="accordion-section">
                <button className="accordion-title" onClick={() => setShowTagFilter(!showTagFilter)}>
                    Etiquetas {showTagFilter ? <FaCaretUp /> : <FaCaretDown />}
                </button>
                {showTagFilter && (
                    <div className='FilterList-ContenedorEtiquetas'>    
                        {categories.map((category, index) => (
                            <div key={index}>
                                <input type="checkbox" id={category.toLowerCase()} value={category} onChange={handleChangeCheckbox} />
                                <label htmlFor={category.toLowerCase()}>{category}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </section>
    );

}

export default FilterList;