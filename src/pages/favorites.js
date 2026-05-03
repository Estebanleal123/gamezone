import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import GameCard from '@/components/ui/GameCard';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--dark)' }}>
            ❤️ Mis Favoritos
          </h1>
          {favorites.length > 0 && (
            <span style={{ background: 'var(--blue)', color: 'white', padding: '4px 14px', borderRadius: 50, fontSize: '0.85rem', fontWeight: 800 }}>
              {favorites.length} juego{favorites.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {favorites.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '100px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '5rem' }}>🎮</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--dark)' }}>
              Tu lista de favoritos está vacía
            </h2>
            <p style={{ color: 'var(--gray)', maxWidth: 360, fontSize: '0.95rem' }}>
              Explora el catálogo y guarda los juegos que más te gusten.
            </p>
            <Link href="/games" style={{
              marginTop: 8, padding: '14px 36px', background: 'var(--blue)',
              color: 'white', borderRadius: 50, fontWeight: 800, fontSize: '1rem',
              display: 'inline-block',
            }}>
              Explorar juegos
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {favorites.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        )}
      </div>
    </main>
  );
}