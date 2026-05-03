import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#050508',
      borderTop: '1px solid #1e1e2e',
      padding: '48px 24px 0',
      marginTop: 60,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', gap: 40,
        paddingBottom: 40, flexWrap: 'wrap',
      }}>

        {/* Logo y descripción */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.6rem',
            color: 'var(--blue)',
            textShadow: '0 0 20px rgba(0,212,255,0.4)',
          }}>
            🎮 GameZone
          </span>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: 240 }}>
            Descubre los mejores juegos gratuitos para PC y navegador.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            ['/', 'Inicio'],
            ['/games', 'Juegos'],
            ['/games?platform=pc', 'Para PC'],
            ['/games?platform=browser', 'Navegador'],
            ['/favorites', 'Favoritos'],
          ].map(([href, label]) => (
            <Link key={href} href={href} style={{
              fontSize: '0.9rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              transition: 'var(--transition)',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid #1e1e2e',
        padding: '20px 0',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.25)',
      }}>
        <p>© 2025 GameZone · Hecho con ❤️ para gamers</p>
      </div>
    </footer>
  );
}