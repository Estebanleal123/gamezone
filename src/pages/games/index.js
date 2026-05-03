import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { fetchGames, GENRES } from '@/services/gameService';
import GameCard from '@/components/ui/GameCard';
import ProtectedRoute from '@/components/ProtectedRoute';

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevancia' },
  { value: 'release-date', label: 'Más recientes' },
  { value: 'popularity', label: 'Más populares' },
  { value: 'alphabetical', label: 'Nombre A-Z' },
];

export default function Games() {
  const router = useRouter();
  const { platform, genre, sort } = router.query;

  const platformFilter = platform || 'all';
  const genreFilter = genre || 'all';
  const sortBy = sort || 'default';

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await fetchGames({
        platform: platformFilter !== 'all' ? platformFilter : undefined,
        category: genreFilter !== 'all' ? genreFilter : undefined,
        sortBy: sortBy !== 'default' ? sortBy : undefined,
      });
      if (err) throw new Error(err);
      setGames(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [platformFilter, genreFilter, sortBy]);

  useEffect(() => {
    if (!router.isReady) return;
    loadGames();
  }, [router.isReady, loadGames]);

  const updateParam = (key, value) => {
    const query = { ...router.query };
    if (value === 'all' || value === 'default' || !value) {
      delete query[key];
    } else {
      query[key] = value;
    }
    router.push({ pathname: '/games', query });
  };

  return (
    <ProtectedRoute>
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--dark)', marginBottom: 32 }}>
          🎮 Todos los juegos
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32, alignItems: 'start' }}>

          {/* Sidebar */}
          <aside style={{
            background: 'white', borderRadius: 'var(--radius)',
            padding: 24, boxShadow: 'var(--shadow)',
            position: 'sticky', top: 90, alignSelf: 'start',
          }}>
            {/* Plataforma */}
            <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--gray-light)' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--dark-light)', marginBottom: 12 }}>
                🖥️ Plataforma
              </h3>
              {[['all', 'Todas'], ['pc', '🖥️ PC'], ['browser', '🌐 Navegador']].map(([val, label]) => (
                <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="radio" name="platform" value={val} checked={platformFilter === val} onChange={() => updateParam('platform', val)} style={{ accentColor: 'var(--blue)' }} />
                  {label}
                </label>
              ))}
            </div>

            {/* Género */}
            <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--gray-light)' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--dark-light)', marginBottom: 12 }}>
                🎮 Género
              </h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="radio" name="genre" value="all" checked={genreFilter === 'all'} onChange={() => updateParam('genre', 'all')} style={{ accentColor: 'var(--blue)' }} />
                Todos
              </label>
              {GENRES.map((g) => (
                <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                  <input type="radio" name="genre" value={g} checked={genreFilter === g} onChange={() => updateParam('genre', g)} style={{ accentColor: 'var(--blue)' }} />
                  {g}
                </label>
              ))}
            </div>

            {/* Ordenar */}
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--dark-light)', marginBottom: 12 }}>
                ↕️ Ordenar
              </h3>
              <select value={sortBy} onChange={(e) => updateParam('sort', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--gray-light)', background: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--dark)', cursor: 'pointer', outline: 'none' }}>
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {(platformFilter !== 'all' || genreFilter !== 'all' || sortBy !== 'default') && (
              <button onClick={() => router.push('/games')}
                style={{ width: '100%', marginTop: 16, padding: 10, background: 'var(--gray-light)', color: 'var(--dark-light)', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}>
                ✕ Limpiar filtros
              </button>
            )}
          </aside>

          {/* Resultados */}
          <section>
            {loading && <div className="loader"><div className="loader-spinner" /><p>Cargando juegos...</p></div>}

            {error && (
              <div className="error-state">
                <span style={{ fontSize: '2.5rem' }}>😿</span>
                <h3>No pudimos cargar los juegos</h3>
                <p>{error}</p>
                <button className="btn-retry" onClick={loadGames}>Reintentar</button>
              </div>
            )}

            {!loading && !error && (
              <>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: 20, fontWeight: 600 }}>
                  {games.length} juego{games.length !== 1 ? 's' : ''} encontrado{games.length !== 1 ? 's' : ''}
                </p>
                {games.length === 0 ? (
                  <div className="error-state">
                    <span style={{ fontSize: '3rem' }}>🔍</span>
                    <h3>Sin resultados</h3>
                    <p>Prueba con otros filtros.</p>
                  </div>
                ) : (
                  <div className="products-grid">
                    {games.map((g) => <GameCard key={g.id} game={g} />)}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}