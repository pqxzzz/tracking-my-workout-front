//  Server-Side Rendering page
// app/workout/[id]/page.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getWorkoutById } from "@/services/workouts.service";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;

  // Chamada SSR
  const workout = await getWorkoutById(id);

  if (!workout) {
    console.warn("workoutSet not found");
    return <p>Nada</p>;
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
