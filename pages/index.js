import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../public/styles/home.module.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
        setError('Please enter a city name.');
        return;
    }

    router.push(`/search?q=${query}`);
  };

  return (
    <div className={styles.background}>
      <div className={styles.centered}>
        <div className={styles.inputContainer}>
          <h1>Weather App</h1>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a city name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;