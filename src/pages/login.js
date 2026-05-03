import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Redirige si ya está logueado
  useEffect(() => {
    if (user) {
      router.push("/games");
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      router.push("/games");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <main style={{ minHeight: "calc(100vh - 140px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container">
        <div style={{
          maxWidth: 420,
          margin: "0 auto",
          background: "white",
          borderRadius: "var(--radius)",
          padding: "40px 32px",
          boxShadow: "var(--shadow-lg)",
          animation: "fadeIn 0.4s ease",
        }}>
          
          {/* Título */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            textAlign: "center",
            color: "var(--blue)",
            marginBottom: 8,
          }}>
            🎮 GameZone
          </h1>

          <p style={{
            textAlign: "center",
            color: "var(--gray)",
            marginBottom: 28,
            fontSize: "0.95rem"
          }}>
            Inicia sesión para continuar
          </p>

          {/* Formulario */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                border: "2px solid var(--gray-light)",
                background: "var(--cream)",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                border: "2px solid var(--gray-light)",
                background: "var(--cream)",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />

            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: "12px",
                borderRadius: 50,
                background: "var(--blue)",
                color: "white",
                fontWeight: 800,
                fontSize: "1rem",
                transition: "var(--transition)",
              }}
            >
              Ingresar
            </button>
          </form>

          {/* Error */}
          {error && (
            <p style={{
              marginTop: 16,
              color: "red",
              fontSize: "0.9rem",
              textAlign: "center"
            }}>
              {error}
            </p>
          )}

          {/* Credenciales de prueba */}
          <p style={{
            marginTop: 20,
            fontSize: "0.8rem",
            color: "var(--gray)",
            textAlign: "center"
          }}>
            Demo: admin@test.com / 123456
          </p>

        </div>
      </div>
    </main>
  );
}