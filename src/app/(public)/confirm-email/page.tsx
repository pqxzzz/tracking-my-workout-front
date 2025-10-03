"use client";
import { useConfirmEmail } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConfirmEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const firstLoginToken = params.get("first_login_token");

  const mutation = useConfirmEmail();
  const [hasStarted, setHasStarted] = useState(false);

  // Executa mutação somente no cliente
  useEffect(() => {
    if (firstLoginToken && !hasStarted) {
      mutation.mutate(firstLoginToken);
      setHasStarted(true);
    }
  }, [firstLoginToken, mutation, hasStarted]);

  // Redireciona quando a mutação tem sucesso
  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/auth?email-confirmed=true");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess, router]);

  if (mutation.isPending || (firstLoginToken && !hasStarted)) {
    return (
      <Skeleton className="w-screen h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-2xl text-white font-bold">Confirming email...</p>
        </div>
      </Skeleton>
    );
  }

  if (mutation.isError) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500 font-bold">
          Error confirming email. Please try again.
        </p>
      </div>
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Email Confirmed</div>
          <div className="text-muted-foreground">
            Your email has been successfully confirmed. You can now log in.
          </div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen flex items-center justify-center" />;
}
