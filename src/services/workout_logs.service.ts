import { api } from "./axios";
import { WorkoutType } from "./workoutSet";

export interface WorkoutLogType {
  userId: string;
  workoutId: string;
  date: Date; // ou Date se você converter
  workout: WorkoutType;
}

interface GetWorkoutLogsResponse {
  data: WorkoutLogType[];
  total: number;
  page: number;
  lastPage: number;
}

export async function getWorkoutLogs(
  page: number = 1,
  limit: number = 20
): Promise<GetWorkoutLogsResponse> {
  try {
    const { data } = await api.get<GetWorkoutLogsResponse>(
      `/workout-log?page=${page}&limit=${limit}&beginDate=2025-08-01&endDate=2025-08-26`
    );

    return data;
  } catch (err) {
    throw new Error(`Couldn't find workout logs: ${err}`);
  }
}
