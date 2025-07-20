"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context || !context.token) {
    router.push("/auth");
  }

  if (context?.isLoading) {
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
