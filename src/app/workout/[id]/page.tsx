// Server-Side Rendering page
// app/workout/[id]/page.tsx
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = params;

  const getWorkoutById = (id: string) => {
    const mockWorkout = {
      id: "e0fdfb65-4906-4a52-a4b0-e787e43c8a3e",
      name: "WORKOUT 1 NAME",
      createdAt: "2025-08-06T10:49:33.132Z",
      exercises: [
        {
          id: "dd782119-54e5-46b2-b1c8-1a9f2c9d99b5",
          name: "EXERCISE FROM WORKOUT 1 NAME",
          information: "",
          series: 20,
          repetitions: 3,
          weight: "30",
          muscleGroup: ""
        },
        {
          id: "2c53d7ec-8a8f-4d4a-9e9e-653749bfc4ba",
          name: "NEW EXERCISE!!!!!!!!!!!!!",
          information: "info",
          series: 5,
          repetitions: 12,
          weight: "423kg!!!⬜️",
          muscleGroup: "Biceps"
        }
        // ...demais exercícios
      ]
    };
    return mockWorkout;
  };

  const workout = await getWorkoutById(id);

  if (!workout) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{workout.name}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Criado em: {new Date(workout.createdAt).toLocaleDateString()}
      </p>

      <Table>
        <TableCaption>Lista de exercícios do {workout.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Exercício</TableHead>
            <TableHead>Séries</TableHead>
            <TableHead>Repetições</TableHead>
            <TableHead>Peso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workout.exercises.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell className="font-medium">{exercise.name}</TableCell>
              <TableCell>{exercise.series}</TableCell>
              <TableCell>{exercise.repetitions}</TableCell>
              <TableCell>{exercise.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
