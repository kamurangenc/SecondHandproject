import React, { useState } from "react";
import "./Search.css";
import Select from 'react-select';

const Search = ({
  searchCategory,
  setSearchCategory,
  searchPlace,
  setSearchPlace,
  searchTitle,
  setSearchTitle, options
}) => {
  const handleSelects = (e, index) => {
  
      setSearchCategory(e.value)
     console.log('e:', e)
     


    
    
  }

  return (
    <div className="Search__page mr-5 Search__category_div">
        <label>Kategoriler</label>
        <Select
          name="search"
          options={options}
          value={searchCategory}
        
          type="text"
          placeholder="Category"
          onChange={(e) => handleSelects(e)}
        />
       
      <div className="Search__place_div">
        <label>Place filter</label>
        <input
          name="search"
          value={searchPlace}
          className="form-control me-sm-2"
          type="text"
          placeholder="Place"
          onChange={(e) => setSearchPlace(e.target.value)}
        />
      </div>
      <div className="Search__title_div">
        <label>Search</label>
        <input
          name="search"
          value={searchTitle}
          className="form-control me-sm-2"
          type="text"
          placeholder="iPhone"
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
