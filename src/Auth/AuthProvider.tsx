import React, { Children } from "react";
import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    // Obtener el estado de autenticación desde localStorage solo si está presente
    const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated");
    return isAuthenticatedFromStorage
      ? JSON.parse(isAuthenticatedFromStorage)
      : null;
  });

  useEffect(() => {
    // Solo actualiza el estado de autenticación en localStorage si está autenticado
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    } else {
      // Si no está autenticado, elimina el estado de autenticación del localStorage para no poder cambiarlo a true
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
