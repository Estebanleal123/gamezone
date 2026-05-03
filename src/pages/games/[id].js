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
        <nav style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)',
          marginBottom: 32, flexWrap: 'wrap',
        }}>
          <Link href="/" style={{ color: 'var(--blue)', fontWeight: 600 }}>Inicio</Link>
          <span>›</span>
          <Link href="/games" style={{ color: 'var(--blue)', fontWeight: 600 }}>Juegos</Link>
          <span>›</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{data.title}</span>
        </nav>

        {/* Detalle */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'start', marginBottom: 60,
        }}>

          {/* Imagen */}
          <div>
            <img
              src={data.thumbnail}
              alt={data.title}
              onError={(e) => { e.target.src = 'https://placehold.co/600x400/0a0a0f/00d4ff?text=🎮'; }}
              style={{
                width: '100%', borderRadius: 'var(--radius)',
                boxShadow: '0 8px 48px rgba(0,212,255,0.15)',
              }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              <span style={{
                background: '#1e1e2e', color: 'rgba(255,255,255,0.7)',
                padding: '6px 14px', borderRadius: 50,
                fontSize: '0.82rem', fontWeight: 700,
                border: '1px solid #2e2e3e',
              }}>
                {data.platform === 'PC (Windows)' ? '🖥️ PC' : '🌐 Navegador'}
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                color: 'white', padding: '6px 14px',
                borderRadius: 50, fontSize: '0.82rem', fontWeight: 700,
              }}>
                FREE TO PLAY
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{
              fontSize: '0.75rem', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 1.5,
              color: 'var(--blue)',
            }}>
              {data.genre}
            </span>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: 'var(--white)', lineHeight: 1.2,
            }}>
              {data.title}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
                Desarrollador: <strong style={{ color: 'var(--white)' }}>{data.developer}</strong>
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
                Publisher: <strong style={{ color: 'var(--white)' }}>{data.publisher}</strong>
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
                Lanzamiento: <strong style={{ color: 'var(--white)' }}>{data.release_date}</strong>
              </span>
            </div>

            <p style={{
              fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7, padding: 16,
              background: '#111118',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '4px solid var(--blue)',
            }}>
              {data.short_description}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => toggleFavorite(data)} style={{
                flex: 1, padding: '14px 24px', borderRadius: 50,
                fontWeight: 800, fontSize: '0.95rem',
                border: 'none', cursor: 'pointer',
                background: fav
                  ? 'linear-gradient(135deg, #ff2d78, #c0392b)'
                  : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                color: 'white',
                transition: 'var(--transition)',
                boxShadow: fav
                  ? '0 0 20px rgba(255,45,120,0.3)'
                  : '0 0 20px rgba(0,212,255,0.3)',
              }}>
                {fav ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}
              </button>

              <a href={data.game_url} target="_blank" rel="noreferrer" style={{
                padding: '14px 24px', borderRadius: 50, fontWeight: 700,
                fontSize: '0.95rem',
                background: '#111118',
                color: 'var(--white)',
                border: '1.5px solid #1e1e2e',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                🕹️ Jugar gratis
              </a>

              <button onClick={() => router.back()} style={{
                padding: '14px 24px', borderRadius: 50,
                fontWeight: 700, fontSize: '0.95rem',
                background: '#1e1e2e',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid #2e2e3e',
                cursor: 'pointer',
              }}>
                ← Volver
              </button>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {data.related?.length > 0 && (
          <section>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.6rem',
              color: 'var(--white)', marginBottom: 28,
            }}>
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