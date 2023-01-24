import React from 'react';

const SearchBar = ({ keys, data, placeholder, setSearch }) => {
    const handleChange = (e) => {
        const resultArray = data.filter(item => (
            e.target.value === ''
                ? item
                : keys.some((key) => item[key].toLowerCase().includes(e.target.value.toLowerCase()))
        ))
        setSearch(resultArray)
    }

    return (
        <div>
            <div className='search-bar'>
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
};

export default SearchBar;


