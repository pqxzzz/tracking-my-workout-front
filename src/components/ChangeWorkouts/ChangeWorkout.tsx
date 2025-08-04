import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChangeWorkoutForm } from "./ChangeWorkoutForm";

export function ChangeWorkout() {
  return (
    <div className="border-4 border-white rounded-sm p-2 my-5">
      <Dialog>
        <DialogTrigger>
          <h1>Change my workouts</h1>
        </DialogTrigger>
        <DialogContent className="scroll-auto">
          <ChangeWorkoutForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
