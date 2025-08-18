export function MostRecentWorkoutDay() {
  const MockRecentWorkoutDay = {
    day: "31/07/2025",
    workout: "Back and Biceps - x"
  };

  return (
    <div className="card text-center md:h-[200px] transition-all flex flex-col items-center justify-center gap-5 text-xl">
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
