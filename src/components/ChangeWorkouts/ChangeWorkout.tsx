import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChangeWorkoutForm } from "./ChangeWorkoutForm";

export function ChangeWorkout() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full rounded-md p-3 bg-gray-700 hover:bg-gray-800 transition-all cursor-pointer">
          <h1>Change my workouts</h1>
        </DialogTrigger>
        <DialogContent className="scroll-auto lg:max-w-2/3">
          <ChangeWorkoutForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
