import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChangeWorkoutForm } from "./ChangeWorkoutForm";

export function ChangeWorkout() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full rounded-md p-3 bg-zinc-900 hover:bg-zinc-800 transition-all cursor-pointer">
          <h1>New workout set</h1>
        </DialogTrigger>
        <DialogContent className="scroll-auto lg:max-w-2/3">
          <ChangeWorkoutForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
