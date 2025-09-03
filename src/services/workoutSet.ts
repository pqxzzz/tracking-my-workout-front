import { api } from "./axios";

export interface ExerciseType {
  id: string;
  name: string;
  information: string;
  series: number;
  repetitions: number;
  weight: string;
  muscleGroup: string;
  workoutId?: string;
  // ptBrName: string | null;
  // videoReference: string | null;
  // imageReference: string | null;
}

export interface WorkoutType {
  id: string;
  name: string;
  createdAt: string;
  exercises: ExerciseType[];
}

export interface WorkoutSetType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  workouts: WorkoutType[];
}

export async function getUserActiveWorkoutSet(): Promise<WorkoutSetType> {
  try {
    const response = await api.get("/workoutsets/ActiveWorkoutSet");
    return response.data;
  } catch {
    throw new Error("Couldn't find workoutset info");
  }
}
