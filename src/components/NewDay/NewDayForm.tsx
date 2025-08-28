import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Button } from "../ui/button";

export function NewDayForm() {
  const mockLastWorkout = {
    id: "1",
    date: "2025-08-15",
    workoutName: "Treino X",
    rating: null
  };
  const mockNextWorkout = {
    id: "2",
    date: null,
    workoutName: "Treino Y",
    rating: null
  };

  const handleSkipWorkout = () => {
    console.log("skipping workout");
  };

  const handleCompleteWorkout = () => {
    console.log("completing workout");
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1>
          Your last workout was {mockLastWorkout.workoutName} on {mockLastWorkout.date}
          {mockLastWorkout.rating ? ` - ${mockLastWorkout.rating}` : ""}
        </h1>
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-lg">
          Your next workout is supposed to be - {mockNextWorkout.workoutName}
        </h1>
        <Button variant="outline" className="w-fit" onClick={handleSkipWorkout}>
          <p> ⏩ </p>
        </Button>
      </div>
      <div className="flex justify-center">
        <Button className="w-fit" onClick={handleCompleteWorkout}>
          Complete workout!
        </Button>
      </div>
    </div>
  );
}
