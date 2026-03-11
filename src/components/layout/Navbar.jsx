import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
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
      background: 'white',
      boxShadow: '0 2px 16px rgba(74,144,217,0.10)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        height: 70, display: 'flex', alignItems: 'center', gap: 20,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
          fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--blue)',
        }}>
          <span>🎮</span>
          <span>GameZone</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={{
          flex: 1, display: 'flex', maxWidth: 420,
          background: 'var(--gray-light)', borderRadius: 50,
          overflow: 'hidden', border: '2px solid transparent',
        }}>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '10px 18px', border: 'none',
              background: 'transparent', fontFamily: 'var(--font-body)',
              fontSize: '0.95rem', color: 'var(--dark)', outline: 'none',
            }}
          />
          <button type="submit" style={{ padding: '10px 16px', background: 'none', fontSize: '1rem', cursor: 'pointer' }}>
            🔍
          </button>
        </form>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[['/', 'Inicio'], ['/games', 'Juegos'], ['/favorites', '❤️ Favoritos']].map(([href, label]) => (
            <Link key={href} href={href} style={{
              padding: '8px 16px', borderRadius: 50, fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer', position: 'relative',
              background: isActive(href) ? 'var(--blue)' : 'transparent',
              color: isActive(href) ? 'white' : 'var(--dark-light)',
              transition: 'var(--transition)',
            }}>
              {label}
              {href === '/favorites' && favorites.length > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 20, height: 20, background: 'var(--blue-dark)',
                  color: 'white', borderRadius: '50%', fontSize: '0.7rem',
                  fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {favorites.length}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}