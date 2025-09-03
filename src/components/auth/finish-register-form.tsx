import { useFinishRegister } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar"; // or the correct path to your Calendar component

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 letters long." }),
  birthDate: z.date().min(new Date("1900-01-01")), /// nao pode ser 10anos antes de hoje
  height: z.coerce.number().min(100, { message: "Insert a valid height." })
});

export function FinishRegistration({ isOpen }: { isOpen: boolean }) {
  const mutation = useFinishRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      birthDate: new Date(),
      height: 0
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      mutation.mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-violet-700 p-5">
      <Dialog open={isOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Finish your registration!</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (err) => {
                console.error(err);
              })}
              className="space-y-4"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/*  */}
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Height"
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/*  */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {/*  */}
              <div>
                <Button type="submit">
                  <p>Finish my registration</p>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
