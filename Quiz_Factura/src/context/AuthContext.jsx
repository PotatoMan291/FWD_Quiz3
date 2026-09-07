import {
  createContext,
  useContext,
  useState,
} from "react";

import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("authUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const login = async (
    username,
    password,
  ) => {
    const authenticatedUser =
      await loginRequest(
        username,
        password,
      );

    setUser(authenticatedUser);

    localStorage.setItem(
      "authUser",
      JSON.stringify(authenticatedUser),
    );

    return authenticatedUser;
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      "authUser",
    );
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider.",
    );
  }

  return context;
}