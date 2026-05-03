import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch('');
    setMenuOpen(false);
  };

  const isActive = (path) => router.pathname === path;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #1e1e2e',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        height: 70, display: 'flex', alignItems: 'center', gap: 20,
      }}>

        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
          fontFamily: 'var(--font-display)', fontSize: '1.6rem',
          color: 'var(--blue)',
          textShadow: '0 0 20px rgba(0,212,255,0.5)',
        }}>
          <span>🎮</span>
          <span>GameZone</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={{
          flex: 1, display: 'flex', maxWidth: 420,
          background: '#111118',
          borderRadius: 50,
          overflow: 'hidden',
          border: '1.5px solid #1e1e2e',
        }}>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '10px 18px', border: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem', color: 'var(--white)', outline: 'none',
            }}
          />
          <button type="submit" style={{
            padding: '10px 16px', background: 'none',
            fontSize: '1rem', cursor: 'pointer', color: 'var(--blue)',
          }}>
            🔍
          </button>
        </form>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[['/', 'Inicio'], ['/games', 'Juegos'], ['/favorites', '❤️ Favoritos']].map(([href, label]) => (
            <Link key={href} href={href} style={{
              padding: '8px 16px', borderRadius: 50, fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer', position: 'relative',
              background: isActive(href) ? 'rgba(0,212,255,0.15)' : 'transparent',
              color: isActive(href) ? 'var(--blue)' : 'rgba(255,255,255,0.7)',
              border: isActive(href) ? '1.5px solid rgba(0,212,255,0.4)' : '1.5px solid transparent',
              transition: 'var(--transition)',
            }}>
              {label}
              {href === '/favorites' && favorites.length > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 20, height: 20,
                  background: 'var(--pink)',
                  color: 'white', borderRadius: '50%', fontSize: '0.7rem',
                  fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {favorites.length}
                </span>
              )}
            </Link>
          ))}

          {/* Login / Usuario */}
          {!user ? (
            <Link href="/login" style={{
              marginLeft: 8,
              padding: '9px 20px',
              borderRadius: 50,
              fontWeight: 800,
              fontSize: '0.9rem',
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              color: 'white',
              transition: 'var(--transition)',
              boxShadow: '0 0 20px rgba(0,212,255,0.3)',
            }}>
              Iniciar sesión
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
              <span style={{
                padding: '6px 14px',
                background: '#111118',
                border: '1.5px solid #1e1e2e',
                borderRadius: 50,
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--blue)',
              }}>
                👤 {user.email}
              </span>
              <button
                onClick={() => { logout(); router.push('/'); }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 50,
                  background: '#1e1e2e',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid #2e2e3e',
                }}
              >
                Salir
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}