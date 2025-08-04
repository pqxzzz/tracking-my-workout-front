// import { useAuthContext } from "@/context/AuthContext";
import { AuthContext } from "@/context/AuthContext";
import {
  finishUserRegistration,
  getUserData,
  loginUser,
  RegisterDTO,
  registerUser,
  User
} from "@/services/auth";
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

      context.setUser(user);
      router.push("/");
    },
    onError: (error) => {
      console.error("Erro ao logar: ", error);
    }
  });
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

// TODO: tirar esse hook daqui
export function useGetUser({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      console.log("Foi buscado as informacoes do usuario!");
      return getUserData();
    },
    enabled
  });
}
