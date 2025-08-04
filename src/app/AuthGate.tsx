"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (context?.authReady && !context?.token) {
      console.log("NAO TEM CONTEXTO ENTAO VAI PRA AUTH");
      console.log(context);
      router.push("/auth");
    }
  }, [context]);

  if (!context?.authReady || context?.isLoading) {
    return (
      <Skeleton className="w-screen h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-2xl text-white font-bold">Loading</p>
        </div>
      </Skeleton>
    );
  }

  return <>{children}</>;
}
