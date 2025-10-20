import { WorkoutType } from "@/services/workoutSet";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import { ChangeExerciseForm } from "../Forms/ChangeExerciseForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Plus, Edit3, Dumbbell, Target } from "lucide-react";

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
    <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Workout Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Dumbbell className="h-5 w-5 text-orange-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{Workout.name}</h3>
          <p className="text-sm text-muted-foreground">
            {Workout.exercises.length} exercise
            {Workout.exercises.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Exercises Table */}
      <div className="space-y-3">
        {Workout.exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => openEditExerciseModal(exercise.id ?? "")}
            className="group flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-500/20 rounded-md">
                <Target className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-blue-500 transition-colors">
                  {exercise.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {exercise.muscleGroup}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Series</p>
                <p className="font-semibold text-foreground">
                  {exercise.series}
                </p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Weight</p>
                <p className="font-semibold text-foreground">
                  {exercise.weight}kg
                </p>
              </div>
              <Edit3 className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Exercise Button */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full h-12 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
        >
          <Plus className="h-5 w-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-muted-foreground group-hover:text-primary transition-colors">
            Add Exercise
          </span>
        </Button>
      </div>

      {/* Edit Exercise Modal */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Edit3 className="h-5 w-5 text-blue-500" />
            Edit Exercise
          </DialogTitle>
          {selectedExercise && (
            <ChangeExerciseForm
              exerciseId={selectedExercise}
              onSuccess={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Exercise Modal */}
      <Dialog
        open={isAddModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Plus className="h-5 w-5 text-green-500" />
            Add New Exercise
          </DialogTitle>
          {isAddModalOpen && (
            <ChangeExerciseForm onSuccess={closeModal} workoutId={Workout.id} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
