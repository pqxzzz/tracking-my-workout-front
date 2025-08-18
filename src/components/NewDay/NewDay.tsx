import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { NewDayForm } from "./NewDayForm";

export function NewDay() {
  const mockLastWorkoutDate = new Date();

  const today = "2025-08-17";

  return (
    <div className="my-5 flex items-center justify-center">
      {today === mockLastWorkoutDate.toDateString() && (
        <div className="h-[100px] sm:h-fit card-green flex justify-center items-center text-center">
          <p>
            Congratulations! You've completed your workout today! <span>🎉</span>
          </p>
        </div>
      )}
      {true && (
        <Dialog>
          <DialogTrigger className="card  md:h-[200px] transition-all">
            <h1 className="font-bold text-lg md:text-2xl">Register new Workout day!</h1>
          </DialogTrigger>
          <DialogContent className="">
            <DialogTitle>Register new Workout day!</DialogTitle>
            <NewDayForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
