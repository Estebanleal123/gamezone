import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchGames } from '@/services/gameService';
import GameCard from '@/components/ui/GameCard';

export default function Search() {
  const router = useRouter();
  const { q, platform } = router.query;
  const petFilter = platform || 'all';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doSearch = useCallback(async () => {
    if (!q?.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await fetchGames({
        platform: petFilter !== 'all' ? petFilter : undefined,
      });
      if (err) throw new Error(err);
      const filtered = data?.filter((g) =>
        g.title.toLowerCase().includes(q.toLowerCase()) ||
        g.short_description.toLowerCase().includes(q.toLowerCase()) ||
        g.genre.toLowerCase().includes(q.toLowerCase())
      ) || [];
      setResults(filtered);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [q, petFilter]);

  useEffect(() => {
    if (!router.isReady) return;
    doSearch();
  }, [router.isReady, doSearch]);

  const updatePlatform = (value) => {
    const query = { ...router.query };
    if (value === 'all') delete query.platform;
    else query.platform = value;
    router.push({ pathname: '/search', query });
  };

  return (
    <main style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--dark)' }}>
            {q ? `Resultados para "${q}"` : 'Búsqueda'}
          </h1>
          {!loading && !error && q && (
            <span style={{ color: 'var(--gray)', fontSize: '0.9rem', fontWeight: 600 }}>
              {results.length} resultado{results.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {q && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            {[['all', '🎮 Todos'], ['pc', '🖥️ PC'], ['browser', '🌐 Navegador']].map(([val, label]) => (
              <button key={val} onClick={() => updatePlatform(val)}
                style={{
                  padding: '10px 22px', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem',
                  border: '2px solid', cursor: 'pointer', transition: 'var(--transition)',
                  background: petFilter === val ? 'var(--blue)' : 'white',
                  color: petFilter === val ? 'white' : 'var(--dark-light)',
                  borderColor: petFilter === val ? 'var(--blue)' : 'var(--gray-light)',
                }}>
                {label}
              </button>
            ))}
          </div>
        )}

        {!q && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '80px 20px', textAlign: 'center', color: 'var(--gray)' }}>
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <p>Usa la barra de búsqueda para encontrar juegos.</p>
            <Link href="/games" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'underline' }}>
              Ver todos los juegos
            </Link>
          </div>
        )}

        {loading && <div className="loader"><div className="loader-spinner" /><p>Buscando...</p></div>}

        {error && (
          <div className="error-state">
            <span style={{ fontSize: '2.5rem' }}>😿</span>
            <h3>Error al buscar</h3>
            <p>{error}</p>
            <button className="btn-retry" onClick={doSearch}>Reintentar</button>
          </div>
        )}

        {!loading && !error && q && results.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '80px 20px', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>😕</span>
            <h3 style={{ color: 'var(--dark)' }}>Sin resultados</h3>
            <p style={{ color: 'var(--gray)' }}>No encontramos juegos para "{q}".</p>
            <Link href="/games" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'underline' }}>
              Explorar catálogo completo
            </Link>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="products-grid">
            {results.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        )}
      </div>
    </main>
  );
}