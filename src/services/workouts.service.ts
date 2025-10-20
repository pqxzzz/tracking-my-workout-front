import { WorkoutType } from "./workoutSet";

export async function getWorkoutById(id: string): Promise<WorkoutType> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}workouts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw new Error(`Couldn't get Workout info`);
  }
}
