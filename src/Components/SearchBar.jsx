// SearchBar.jsx

import { useState, useEffect } from 'react';
import "../styles/Searchbar.css";




function SearchBar({ onSearch, onClear }) {
    console.log( " SearchBar component loaded" );
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query === '') {
            if (onClear) onClear(); // Clear search results in parent component
            }
        }, [query, onClear]);



    const handleSearch = async () => {
        if (!query.trim()) return;

        console.log("Searching for Fuckers:", query);

        try {
            const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
           
            console.log("What your looking for :", data);


           if(Array.isArray(data)) {
                onSearch(data); // Pass search results to parent component
            }
            else {
                onSearch([]); // Pass empty array if no results found
            }
        } catch (error) {
            console.error("Error searching posters:", error);
            onSearch([]);
        }
    };

           
           

  

    return (
        <div className="search-container" style={{ border: '2px solid white' }}>
              <input 
                type="text" 
                placeholder="Search Posters..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
    

export default SearchBar;