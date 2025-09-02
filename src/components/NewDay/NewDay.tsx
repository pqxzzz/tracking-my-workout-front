"use client";
import { useGetUserWorkoutLogs } from "@/hooks/Workout_Logs/useGetUserWorkoutLogs.hook";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { NewDayForm } from "./NewDayForm";
import * as dateFns from "date-fns";
import { useState } from "react";
import { Plus, Trophy, Calendar } from "lucide-react";

export function NewDay() {
  const [open, setOpen] = useState(false);

  const today = dateFns.format(new Date(), "dd/MM/yyyy");
  const workoutLogs = useGetUserWorkoutLogs(1, 1);

  let formattedDate = workoutLogs.data
    ? dateFns.format(workoutLogs.data.data[0].date, "dd/MM/yyyy")
    : null;

  return (
    <div className="w-full max-w-md mx-auto">
      {today === formattedDate && (
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">
              Congratulations!
            </h3>
          </div>
          <p className="text-foreground/80">
            You've completed your workout today!{" "}
            <span className="text-2xl">🎉</span>
          </p>
        </div>
      )}

      {workoutLogs.data && today !== formattedDate && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="group w-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 cursor-pointer">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-colors">
                <Plus className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors">
                  Register New Workout Day!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your progress and stay consistent
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <Calendar className="h-5 w-5 text-purple-400" />
              Register New Workout Day!
            </DialogTitle>
            <NewDayForm
              lastWorkout={workoutLogs.data.data[0]}
              closeModal={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
