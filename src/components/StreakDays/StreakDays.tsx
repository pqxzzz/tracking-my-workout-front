import { Check } from "lucide-react";
import { StreakCheck } from "./StreakCheck";

export function StreakDays() {
  const mockUserLast7DaysStreak = [
    {
      isCheck: true
    },
    {
      isCheck: false
    },
    {
      isCheck: false
    },
    {
      isCheck: true
    },
    {
      isCheck: true
    },
    {
      isCheck: false
    },
    {
      isCheck: true
    }
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg font-bold">Week streak!</h1>
        <div className="card p-10 flex items-center justify-center">
          <div className="flex gap-5">
            {mockUserLast7DaysStreak.map((day, index) => (
              <StreakCheck key={index} isCheck={day.isCheck} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
