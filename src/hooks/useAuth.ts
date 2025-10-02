// import { useAuthContext } from "@/context/AuthContext";
import { AuthContext } from "@/context/AuthContext";
import {
  confirmEmail,
  finishUserRegistration,
  getUserData,
  loginUser,
  RegisterDTO,
  registerUser,
  User
} from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function useRegister() {
  const queryClient = useQueryClient(); //

  return useMutation<User, Error, RegisterDTO>({
    mutationFn: registerUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["currentnUser"], user);
    },
    onError: (error) => {
      console.error("erro ao registrar user: ", error);
    }
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient(); // TODO: entender melhor

  const context = useContext(AuthContext);

  // const { setToken, setUser } = useAuthContext(); // <-- contexto de auth

  if (!context) {
    throw new Error("Context nao encontrado");
  }

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (token) => {
      queryClient.setQueryData(["access_token"], token.access_token);
      context.setToken(token.access_token);

      localStorage.setItem("access_token", token.access_token);

      //Busca dados do usuario
      const user = await getUserData();

      context.setUser(user);
      router.push("/");
    },
    onError: (error) => {
      console.error("Erro ao logar: ", error);
    }
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context nao encontrado");
  }

  return () => {
    // 1. Remover token
    context.setToken(null);
    localStorage.removeItem("access_token");

    // 2. Remover usuário do contexto
    context.setUser(null);

    // 3. Limpar cache de queries relacionadas
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    queryClient.removeQueries({ queryKey: ["access_token"] });

    // 4. Redirecionar para login
    window.location.href = "/auth"; // ou useRouter().push("/auth")
  };
}

export function useFinishRegister() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: finishUserRegistration,
    onSuccess: (user) => {
      console.log("USER FROM MUTATION: ", user);
      queryClient.setQueryData(["currentUser"], user);

      queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // busca novamente as infos do user quando termina o cadastro
    },
    onError: (err) => {
      console.error("error finishing registration: ", err);
    }
  });

  return mutation;
}

export function useConfirmEmail() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: confirmEmail,
    onSuccess: (data) => {
      console.log("Email confirmado: ", data);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // busca novamente as infos do user quando termina o cadastro
    },
    onError: (err) => {
      console.error("error confirming email: ", err);
    }
  });

  return mutation;
}

// TODO: tirar esse hook daqui
export function useGetUser({ enabled }: { enabled?: boolean } = {}) {
  const ctx = useContext(AuthContext);

  const hasToken =
    !!ctx?.token ||
    (typeof window !== "undefined" && !!localStorage.getItem("access_token"));

  const isEnabled = (enabled ?? true) && hasToken;

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getUserData,
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failureCount, error: AxiosError) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    }
  });
}
