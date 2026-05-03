import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // cargar sesión guardada
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const data = JSON.parse(saved);
      setUser(data.user);
      setToken(data.token);
    }
  }, []);

  // guardar sesión
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("auth", JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem("auth");
    }
  }, [user, token]);

  // login simulado
  const login = (email, password) => {
    if (email === "admin@test.com" && password === "123456") {
      const fakeToken = "abc123token";
      setUser({ email });
      setToken(fakeToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}