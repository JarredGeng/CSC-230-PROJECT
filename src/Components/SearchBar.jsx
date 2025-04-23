// SearchBar.jsx

import { useState } from 'react';
import "../styles/Searchbar.css";




function SearchBar({ onSearch }) {
    console.log( " SearchBar component loaded" );
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        console.log("Searching for Fuckers:", query);

        try {
            const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            console.log("What your looking for :", data);
            Array.isArray(data) ? onSearch(data) : onSearch([]);
        } catch (error) {
            console.error("Error fetching search results", error);
            onSearch([]);
        }
    };

           
           

    const handleClear = () => {
        setQuery('');
        onClear(); // Clear search results in parent component
    }

    return (
        <div className="search-container" style={{ border: '2px solid white' }}>
              <input 
                type="text" 
                placeholder="Search Posters..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleClear} style= {{marginLeft: '10px'}}>Clear</button>
        </div>
    );
}
    

export default SearchBar;