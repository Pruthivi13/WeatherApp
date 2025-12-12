// Helper function to determine weather type from condition text
const getWeatherType = (conditionText, isDay) => {
  if (!conditionText) return 'default';
  
  const condition = conditionText.toLowerCase();
  
  // Clear/Sunny
  if (condition.includes('sunny') || condition.includes('clear')) {
    return isDay ? 'sunny' : 'clear_night';
  }
  
  // Rainy
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    return 'rainy';
  }
  
  // Snowy
  if (condition.includes('snow') || condition.includes('blizzard') || condition.includes('sleet')) {
    return 'snowy';
  }
  
  // Stormy
  if (condition.includes('thunder') || condition.includes('storm')) {
    return 'stormy';
  }
  
  // Cloudy/Overcast
  if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('mist') || condition.includes('fog')) {
    return 'cloudy';
  }
  
  return 'default';
};

const AnimatedBackground = ({ weatherCondition = null, isDay = 1 }) => {
  const weatherType = getWeatherType(weatherCondition, isDay);
  
  // Weather-specific color schemes
  const weatherColors = {
    sunny: {
      gradient1: { start: 'rgba(255, 200, 0, 1)', end: 'rgba(255, 200, 0, 0)' },
      gradient2: { start: 'rgba(255, 150, 50, 1)', end: 'rgba(255, 150, 50, 0)' },
      gradient3: { start: 'rgba(255, 220, 100, 1)', end: 'rgba(255, 220, 100, 0)' },
      bg: '#87ceeb'
    },
    clear_night: {
      gradient1: { start: 'rgba(100, 100, 200, 1)', end: 'rgba(100, 100, 200, 0)' },
      gradient2: { start: 'rgba(150, 150, 255, 1)', end: 'rgba(150, 150, 255, 0)' },
      gradient3: { start: 'rgba(200, 200, 255, 1)', end: 'rgba(200, 200, 255, 0)' },
      bg: '#1a1a3e'
    },
    rainy: {
      gradient1: { start: 'rgba(100, 150, 200, 1)', end: 'rgba(100, 150, 200, 0)' },
      gradient2: { start: 'rgba(80, 120, 180, 1)', end: 'rgba(80, 120, 180, 0)' },
      gradient3: { start: 'rgba(120, 160, 200, 1)', end: 'rgba(120, 160, 200, 0)' },
      bg: '#5a7a9a'
    },
    snowy: {
      gradient1: { start: 'rgba(200, 220, 255, 1)', end: 'rgba(200, 220, 255, 0)' },
      gradient2: { start: 'rgba(220, 230, 255, 1)', end: 'rgba(220, 230, 255, 0)' },
      gradient3: { start: 'rgba(180, 200, 240, 1)', end: 'rgba(180, 200, 240, 0)' },
      bg: '#d0e8f0'
    },
    stormy: {
      gradient1: { start: 'rgba(80, 80, 120, 1)', end: 'rgba(80, 80, 120, 0)' },
      gradient2: { start: 'rgba(100, 100, 140, 1)', end: 'rgba(100, 100, 140, 0)' },
      gradient3: { start: 'rgba(60, 60, 100, 1)', end: 'rgba(60, 60, 100, 0)' },
      bg: '#4a5a6a'
    },
    cloudy: {
      gradient1: { start: 'rgba(150, 150, 170, 1)', end: 'rgba(150, 150, 170, 0)' },
      gradient2: { start: 'rgba(170, 170, 190, 1)', end: 'rgba(170, 170, 190, 0)' },
      gradient3: { start: 'rgba(130, 130, 150, 1)', end: 'rgba(130, 130, 150, 0)' },
      bg: '#a0b0c0'
    },
    default: {
      gradient1: { start: 'rgba(255, 0, 255, 1)', end: 'rgba(255, 0, 255, 0)' },
      gradient2: { start: 'rgba(255, 255, 0, 1)', end: 'rgba(255, 255, 0, 0)' },
      gradient3: { start: 'rgba(0, 255, 255, 1)', end: 'rgba(0, 255, 255, 0)' },
      bg: '#87ceeb'
    }
  };
  
  const colors = weatherColors[weatherType] || weatherColors.default;
  
  // Animation speeds based on weather
  const speeds = {
    sunny: { dur1: '34s', dur2: '23.5s', dur3: '21.5s' },
    clear_night: { dur1: '45s', dur2: '35s', dur3: '40s' },
    rainy: { dur1: '15s', dur2: '12s', dur3: '10s' },
    snowy: { dur1: '30s', dur2: '25s', dur3: '28s' },
    stormy: { dur1: '8s', dur2: '6s', dur3: '7s' },
    cloudy: { dur1: '40s', dur2: '35s', dur3: '38s' },
    default: { dur1: '34s', dur2: '23.5s', dur3: '21.5s' }
  };
  
  const speed = speeds[weatherType] || speeds.default;
  
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: colors.bg }}
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid slice"
        className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
            <animate attributeName="fx" dur={speed.dur1} values="0%;3%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor={colors.gradient1.start} />
            <stop offset="100%" stopColor={colors.gradient1.end} />
          </radialGradient>
          
          <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
            <animate attributeName="fx" dur={speed.dur2} values="0%;3%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor={colors.gradient2.start} />
            <stop offset="100%" stopColor={colors.gradient2.end} />
          </radialGradient>
          
          <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
            <animate attributeName="fx" dur={speed.dur3} values="0%;3%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor={colors.gradient3.start} />
            <stop offset="100%" stopColor={colors.gradient3.end} />
          </radialGradient>
        </defs>
        
        <rect
          x="13.744%"
          y="1.18473%"
          width="100%"
          height="100%"
          fill="url(#Gradient1)"
          transform="rotate(334.41 50 50)"
        >
          <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
          <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="7s"
            repeatCount="indefinite"
          />
        </rect>
        
        <rect
          x="-2.17916%"
          y="35.4267%"
          width="100%"
          height="100%"
          fill="url(#Gradient2)"
          transform="rotate(255.072 50 50)"
        >
          <animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite" />
          <animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="12s"
            repeatCount="indefinite"
          />
        </rect>
        
        <rect
          x="9.00483%"
          y="14.5733%"
          width="100%"
          height="100%"
          fill="url(#Gradient3)"
          transform="rotate(139.903 50 50)"
        >
          <animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite" />
          <animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="9s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      
      {/* Weather-specific particle effects */}
      {weatherType === 'rainy' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-300/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animation: `fall ${1 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {weatherType === 'snowy' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animation: `snowfall ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
      
      {weatherType === 'clear_night' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        
        @keyframes snowfall {
          to {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
