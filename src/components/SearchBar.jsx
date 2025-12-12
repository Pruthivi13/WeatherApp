import { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const shouldFetchSuggestionsRef = useRef(true);

  const API_KEY = 'ecfe6078041d40d3b68133325242603';

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length < 1) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      // Don't fetch if we shouldn't (e.g., after clicking a suggestion)
      if (!shouldFetchSuggestionsRef.current) {
        return;
      }

      setIsSearching(true);
      try {
        // Format query for Indian pincodes (6 digits)
        let searchQuery = city;
        if (/^\d{6}$/.test(city.trim())) {
          searchQuery = `in:${city.trim()}`;
        }
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
          // Only show suggestions if there are results
          if (data.length > 0) {
            setShowSuggestions(true);
          }
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    shouldFetchSuggestionsRef.current = false; // Prevent fetching suggestions
    setCity(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto">
      {/* Title with Icon */}
      <div className="flex items-center gap-3 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="currentColor"
          className="text-amber-500"
          viewBox="0 0 16 16"
        >
          <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4" />
        </svg>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          WEATHER APP
        </h1>
      </div>

      {/* Search Input and Button */}
      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={city}
            onChange={(e) => {
              shouldFetchSuggestionsRef.current = true; // Re-enable fetching when user types
              setCity(e.target.value);
            }}
            onKeyDown={handleKeyDown}

            placeholder="Enter a City / Pincode"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm 
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                       placeholder-gray-500 text-gray-800 font-medium transition-all"
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSuggestionClick(suggestion);
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-sky-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-800">{suggestion.name}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.region && `${suggestion.region}, `}{suggestion.country}
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* Loading indicator for suggestions */}
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-medium
                     hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all
                     flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : null}
          Get Weather
        </button>
      </div>
      
      {/* Pincode accuracy note */}
      <p className="text-xs text-gray-600 mt-3 text-center">
        💡 Tip: City names provide more accurate results. Pincode accuracy may vary.
      </p>
    </div>
  );
};

export default SearchBar;
