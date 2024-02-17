// pages/_app.js
import { AppProvider } from '../context/AppContext';
import '../public/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
