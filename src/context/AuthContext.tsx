"use client";
import { useGetUser } from "@/hooks/useAuth";
import { User } from "@/services/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, use, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  authReady: boolean;
};

//1* cria o context de autenticacao, vazio
export const AuthContext = createContext<AuthContextType | null>(null);

//2* Cria o provider para usar no layout.
//  mantem o estado geral de User e Token
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem("access_token");
    if (stored) setTokenState(stored);

    setTimeout(() => setAuthReady(true), 0);
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("access_token", newToken);
    } else {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  };

  const {
    data: userData,
    isLoading,
    error,
    failureCount
  } = useGetUser({
    enabled: !!token
  });

  useEffect(() => {
    console.log("user data atualizado useEffect context!");
    if (userData && token) setUser(userData);
    if (error) {
      console.error(error);
      router.push("/auth");
      localStorage.removeItem("access_token");
      queryClient.removeQueries({ queryKey: ["access_token"] }); // Limpa o cache do token
      queryClient.removeQueries({ queryKey: ["currentUser"] }); // Limpa o cache do usuário
      // TODO: adc toast
    }
    // TODO: QUANDO DA ERROR NAO TA TRIGGANDO
  }, [userData, token, error]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, isLoading, authReady }}>
      <h1 className="bg-red-800 text-white font-bold text-2xl">
        {failureCount} -{error ? "teve erro" : "sem erro"}
      </h1>
      {children}
    </AuthContext.Provider>
  );
}

// 3* Cria um hook customizado para acessar facil o contexto (n precisa)
// export function useAuthContext() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
//   return ctx;
// }
