import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { WorkoutSetType, WorkoutType } from "@/services/workoutSet";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import { ChangeExerciseForm } from "../Forms/ChangeExerciseForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

export function WorkoutTable({ Workout }: { Workout: WorkoutType }) {
  // --- Edit Exercise Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  // --- Add Exercise Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openEditExerciseModal = (exerciseId: string) => {
    setIsEditModalOpen(true);
    setSelectedExercise(exerciseId);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedExercise(null);

    setIsAddModalOpen(false);
  };

  return (
    <div className="h-full card">
      <h1 className="lg:text-lg font-bold px-5">{Workout.name}</h1>
      <Table className="text-sm lg:text-base p-0">
        <TableCaption className="p-0 m-0">
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => setIsAddModalOpen(true)}
            className="font-bold text-lg hover:brightness-200 hover:cursor-pointer p-0 py-0"
          >
            <p>+</p>
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Exercise</TableHead>
            <TableHead className="w-[100px]">Series</TableHead>
            <TableHead className="w-[100px]">Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Workout.exercises.map((exercise) => (
            // TODO: Adc modal ao clicar e poder editar ou ver mais
            <TableRow
              key={exercise.id}
              onClick={() => openEditExerciseModal(exercise.id)}
              className="hover:brightness-80 transition hover:cursor-pointer"
            >
              <TableCell className="font-medium">{exercise.name}</TableCell>
              <TableCell className="font-medium">{exercise.series}</TableCell>
              <TableCell className="font-medium">{exercise.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent>
          <DialogTitle>Edit exercise</DialogTitle>
          {selectedExercise && (
            <ChangeExerciseForm exerciseId={selectedExercise} onSuccess={closeModal} />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={isAddModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent>
          <DialogTitle>Add exercise</DialogTitle>
          {isAddModalOpen && <ChangeExerciseForm onSuccess={closeModal} workoutId={Workout.id} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
