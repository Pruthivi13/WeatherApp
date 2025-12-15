import { useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Footer from './components/Footer';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (query) => {
    const API_KEY = 'ecfe6078041d40d3b68133325242603';
    
    // Check if input is a 6-digit Indian pincode
    let searchQuery = query;
    if (/^\d{6}$/.test(query.trim())) {
      searchQuery = `in:${query.trim()}`; // Format for Indian postal codes
    }
    
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`;

    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setError(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(true);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative transition-colors duration-300">
        <AnimatedBackground 
          weatherCondition={weatherData?.current?.condition?.text}
          isDay={weatherData?.current?.is_day}
        />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-1">
            <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
            <WeatherDisplay data={weatherData} error={error} />
          </main>
          
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
