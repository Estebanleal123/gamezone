import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'rgba(255,255,255,0.7)', padding: '48px 24px 0', marginTop: 60 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, paddingBottom: 40, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--blue-light)' }}>🎮 GameZone</span>
          <p style={{ fontSize: '0.9rem' }}>Descubre los mejores juegos gratuitos.</p>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[['/', 'Inicio'], ['/games', 'Juegos'], ['/games?platform=pc', 'Para PC'], ['/games?platform=browser', 'Navegador'], ['/favorites', 'Favoritos']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', textAlign: 'center', fontSize: '0.8rem' }}>
        <p>© 2025 GameZone · Hecho con ❤️ para gamers</p>
      </div>
    </footer>
  );
}