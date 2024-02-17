import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../public/styles/details.module.css'; // Import CSS file

const Details = () => {
  const router = useRouter();
  const { q } = router.query;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/forecast?q=${q}`);
        setWeather(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (q) {
      fetchData();
    }
  }, [q]);

  const handleSearchClick = () => {
    if (q) {
      router.push(`/search?q=${q}`); // Navigate to the details page with the search query
    }
  };

  const getNextFiveDaysForecast = () => {
    if (!weather || !weather.list) return [];

    // Group forecast data by date
    const groupedByDate = weather.list.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    // Get only one temperature reading per day
    const nextFiveDaysForecast = Object.values(groupedByDate).slice(1, 6);

    return nextFiveDaysForecast;
  };

  return (
    <div className={styles.background}>
      <h1>5-Day Weather Forecast for {q}</h1>
      <button className={`${styles.button}`} onClick={handleSearchClick}>Search</button>
      {error && <div className={styles.error}>Error: {error}</div>}
      <div className={styles.forecastContainer}>
        {getNextFiveDaysForecast().map((dayForecast, index) => (
          <div key={index} className={styles.forecastItem}>
            <h2>{new Date(dayForecast[0].dt * 1000).toDateString()}</h2>
            <p>Temperature: {dayForecast[0].main.temp}°C</p>
            <p>Humidity: {dayForecast[0].main.humidity}%</p>
            <p>Wind Speed: {dayForecast[0].wind.speed} m/s</p>
            <p>Description: {dayForecast[0].weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
