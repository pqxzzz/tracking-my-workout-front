import { api } from "./axios";
import { ExerciseType } from "./workoutSet";

export async function getExerciseById(id: string): Promise<ExerciseType> {
  try {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(`Couldn't find exercise info: ${err}`);
  }
}

export async function patchExercise(
  id: string,
  exerciseBody: Partial<ExerciseType>
): Promise<string> {
  await api.patch(`/exercises/${id}`, exerciseBody);

  return "Exercise updated successfully";
}

export async function createExercise(
  exerciseBody: Omit<ExerciseType, "id">
): Promise<ExerciseType> {
  const response = await api.post(`/exercises`, exerciseBody);

  return response.data;
}
