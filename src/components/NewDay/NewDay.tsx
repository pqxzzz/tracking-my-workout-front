import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { NewDayForm } from "./NewDayForm";

export function NewDay() {
  return (
    <div className="border-4 border-white rounded-sm p-2 my-5">
      <Dialog>
        <DialogTrigger className="w-full">
          <h1 className="font-bold">Register new Workout day!</h1>
        </DialogTrigger>

        <DialogContent className="">
          <NewDayForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
