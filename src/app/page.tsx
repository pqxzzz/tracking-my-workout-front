"use client";
import { AuthContext } from "@/context/AuthContext";
// import { useAuthContext } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AuthContext);

  if (!context) {
    return <div className="alert">Nao tem context</div>;
  }

  return (
    <div className="px-10">
      <h1 className="text-white font-bold text-3xl bg-red-400">
        PRECISO ADICIONAR O BEARER TOKEN EM TODA A REQUISICAO
      </h1>
      <h1>{context.token ? "TEM TOKEN" : "NAO TEM TOKEN"}</h1>
      <h3>{context.user ? `Bem vindo: ${context.user.email}` : "NAO TEM USER INFO"}</h3>
    </div>
  );
}
