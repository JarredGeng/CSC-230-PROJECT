// SearchBar.jsx

import { useState } from 'react';
import "../styles/Searchbar.css";




function SearchBar({ onSearch }) {
    console.log( " SearchBar component loaded" );
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            // Call the parent function with results
            if (Array.isArray(data)) {
                onSearch(data);
            } else {
                onSearch([]); // No results found
            }
        } catch (error) {
            console.error("Error fetching search results", error);
            onSearch([]); // Handle errors by showing no results
        }
    };

    return (
        <div className="search-container">
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