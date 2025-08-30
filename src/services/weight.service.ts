import { api } from "./axios";

export interface WeightType {
  createdAt: Date;
  updatedAt: Date;
  weight: number;
}

export async function getUserWeights(): Promise<WeightType[]> {
  const response = await api.get("/weight");

  return response.data;
}
