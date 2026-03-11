import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchFeaturedGames } from '@/services/gameService';
import { useFetch } from '@/hooks/useFetch';
import GameCard from '@/components/ui/GameCard';

const CATEGORIES = [
  { label: 'Shooter', icon: '🔫', value: 'shooter' },
  { label: 'MMORPG', icon: '⚔️', value: 'mmorpg' },
  { label: 'Strategy', icon: '♟️', value: 'strategy' },
  { label: 'MOBA', icon: '🏆', value: 'moba' },
  { label: 'Battle Royale', icon: '🪖', value: 'battle-royale' },
  { label: 'Racing', icon: '🏎️', value: 'racing' },
];

export default function Home() {
  const router = useRouter();
  const { data: featured, loading, error } = useFetch(() => fetchFeaturedGames(), []);

  const pcGames = useMemo(() => featured?.filter((g) => g.platform === 'PC (Windows)') ?? [], [featured]);
  const browserGames = useMemo(() => featured?.filter((g) => g.platform === 'Web Browser') ?? [], [featured]);

  return (
    <main>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1A3A6B 0%, #2D72C0 100%)',
        color: 'white', padding: '80px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 60, minHeight: 480,
      }}>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.7, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🎮 Descubre juegos gratis
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.1, marginBottom: 16 }}>
            Los mejores juegos<br />
            <span style={{ color: '#93C5FD' }}>100% gratuitos</span>
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.8, marginBottom: 32, lineHeight: 1.6 }}>
            Explora cientos de juegos free-to-play para PC y navegador. Filtra por género y encuentra tu próximo favorito.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/games?platform=pc" style={{
              padding: '14px 28px', borderRadius: 50, fontWeight: 800,
              fontSize: '0.95rem', background: 'white', color: 'var(--blue-dark)',
            }}>🖥️ Juegos PC</Link>
            <Link href="/games?platform=browser" style={{
              padding: '14px 28px', borderRadius: 50, fontWeight: 800,
              fontSize: '0.95rem', background: 'rgba(255,255,255,0.15)',
              color: 'white', border: '2px solid rgba(255,255,255,0.4)',
            }}>🌐 Juegos Navegador</Link>
          </div>
        </div>
        <div style={{
          width: 220, height: 220, background: 'rgba(255,255,255,0.08)',
          borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '6rem', flexShrink: 0,
        }}>
          🎮
        </div>
      </section>

      {/* Categorías */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--dark)', marginBottom: 32 }}>
            Explorar por género
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat.value} onClick={() => router.push(`/games?genre=${cat.value}`)}
                style={{
                  background: 'white', borderRadius: 'var(--radius)', padding: '24px 16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  boxShadow: 'var(--shadow)', transition: 'var(--transition)', cursor: 'pointer', border: '2px solid transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark-light)' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--dark)', marginBottom: 32 }}>
            ⭐ Juegos destacados
          </h2>

          {loading && <div className="loader"><div className="loader-spinner" /><p>Cargando juegos...</p></div>}

          {error && (
            <div className="error-state">
              <span style={{ fontSize: '2rem' }}>😿</span>
              <h3>Algo salió mal</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {pcGames.length > 0 && (
                <>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-light)', marginBottom: 20 }}>🖥️ Para PC</h3>
                  <div className="products-grid" style={{ marginBottom: 40 }}>
                    {pcGames.map((g) => <GameCard key={g.id} game={g} />)}
                  </div>
                </>
              )}
              {browserGames.length > 0 && (
                <>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-light)', marginBottom: 20 }}>🌐 Para Navegador</h3>
                  <div className="products-grid">
                    {browserGames.map((g) => <GameCard key={g.id} game={g} />)}
                  </div>
                </>
              )}
              {pcGames.length === 0 && browserGames.length === 0 && featured?.length > 0 && (
                <div className="products-grid">
                  {featured.map((g) => <GameCard key={g.id} game={g} />)}
                </div>
              )}
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/games" style={{
              display: 'inline-block', padding: '14px 36px',
              background: 'var(--dark)', color: 'white', borderRadius: 50,
              fontWeight: 800, fontSize: '1rem',
            }}>Ver todos los juegos →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}