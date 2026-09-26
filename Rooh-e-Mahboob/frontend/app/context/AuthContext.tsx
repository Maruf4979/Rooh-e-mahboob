"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export interface SessionData {
  user?: SessionUser;
  expires?: string;
}

interface AuthContextType {
  data: SessionData | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (provider?: string, options?: any) => Promise<any>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<SessionUser>) => void;
}

const defaultUser: SessionUser = {
  id: "usr_demo",
  name: "Guest User",
  email: "guest@sidra-attar.com",
  image: null,
  role: "MEMBER",
};

const AuthContext = createContext<AuthContextType>({
  data: null,
  status: "unauthenticated",
  signIn: async () => {},
  signOut: async () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sidra_auth_session");
      if (stored) {
        setSession(JSON.parse(stored));
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch {
      setStatus("unauthenticated");
    }
  }, []);

  const signIn = async (provider?: string, options?: any) => {
    const userEmail = options?.email || "demo@sidra-attar.com";
    const userName = options?.name || userEmail.split("@")[0] || "Valued Customer";
    const newSession: SessionData = {
      user: {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name: userName,
        email: userEmail,
        image: null,
        role: "MEMBER",
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    localStorage.setItem("sidra_auth_session", JSON.stringify(newSession));
    setSession(newSession);
    setStatus("authenticated");

    if (options?.callbackUrl) {
      window.location.href = options.callbackUrl;
    }
    return { ok: true, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem("sidra_auth_session");
    setSession(null);
    setStatus("unauthenticated");
  };

  const updateUser = (updates: Partial<SessionUser>) => {
    if (!session?.user) return;
    const updated = {
      ...session,
      user: {
        ...session.user,
        ...updates,
      },
    };
    localStorage.setItem("sidra_auth_session", JSON.stringify(updated));
    setSession(updated);
  };

  return (
    <AuthContext.Provider value={{ data: session, status, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  return {
    data: context.data,
    status: context.status,
    updateUser: context.updateUser,
  };
}

export function useAuth() {
  return useContext(AuthContext);
}

export const signIn = async (provider?: string, options?: any) => {
  // Direct trigger helper for components calling standalone signIn()
  const userEmail = options?.email || "demo@sidra-attar.com";
  const userName = options?.name || userEmail.split("@")[0] || "Valued Customer";
  const newSession: SessionData = {
    user: {
      id: "usr_demo",
      name: userName,
      email: userEmail,
      image: null,
      role: "MEMBER",
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
  localStorage.setItem("sidra_auth_session", JSON.stringify(newSession));
  if (options?.callbackUrl) {
    window.location.href = options.callbackUrl;
  }
  return { ok: true, error: null };
};

export const signOut = async () => {
  localStorage.removeItem("sidra_auth_session");
  window.location.reload();
};
