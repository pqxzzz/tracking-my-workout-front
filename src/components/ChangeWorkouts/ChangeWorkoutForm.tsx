import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useEffect } from "react";
import { DialogTitle } from "../ui/dialog";

const formSchema = z.object({
  workoutSet: z.object({
    name: z.string().min(3, { message: "name must be at least 3 characters." }),
    workouts: z.array(
      z.object({
        name: z.string().min(3, { message: "name must be at least 3 characters." }),
        // lastWorkoutSession: z.date(),
        exercises: z.array(
          z.object({
            name: z.string().min(3, { message: "name must be at least 3 characters." }),
            series: z.coerce.number().min(1, { message: "Series must be greater then 0." }),
            repetitions: z.coerce
              .number()
              .min(1, { message: "Repetitions must be greater then 0." }),
            weight: z.string(),
            information: z.string(),
            muscleGroup: z.string()
            // imageReference: z.string() img url???? TODO
          })
        )
      })
    )
  })
});
export function ChangeWorkoutForm() {
  // return workoutInfo();
  return workoutSetForm();
}

export const workoutSetForm = () => {
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
    console.log(values);
  };

  const onError = (fieldsErrors: any) => {
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
      <div className="border-t pt-5 pl-5">
        <FormField
          control={form.control}
          name={`workoutSet.workouts.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout #{index + 1} Name</FormLabel>
              <FormControl>
                <Input placeholder="Workout Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {exerciseFields.map((exerciseField, exerciseIndex) => (
          <div className="pl-8 mt-5" key={exerciseField.id}>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Workout #{index + 1} - Exercise {exerciseIndex} Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Exercise Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.series`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Workout #{index + 1} - Exercise {exerciseIndex} Series
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Exercise Series" {...field} />
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
                      <FormLabel>
                        Workout #{index + 1} - Exercise {exerciseIndex} Repetitions
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Exercise Reps" {...field} />
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
                      <FormLabel>
                        Workout #{index + 1} - Exercise {exerciseIndex} Weight
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Exercise Weight" {...field} />
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
                      <FormLabel>
                        Workout #{index + 1} - Exercise {exerciseIndex} Muscle Group
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Exercise Muscle Group" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`workoutSet.workouts.${index}.exercises.${exerciseIndex}.information`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Workout #{index + 1} - Exercise {exerciseIndex} Information
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Exercise Information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5 my-2">
              <Button
                type="button"
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
              >
                Add exercise
              </Button>
              {exerciseIndex !== 0 && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => removeExercise(exerciseIndex)}
                >
                  Remove exercise
                </Button>
              )}
            </div>
          </div>
        ))}

        {index !== 0 && (
          <div>
            <Button variant={"destructive"} type="button" onClick={() => removeWorkout(index)}>
              <p>Remove workout</p>
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <DialogTitle>Insert the informations for your new Workout Set!</DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="workoutSet.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workout set Name</FormLabel>
                <FormControl>
                  <Input placeholder="Workout Set Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*  */}
          <div className="max-h-[500px] overflow-auto">
            {workoutFields.map((_, index) => (
              <WorkoutItem key={index} index={index} />
            ))}
          </div>
          <div className="flex gap-5 my-2">
            <Button
              type="button"
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
            >
              <p>Add workout</p>
            </Button>

            <Button type="submit" variant={"default"}>
              <p>Complete</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// export const workoutInfo = () => {
//   const mockUserWorkoutInfo = {
//     workoutSets: [
//       {
//         name: "Workout A",
//         active: true,
//         workouts: [
//           {
//             name: "Chest and triceps",
//             exercises: [
//               {
//                 name: "Machine Fly",
//                 weight: "60KG",
//                 series: 3,
//                 reps: 10
//               },
//               {
//                 name: "Incline Press Machine",
//                 weight: "20kg",
//                 series: 3,
//                 reps: 8
//               }
//             ]
//           },
//           {
//             name: "Back, biceps and Abs.",
//             exercises: [
//               {
//                 name: "Machine Row",
//                 weight: "36kg",
//                 series: 4,
//                 reps: 8
//               },
//               {
//                 name: "Scott Curl with EZ bar",
//                 weight: "36kg",
//                 series: 3,
//                 reps: 10
//               }
//             ]
//           }
//         ]
//       },
//       {
//         name: "Workout B",
//         active: false,
//         workouts: [
//           {
//             name: "Chest and triceps",
//             exercises: [
//               {
//                 name: "Machine Fly",
//                 weight: "60KG",
//                 series: 3,
//                 reps: 10
//               },
//               {
//                 name: "Incline Press Machine",
//                 weight: "20kg",
//                 series: 3,
//                 reps: 8
//               }
//             ]
//           },
//           {
//             name: "Back, biceps and Abs.",
//             exercises: [
//               {
//                 name: "Machine Row",
//                 weight: "36kg",
//                 series: 4,
//                 reps: 8
//               },
//               {
//                 name: "Scott Curl with EZ bar",
//                 weight: "36kg",
//                 series: 3,
//                 reps: 10
//               }
//             ]
//           }
//         ]
//       },
//       {
//         name: "Workout C",
//         active: false,
//         workouts: [
//           {
//             name: "Chest and triceps",
//             exercises: [
//               {
//                 name: "Machine Fly",
//                 weight: "60KG",
//                 series: 3,
//                 reps: 10
//               },
//               {
//                 name: "Incline Press Machine",
//                 weight: "20kg",
//                 series: 3,
//                 reps: 8
//               }
//             ]
//           },
//           {
//             name: "Back, biceps and Abs.",
//             exercises: [
//               {
//                 name: "Machine Row",
//                 weight: "36kg",
//                 series: 4,
//                 reps: 8
//               },
//               {
//                 name: "Scott Curl with EZ bar",
//                 weight: "36kg",
//                 series: 3,
//                 reps: 10
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   };

//   const activeWorkout = mockUserWorkoutInfo.workoutSets.find((set) => set.active);

//   return (
//     <div>
//       <h1 className="font-bold">
//         Your Workout <span className="underline">Active</span> Set is {activeWorkout?.name}{" "}
//       </h1>
//       <div className="pl-5">
//         {activeWorkout?.workouts.map((exercise) => (
//           <h1>{exercise.name}</h1>
//         ))}
//       </div>
//     </div>
//   );
// };
