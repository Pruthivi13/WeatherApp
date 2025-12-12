const WeatherCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 flex flex-col items-center 
                    hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg">
      <div className="text-gray-800 mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">
        {title}
      </h3>
      <p className="text-xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default WeatherCard;
