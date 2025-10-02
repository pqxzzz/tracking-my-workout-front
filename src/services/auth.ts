import { api } from "./axios";
export interface RegisterDTO {
  email: string;
  password: string;
}

export interface FinishUserRegisterDTO {
  username: string;
  birthDate: Date;
  height: number;
}

export interface User {
  id: string;
  username: string | null;
  birthDate: string | null;
  height: number | null;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  confirmationToken: string;
  confirmationTokenExpiredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function registerUser(dto: RegisterDTO): Promise<User> {
  const response = await api.post<User>("/users/register", dto); //TODO: mudar de users para auth no NESTJS
  return response.data;
}

export async function loginUser(
  dto: RegisterDTO
): Promise<{ access_token: string }> {
  const response = await api.post("/auth/login", dto);
  console.log("VOU SETAR ACCESS TOKEN:", response.data.access_token);
  localStorage.setItem("access_token", response.data.access_token);
  return response.data;
}

export async function finishUserRegistration(
  dto: FinishUserRegisterDTO
): Promise<User> {
  const response = await api.patch("/users/finish-registration", dto);
  return response.data;
}

export async function confirmEmail(
  token: string
): Promise<{ message: string }> {
  const response = await api.post(`/auth/confirm-email`, { token });
  return response.data;
}

export async function getUserData(): Promise<User> {
  try {
    const response = await api.get("/users/me");
    if (!response.data) {
      throw new Error("User data not found");
    }

    return response.data;
  } catch (error) {
    throw error;
    // throw new Error("Couldn't find user info");
  }
}
