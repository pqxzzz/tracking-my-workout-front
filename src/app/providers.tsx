"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              if (error) {
                console.log("erro mas nao é 401  ❌ ❌ ❌ ❌", error);
              }
              if (error?.response?.status === 401) {
                console.log(" 🚨🚨🚨🚨 error no queryclient provider!!");
                return false;
              } // não faz retry para 401
              return failureCount < 3; // para outros erros, até 3 tentativas
            },
            staleTime: 5 * 60 * 1000
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
