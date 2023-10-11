import { FaSearch } from 'react-icons/fa';
import { FilterContext } from '../../context/filters';

const { useId, useContext } = require("react")

function FilterList() {
    const { filterCategories, setFilterCategories, setTerm, categories } = useContext(FilterContext);
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

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
            <div>
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
            <div>
                {categories.map((category, index) => (
                    <div key={index}>
                        <input type="checkbox" id={category.toLowerCase()} value={category} onChange={handleChangeCheckbox} />
                        <label htmlFor={category.toLowerCase()}>{category}</label>
                    </div>
                ))}
            </div>
        </section >
    );

}

export default FilterList;