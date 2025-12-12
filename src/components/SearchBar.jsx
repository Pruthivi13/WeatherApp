import { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
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
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Your City"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm 
                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                     placeholder-gray-500 text-gray-800 font-medium transition-all"
        />
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
    </div>
  );
};

export default SearchBar;
