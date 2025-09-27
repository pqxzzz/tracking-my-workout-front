import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Dumbbell, Target, Settings, Save } from "lucide-react";

const formSchema = z.object({
  workoutSet: z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    workouts: z.array(
      z.object({
        name: z
          .string()
          .min(3, { message: "Name must be at least 3 characters." }),
        exercises: z.array(
          z.object({
            name: z
              .string()
              .min(3, { message: "Name must be at least 3 characters." }),
            series: z.coerce
              .number()
              .min(1, { message: "Series must be greater than 0." })
              .max(16, { message: "Series can't be greater than 16." }),
            repetitions: z.coerce
              .number()
              .min(1, { message: "Repetitions must be greater than 0." })
              .max(32, { message: "Repetitions can't be greater than 32." }),
            weight: z.string().max(32, { message: "Char limit 32." }),
            information: z
              .string()
              .max(140, { message: "Max characters 140." }),
            muscleGroup: z.string().max(32, { message: "Char limit 32." })
          })
        )
      })
    )
  })
});

export function ChangeWorkoutForm() {
  return WorkoutSetForm();
}

export const WorkoutSetForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutSet: {
        name: "",
        workouts: [
          {
            name: "",
            exercises: [
              {
                name: "",
                muscleGroup: "",
                series: 0,
                repetitions: 0,
                weight: "0",
                information: ""
              }
            ]
          }
        ]
      }
    }
  });

  const {
    fields: workoutFields,
    append: appendWorkout,
    remove: removeWorkout
  } = useFieldArray({
    control: form.control,
    name: "workoutSet.workouts"
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // create workoutset
    console.log(values);
  };

  const onError = (fieldsErrors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(fieldsErrors);
  };

  // WorkoutItem with workout name, exercise object
  const WorkoutItem = ({ index }: { index: number }) => {
    const {
      fields: exerciseFields,
      append: appendExercise,
      remove: removeExercise
    } = useFieldArray({
      control: form.control,
      name: `workoutSet.workouts.${index}.exercises`
    });

    return (
      <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-xl p-6 mb-6">
        {/* Workout Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-orange-500/20">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Dumbbell className="h-5 w-5 text-orange-500" />
          </div>
          <FormField
            control={form.control}
            name={`workoutSet.workouts.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-lg font-semibold text-foreground">
                  Workout #{index + 1} Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Upper Body, Leg Day, Full Body"
                    className="text-lg font-medium"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Exercises Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-blue-500" />
            <h4 className="text-lg font-semibold text-foreground">Exercises</h4>
          </div>

          {exerciseFields.map((exerciseField, exerciseIndex) => (
            <div
              key={exerciseField.id}
              className="bg-muted/30 rounded-lg p-4 border border-border/50"
            >
              <div className="space-y-4">
                {/* Exercise Name */}
                <FormField
                  control={form.control}
                  name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Exercise Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Bench Press, Squats, Deadlifts"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Exercise Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.series`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Series
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.repetitions`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Repetitions
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.weight`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Weight (kg)
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50 kg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.muscleGroup`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Muscle Group
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Chest, Legs, Back"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Exercise Information */}
                <FormField
                  control={form.control}
                  name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.information`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Additional Information
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Rest 90s between sets, Focus on form"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Exercise Actions */}
              <div className="flex gap-3 mt-4 pt-4 border-t border-border/30">
                {exerciseIndex === exerciseFields.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendExercise({
                        name: "",
                        series: 0,
                        repetitions: 0,
                        weight: "0",
                        information: "",
                        muscleGroup: ""
                      })
                    }
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Exercise
                  </Button>
                )}
                {exerciseIndex !== 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => removeExercise(exerciseIndex)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Remove Workout Button */}
        {index !== 0 && (
          <div className="mt-4 pt-4 border-t border-orange-500/20">
            <Button
              variant="destructive"
              size="sm"
              type="button"
              onClick={() => removeWorkout(index)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Remove Workout
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6"
        >
          {/* Workout Set Name */}
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-blue-500" />
              <h3 className="text-xl font-bold text-foreground">
                Workout Set Details
              </h3>
            </div>
            <FormField
              control={form.control}
              name="workoutSet.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-foreground">
                    Workout Set Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Shoulder's Workout, Upper Body"
                      className="text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your workout set a memorable name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Workouts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-orange-500" />
              <h3 className="text-xl font-bold text-foreground">Workouts</h3>
            </div>

            <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
              {workoutFields.map((_, index) => (
                <WorkoutItem key={index} index={index} />
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendWorkout({
                  name: "",
                  exercises: [
                    {
                      name: "",
                      series: 0,
                      repetitions: 0,
                      weight: "0",
                      information: "",
                      muscleGroup: ""
                    }
                  ]
                })
              }
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Workout
            </Button>

            <Button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Save className="h-4 w-4" />
              Create Workout Set
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
