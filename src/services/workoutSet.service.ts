import { api } from "./axios";
import { WorkoutSetType, WorkoutType } from "./workoutSet";

export interface workoutSetBody {
  name: string;
  workouts: WorkoutType[];
}

export async function postNewWorkoutSet(
  workoutSetData: workoutSetBody
): Promise<WorkoutSetType> {
  try {
    const response = await api.post(
      "/workoutsets/createWorkoutSet",
      workoutSetData
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao criar novo workout set: ", error);
    throw error;
  }
}
