"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useGetExerciseById } from "@/hooks/useGetExerciseById.hook";
import { use, useEffect, useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useUpdateExercise } from "@/hooks/Exercises/useUpdateExercise.hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExercise } from "@/services/exercise";
import { ExerciseType } from "@/services/workoutSet";
import { useCreateExercise } from "@/hooks/Exercises/useCreateExercise.hook";

const formSchema = z.object({
  name: z.string().min(3, { message: "name must be at least 3 characters." }),
  series: z.coerce.number().min(1, { message: "Series must be greater then 0." }),
  repetitions: z.coerce.number().min(1, { message: "Repetitions must be greater then 0." }),
  weight: z.string(),
  information: z.string(),
  muscleGroup: z.string()
  // imageReference: z.string() img url???? TODO
});

export function ChangeExerciseForm({
  exerciseId,
  onSuccess,
  workoutId
}: {
  exerciseId?: string;
  onSuccess: () => void;
  workoutId?: string;
}) {
  const queryClient = useQueryClient();

  const exerciseQuery = useGetExerciseById(exerciseId ?? ""); // TODO: quando for add exercise nao posso passar isso

  const defaultValues = {
    name: exerciseQuery.data?.name ?? "",
    series: exerciseQuery.data?.series ?? 0,
    repetitions: exerciseQuery.data?.repetitions ?? 0,
    weight: exerciseQuery.data?.weight ?? "",
    information: exerciseQuery.data?.information ?? "",
    muscleGroup: exerciseQuery.data?.muscleGroup ?? ""
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    if (exerciseQuery.data && exerciseId) {
      form.reset(exerciseQuery.data);
    }
  }, [exerciseQuery.data]);

  const mutation = useUpdateExercise();

  const createExerciseMutation = useCreateExercise();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (exerciseId) {
      // patch nao enviando todos os dados:
      // const changedValues = Object.fromEntries(
      //   Object.entries(values).filter(([key, value]) => initialValues[key] !== value)
      // );

      mutation.mutate(
        { id: exerciseId, data: values },
        {
          onSuccess: () => {
            onSuccess?.();
            queryClient.invalidateQueries({ queryKey: ["activeWorkoutSet"] });
          },
          onError: (err) => {
            console.error(err);
          }
        }
      );
    } else {
      // post
      // TODO: COMO VOU PASSAR O WORKOUTID??????? Last thing
      console.log(values);

      createExerciseMutation.mutate(
        { exerciseBody: { ...values, workoutId } },
        {
          onSuccess: () => {
            onSuccess?.();
            queryClient.invalidateQueries({ queryKey: ["activeWorkoutSet"] });
            console.log("TODO: ADICIONAR TOAST");
          }
        }
      );
    }
  };

  const onError = (fieldsErrors: any) => {
    console.log(fieldsErrors);
  };

  if (exerciseQuery.isPending || exerciseQuery.error) {
    return (
      <div className="space-y-4 mt-5">
        <div className="flex gap-5">
          <div className="w-full">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex gap-5">
            <div>
              <Skeleton className="h-4 w-12 mb-2" />
              <Skeleton className="h-10 w-20" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-full">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4 mt-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Exercise Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Exercise Name" maxLength={50} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="series"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Series</FormLabel>
                    <FormControl>
                      <Input placeholder="Series" maxLength={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repetitions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetitions</FormLabel>
                    <FormControl>
                      <Input placeholder="Repetitions" maxLength={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Weight" maxLength={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="information"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Information" maxLength={128} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="muscleGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Muscle Group</FormLabel>
                  <FormControl>
                    <Input placeholder="Muscle Group" maxLength={12} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">
              <p>{exerciseId ? "Edit" : "Add"}</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
