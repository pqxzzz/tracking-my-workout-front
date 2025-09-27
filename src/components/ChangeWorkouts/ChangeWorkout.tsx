import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChangeWorkoutForm } from "./ChangeWorkoutForm";
import { Plus, Dumbbell } from "lucide-react";

export function ChangeWorkout() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="group w-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-colors">
              <Plus className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors">
                Create New Workout Set
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Design your custom workout routine with exercises, sets, and
                reps
              </p>
            </div>
            <Dumbbell className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto lg:max-w-4xl ">
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Create Your New Workout Set
          </DialogTitle>
          <ChangeWorkoutForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
