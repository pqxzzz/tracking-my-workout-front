// import { useAuthContext } from "@/context/AuthContext";
import { AuthContext } from "@/context/AuthContext";
import { getUserData, loginUser, RegisterDTO, registerUser, User } from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      // const user = await getUserData({ access_token: token.access_token });
      context.setUser(user);
      router.push("/");
    },
    onError: (error) => {
      console.error("Erro ao logar: ", error);
    }
  });
}

// TODO: tirar esse hook daqui
export function useGetUser({ enabled, token }: { enabled: boolean; token: string | null }) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      if (!token) {
        throw new Error("No token available"); //TODO: duvida, nao teria q dar refetch nesse caso?
      }
      return getUserData(); // TODO: mudar isso ta feio
      // return getUserData({ access_token: token }); // TODO: mudar isso ta feio
    },
    enabled // so executa quando tem token
  });
}
