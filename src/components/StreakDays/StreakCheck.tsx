import clsx from "clsx";
import { format } from "date-fns";

interface StreakCheckProps {
  isCheck: boolean;
  date: Date;
  className?: string;
}

export const StreakCheck = ({ isCheck, date, className }: StreakCheckProps) => {
  const today = new Date().getDate();

  return (
    <div className="flex items-center justify-center flex-col">
      <p className={`${today === date.getDate() ? "font-bold text-white" : "font-medium"} `}>
        {format(date, "EEE")}{" "}
      </p>
      <div
        className={clsx("w-6 h-6 rounded-full border flex items-center justify-center", className)}
      >
        {isCheck && <div className="bg-zinc-400 w-4 h-4 rounded-full"></div>}
      </div>
    </div>
  );
};
