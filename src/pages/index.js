import { useMemo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchFeaturedGames } from '@/services/gameService';
import { useFetch } from '@/hooks/useFetch';
import GameCard from '@/components/ui/GameCard';

const CATEGORIES = [
  { label: 'Shooter',      icon: '🔫', value: 'shooter' },
  { label: 'MMORPG',       icon: '⚔️',  value: 'mmorpg' },
  { label: 'Strategy',     icon: '♟️',  value: 'strategy' },
  { label: 'MOBA',         icon: '🏆', value: 'moba' },
  { label: 'Battle Royale',icon: '🪖', value: 'battle-royale' },
  { label: 'Racing',       icon: '🏎️', value: 'racing' },
];

// Hook para animar elementos cuando entran en pantalla
function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function Home() {
  const router = useRouter();
  const { data: featured, loading, error } = useFetch(() => fetchFeaturedGames(), []);

  const pcGames      = useMemo(() => featured?.filter((g) => g.platform === 'PC (Windows)') ?? [], [featured]);
  const browserGames = useMemo(() => featured?.filter((g) => g.platform === 'Web Browser')  ?? [], [featured]);

  const [heroRef,   heroVisible]   = useInView();
  const [catRef,    catVisible]    = useInView();
  const [gamesRef,  gamesVisible]  = useInView();

  return (
    <main>

      {/* COHETE izquierda */}
        <div style={{
          position: 'absolute', left: '8%', top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none', zIndex: 1,
        }}>
          <svg style={{
            animation: 'rocketFloat 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 14px #7c3aed99)',
          }} width="140" height="220" viewBox="0 0 120 200">
            <circle cx="10"  cy="25"  r="2.5" fill="white" style={{animation:'starPulse 1.8s ease-in-out 0s infinite'}}/>
            <circle cx="108" cy="50"  r="2"   fill="white" style={{animation:'starPulse 2.2s ease-in-out 0.4s infinite'}}/>
            <circle cx="6"   cy="90"  r="3"   fill="white" style={{animation:'starPulse 1.5s ease-in-out 0.8s infinite'}}/>
            <circle cx="112" cy="125" r="2"   fill="white" style={{animation:'starPulse 2s ease-in-out 0.2s infinite'}}/>
            <circle cx="15"  cy="155" r="2.5" fill="white" style={{animation:'starPulse 2.5s ease-in-out 1s infinite'}}/>
            <path d="M26 130 Q8 155 20 165 L38 148 Z" fill="#6d28d9" stroke="#4c1d95" strokeWidth="2"/>
            <path d="M94 130 Q112 155 100 165 L82 148 Z" fill="#6d28d9" stroke="#4c1d95" strokeWidth="2"/>
            <path d="M26 148 L26 82 Q26 20 60 4 Q94 20 94 82 L94 148 Q77 160 60 160 Q43 160 26 148 Z" fill="#7c3aed" stroke="#4c1d95" strokeWidth="2.5"/>
            <path d="M26 148 L26 82 Q26 20 60 4 Q44 28 41 82 L41 150 Z" fill="#4c1d95" opacity="0.4"/>
            <circle cx="60" cy="85" r="19" fill="#1a1a2e" stroke="#4c1d95" strokeWidth="3"/>
            <circle cx="60" cy="85" r="13" fill="#0f0f1e"/>
            <circle cx="60" cy="85" r="8"  fill="#00d4ff" opacity="0.2"/>
            <circle cx="55" cy="80" r="4"  fill="white" opacity="0.5"/>
            <path d="M30 118 Q60 122 90 118 L90 129 Q60 133 30 129 Z" fill="#5b21b6" stroke="#4c1d95" strokeWidth="1"/>
          </svg>
        </div>

        {/* CONTROL derecha */}
        <div style={{
          position: 'absolute', right: '8%', top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none', zIndex: 1,
        }}>
          <svg style={{
            animation: 'controlShake 2.8s ease-in-out infinite',
            filter: 'drop-shadow(0 0 14px #00d4ff88)',
          }} width="250" height="160" viewBox="0 0 260 160">
            <path d="M30 72 Q28 44 66 34 L94 30 Q108 16 128 16 Q148 16 162 30 L190 34 Q228 44 226 72 L224 106 Q222 130 198 138 L170 142 Q158 130 140 126 L128 124 L116 126 Q98 130 86 142 L58 138 Q34 130 32 106 Z" fill="#111111" stroke="#222222" strokeWidth="2"/>
            <path d="M34 72 Q32 46 68 38 L94 34 Q108 20 128 20 Q148 20 162 34 L188 38 Q224 46 222 72 L220 104 Q218 127 195 135 L170 139 Q158 127 140 123 L128 121 L116 123 Q98 127 86 139 L61 135 Q38 127 36 104 Z" fill="#1a1a1a"/>
            <path d="M36 71 Q34 48 69 40 L94 36 Q108 22 128 22 Q148 22 162 36 L187 40 Q222 48 220 71 L220 86 Q128 82 36 86 Z" fill="#222222"/>
            <rect x="58" y="65" width="11" height="30" rx="3" fill="#333" stroke="#111" strokeWidth="1.5"/>
            <rect x="49" y="74" width="29" height="11" rx="3" fill="#333" stroke="#111" strokeWidth="1.5"/>
            <circle cx="88"  cy="112" r="17" fill="#0a0a0a" stroke="#333" strokeWidth="2"/>
            <circle cx="88"  cy="112" r="12" fill="#111"/>
            <circle cx="88"  cy="112" r="6"  fill="#1a1a1a"/>
            <circle cx="85"  cy="109" r="2.5" fill="#2a2a2a"/>
            <circle cx="168" cy="112" r="17" fill="#0a0a0a" stroke="#333" strokeWidth="2"/>
            <circle cx="168" cy="112" r="12" fill="#111"/>
            <circle cx="168" cy="112" r="6"  fill="#1a1a1a"/>
            <circle cx="165" cy="109" r="2.5" fill="#2a2a2a"/>
            <circle cx="128" cy="65" r="11" fill="#111" stroke="#444" strokeWidth="2"/>
            <circle cx="128" cy="65" r="7"  fill="#0a0a0a" stroke="#2dc653" strokeWidth="2"/>
            <circle cx="128" cy="65" r="3"  fill="#2dc653"/>
            <circle cx="196" cy="56" r="9" fill="#ffb703" stroke="#111" strokeWidth="2"/>
            <circle cx="209" cy="70" r="9" fill="#e63946" stroke="#111" strokeWidth="2"/>
            <circle cx="196" cy="84" r="9" fill="#2dc653" stroke="#111" strokeWidth="2"/>
            <circle cx="183" cy="70" r="9" fill="#4361ee" stroke="#111" strokeWidth="2"/>
            <text x="196" y="60" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">Y</text>
            <text x="209" y="74" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">B</text>
            <text x="196" y="88" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">A</text>
            <text x="183" y="74" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">X</text>
          </svg>
        </div>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--dark)',
        padding: '100px 24px 80px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 520,
      }}>

        {/* Glow blob de fondo */}
        <div style={{
          position: 'absolute', top: -80, left: -80,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, right: -60,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          animation: 'blob 10s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* Contenido hero */}
        <div ref={heroRef} style={{
          maxWidth: 680, textAlign: 'center', position: 'relative', zIndex: 1,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{
            fontSize: '0.85rem', fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: 'var(--blue)',
            marginBottom: 16,
          }}>
            🎮 Descubre juegos gratis
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 6vw, 4rem)',
            lineHeight: 1.1, marginBottom: 20,
            color: 'var(--white)',
          }}>
            Los mejores juegos<br />
            <span style={{
              color: 'var(--blue)',
              textShadow: '0 0 30px rgba(0,212,255,0.6)',
            }}>
              100% gratuitos
            </span>
          </h1>

          <p style={{
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)',
            marginBottom: 40, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px',
          }}>
            Explora cientos de juegos free-to-play para PC y navegador.
            Filtra por género y encuentra tu próximo favorito.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/games?platform=pc" style={{
              padding: '14px 32px', borderRadius: 50, fontWeight: 800,
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              color: 'white',
              boxShadow: '0 0 30px rgba(0,212,255,0.35)',
              transition: 'var(--transition)',
            }}>
              🖥️ Juegos PC
            </Link>
            <Link href="/games?platform=browser" style={{
              padding: '14px 32px', borderRadius: 50, fontWeight: 800,
              fontSize: '0.95rem',
              background: 'transparent',
              color: 'var(--white)',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'var(--transition)',
            }}>
              🌐 Juegos Navegador
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{
        background: 'var(--dark)',
        borderTop: '1px solid #1e1e2e',
        borderBottom: '1px solid #1e1e2e',
        padding: '60px 24px',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'center',
          gap: 60, flexWrap: 'wrap', textAlign: 'center',
        }}>
          {[
            { num: '500+', label: 'Juegos disponibles' },
            { num: '100%', label: 'Gratuitos' },
            { num: '2',    label: 'Plataformas' },
            { num: '6',    label: 'Géneros' },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: 'var(--blue)',
                textShadow: '0 0 20px rgba(0,212,255,0.4)',
                marginBottom: 4,
              }}>
                {stat.num}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORÍAS ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 ref={catRef} style={{
            fontFamily: 'var(--font-display)', fontSize: '1.9rem',
            color: 'var(--white)', marginBottom: 8,
            opacity: catVisible ? 1 : 0,
            transform: catVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            Explorar por género
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: '0.95rem' }}>
            Encuentra exactamente lo que buscas
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 16,
          }}>
            {CATEGORIES.map((cat, i) => (
              <button key={cat.value}
                onClick={() => router.push(`/games?genre=${cat.value}`)}
                style={{
                  background: '#111118',
                  border: '1.5px solid #1e1e2e',
                  borderRadius: 'var(--radius)',
                  padding: '28px 16px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 10,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  animation: catVisible ? `fadeInUp 0.5s ease ${i * 0.08}s both` : 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--blue)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e1e2e';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                <span style={{
                  fontSize: '0.85rem', fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)',
                }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── JUEGOS DESTACADOS ── */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <h2 ref={gamesRef} style={{
            fontFamily: 'var(--font-display)', fontSize: '1.9rem',
            color: 'var(--white)', marginBottom: 8,
            opacity: gamesVisible ? 1 : 0,
            transform: gamesVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            ⭐ Juegos destacados
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: '0.95rem' }}>
            Los más populares de la plataforma
          </p>

          {loading && (
            <div className="loader">
              <div className="loader-spinner" />
              <p>Cargando juegos...</p>
            </div>
          )}

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
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800,
                    color: 'var(--blue)', marginBottom: 20,
                    textTransform: 'uppercase', letterSpacing: 1,
                  }}>
                    🖥️ Para PC
                  </h3>
                  <div className="products-grid" style={{ marginBottom: 48 }}>
                    {pcGames.map((g) => <GameCard key={g.id} game={g} />)}
                  </div>
                </>
              )}

              {browserGames.length > 0 && (
                <>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800,
                    color: 'var(--blue)', marginBottom: 20,
                    textTransform: 'uppercase', letterSpacing: 1,
                  }}>
                    🌐 Para Navegador
                  </h3>
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

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/games" style={{
              display: 'inline-block', padding: '14px 40px',
              background: 'transparent',
              color: 'var(--blue)',
              border: '2px solid rgba(0,212,255,0.4)',
              borderRadius: 50, fontWeight: 800, fontSize: '1rem',
              transition: 'var(--transition)',
              boxShadow: '0 0 20px rgba(0,212,255,0.1)',
            }}>
              Ver todos los juegos →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}