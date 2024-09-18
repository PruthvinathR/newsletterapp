import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm }) => {
  return (
    <div className="search-container" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
      <input 
        type="text" 
        placeholder={searchTerm} 
        className="search-input" 
        style={{ 
          width: '60%', 
          height: '40px', 
          marginRight: '10px', 
          borderRadius: '5px', 
          backgroundColor: '#F1F1F1',
          border: '1px solid grey', 
          paddingLeft: '10px'
        }} 
      />
      <FaSearch className="search-icon" style={{ height: '40px', alignSelf: 'center' }} /> {/* Center align with padding */}
    </div>
  );
}

export default SearchBar;