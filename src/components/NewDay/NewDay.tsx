"use client";
import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { NewDayForm } from "./NewDayForm";
import * as dateFns from "date-fns";
import { useState } from "react";

export function NewDay() {
  const [open, setOpen] = useState(false);

  const today = dateFns.format(new Date(), "dd/MM/yyyy");

  const workoutLogs = useGetUserWorkoutLogs(1, 1);

  let formattedDate = workoutLogs.data
    ? dateFns.format(workoutLogs.data.data[0].date, "dd/MM/yyyy")
    : null;

  return (
    <div className="my-5 flex items-center justify-center">
      {today === formattedDate && (
        <div className="h-[100px] sm:h-fit card-green flex justify-center items-center text-center">
          <p>
            Congratulations! You've completed your workout today! <span>🎉</span>
          </p>
        </div>
      )}
      {workoutLogs.data && today !== formattedDate && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="card  md:h-[200px] transition-all">
            <h1 className="font-bold text-lg md:text-2xl">Register new Workout day!</h1>
          </DialogTrigger>
          <DialogContent className="">
            <DialogTitle>Register new Workout day!</DialogTitle>
            <NewDayForm lastWorkout={workoutLogs.data.data[0]} closeModal={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
