import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchGameById } from '@/services/gameService';
import { useFetch } from '@/hooks/useFetch';
import { useFavorites } from '@/context/FavoritesContext';
import GameCard from '@/components/ui/GameCard';

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data, loading, error, refetch } = useFetch(
    () => id ? fetchGameById(id) : Promise.resolve({ data: null, error: null }),
    [id]
  );

  if (loading || !router.isReady) {
    return <div className="loader"><div className="loader-spinner" /><p>Cargando juego...</p></div>;
  }

  if (error || !data) {
    return (
      <div className="error-state" style={{ marginTop: 60 }}>
        <span style={{ fontSize: '3rem' }}>🎮</span>
        <h3>Juego no encontrado</h3>
        <p>{error || 'Este juego no existe.'}</p>
        <button className="btn-retry" onClick={refetch}>Reintentar</button>
        <Link href="/games" style={{ marginTop: 8, color: 'var(--blue)', fontWeight: 700 }}>
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const fav = isFavorite(data.id);

  return (
    <main style={{ padding: '32px 0 80px' }}>
      <div className="container">

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--gray)', marginBottom: 32, flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--blue)', fontWeight: 600 }}>Inicio</Link>
          <span>›</span>
          <Link href="/games" style={{ color: 'var(--blue)', fontWeight: 600 }}>Juegos</Link>
          <span>›</span>
          <span>{data.title}</span>
        </nav>

        {/* Detalle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', marginBottom: 60 }}>

          {/* Imagen */}
          <div>
            <img
              src={data.thumbnail}
              alt={data.title}
              onError={(e) => { e.target.src = 'https://placehold.co/600x400/1A3A6B/4A90D9?text=🎮'; }}
              style={{ width: '100%', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--gray-light)', color: 'var(--dark)', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 700 }}>
                {data.platform === 'PC (Windows)' ? '🖥️ PC' : '🌐 Navegador'}
              </span>
              <span style={{ background: 'var(--blue)', color: 'white', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 700 }}>
                FREE TO PLAY
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--gray)' }}>
              {data.genre}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--dark)', lineHeight: 1.2 }}>
              {data.title}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                Desarrollador: <strong style={{ color: 'var(--dark)' }}>{data.developer}</strong>
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                Publisher: <strong style={{ color: 'var(--dark)' }}>{data.publisher}</strong>
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
                Lanzamiento: <strong style={{ color: 'var(--dark)' }}>{data.release_date}</strong>
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--dark-light)', lineHeight: 1.7, padding: 16, background: 'var(--gray-light)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--blue)' }}>
              {data.short_description}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => toggleFavorite(data)}
                style={{
                  flex: 1, padding: '14px 24px', borderRadius: 50, fontWeight: 800,
                  fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                  background: fav ? '#C0392B' : 'var(--blue)', color: 'white',
                  transition: 'var(--transition)',
                }}>
                {fav ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}
              </button>
              <a href={data.game_url} target="_blank" rel="noreferrer"
                style={{
                  padding: '14px 24px', borderRadius: 50, fontWeight: 700,
                  fontSize: '0.95rem', background: 'var(--dark)', color: 'white',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                🕹️ Jugar gratis
              </a>
              <button onClick={() => router.back()}
                style={{ padding: '14px 24px', borderRadius: 50, fontWeight: 700, fontSize: '0.95rem', background: 'var(--gray-light)', color: 'var(--dark-light)', border: 'none', cursor: 'pointer' }}>
                ← Volver
              </button>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {data.related?.length > 0 && (
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--dark)', marginBottom: 28 }}>
              Juegos similares
            </h2>
            <div className="products-grid">
              {data.related.map((g) => <GameCard key={g.id} game={g} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}