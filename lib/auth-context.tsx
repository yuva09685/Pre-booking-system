"use client";

import React, { createContext, useContext, useState } from "react";

type UserRole = "admin" | "cashier" | null;

interface AuthContextType {
  user: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserRole>(null);

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("atchayas_user");
    if ((saved === "admin" || saved === "cashier") && !user) {
      setUser(saved as UserRole);
    }
  }

  const login = (role: UserRole) => {
    if (typeof window !== "undefined" && role) {
      localStorage.setItem("atchayas_user", role);
      setUser(role);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("atchayas_user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: user !== null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);