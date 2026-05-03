import { memo, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

const GameCard = memo(function GameCard({ game }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imgError, setImgError] = useState(false);
  const fav = isFavorite(game.id);

  return (
    <article
      style={{
        background: 'white', borderRadius: 'var(--radius)',
        overflow: 'hidden', boxShadow: 'var(--shadow)',
        transition: 'var(--transition)', display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Link href={`/games/${game.id}`} style={{ position: 'relative', overflow: 'hidden', display: 'block' }}>
        <img
          src={imgError ? 'https://placehold.co/400x300/1A3A6B/4A90D9?text=🎮' : game.thumbnail}
          alt={game.title}
          onError={() => setImgError(true)}
          loading="lazy"
          style={{ width: '100%', height: '180px', objectFit: 'cover' }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(26,26,46,0.85)', color: 'white',
          padding: '4px 10px', borderRadius: 50,
          fontSize: '0.72rem', fontWeight: 700,
        }}>
          {game.platform === 'PC (Windows)' ? '🖥️ PC' : '🌐 Navegador'}
        </span>
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'var(--blue)', color: 'white',
          padding: '4px 10px', borderRadius: 50,
          fontSize: '0.72rem', fontWeight: 700,
        }}>
          FREE
        </span>
      </Link>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gray)' }}>
          {game.genre}
        </span>
        <Link href={`/games/${game.id}`}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1.3 }}>
            {game.title}
          </h3>
        </Link>
        <p style={{
          fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {game.short_description}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--gray-light)',
        }}>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--blue)' }}>
            Free to Play
          </span>
          <button
            onClick={() => toggleFavorite(game)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: fav ? '#FFE4E4' : 'var(--gray-light)',
              fontSize: '1rem', display: 'flex', alignItems: 'center',
              justifyContent: 'center', transition: 'var(--transition)',
              border: 'none', cursor: 'pointer',
            }}
          >
            {fav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </article>
  );
});

export default GameCard;