import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';

export default function App({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </FavoritesProvider>
  );
}