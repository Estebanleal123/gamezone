import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </FavoritesProvider>
    </AuthProvider>
  );
}