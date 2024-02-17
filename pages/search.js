import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../public/styles/search.module.css'; // Import CSS file

const Search = () => {
  const router = useRouter();
  const { q } = router.query;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/weather?q=${q}`);
        setWeather(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching weather data. Please try again.');
      }
    };

    if (q) {
      fetchData();
    }
  }, [q]);

  

  const handleDetailsClick = () => {
    if (q) {
      router.push(`/details?q=${q}`); // Navigate to the details page with the search query
    }
  };

  const handleHomeClick = () => {
    if (q) {
      router.push(`/`); // Navigate to the details page with the search query
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <h1>Weather App</h1>
        <button className={`${styles.button}`} onClick={handleDetailsClick}>
            Details
        </button>
        <button className={`${styles.button}`} onClick={handleHomeClick}>
            Home
        </button>
      </div>
      
      <div className={styles.blur}></div>
      <div className={styles.centered}>
        <div className={styles.card}>
          <h1 className={styles.cardTitle}>
            {q ? `Weather Details for ${q.toUpperCase()}` : 'Enter a City Name'}
          </h1>
          {error && <p className={styles.error}>{error}</p>}
          {weather && (
            <>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Temperature: {weather.main.temp}°C</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Humidity: {weather.main.humidity}%</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Description: {weather.weather[0].description}</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Feels Like: {weather.main.feels_like}°C</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Pressure: {weather.main.pressure} hPa</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className={styles.gridItem}>
                <div className={styles.box}>
                  <p className={styles.cardContent}>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;