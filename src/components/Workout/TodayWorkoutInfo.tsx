import Link from "next/link";

export const TodayWorkoutInfo = () => {
  return (
    <div className="rounded-lg card">
      <Link href={"./workout/123"} className="flex items-center justify-center">
        <p>Today's workout</p>
      </Link>
    </div>
  );
};
