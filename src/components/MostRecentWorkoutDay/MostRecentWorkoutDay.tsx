export function MostRecentWorkoutDay() {
  const MockRecentWorkoutDay = {
    day: "31/07/2025",
    workout: "Back and Biceps - x"
  };

  return (
    <div className="my-5 w-full border rounded-sm border-white p-2">
      <h1 className="break-all">
        Your last workout:
        <span> {MockRecentWorkoutDay.workout}</span>
      </h1>
      <h1>
        date: <span>{MockRecentWorkoutDay.day}</span>
      </h1>
    </div>
  );
}
