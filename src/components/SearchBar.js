import React from 'react';
import { useState, useEffect, useMemo } from 'react';

const SearchBar = ({ keys, data, placeholder, setSearch }) => {

    // const handleChange = (e) => {
    //     if(!e.target.value) return setSearch(data)

    //     const resultArray = data.filter(item => (
    //         keys.some((key) => item[key].toLowerCase().includes(e.target.value)))
    //     );
    //     setSearch(resultArray)
    // };


    const handleChange = (e) => {
        const resultArray =  data.filter(item => (
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


