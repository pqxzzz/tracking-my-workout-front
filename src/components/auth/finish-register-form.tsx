import { useFinishRegister } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
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
    .min(4, { message: "Username must be at least 4 letters long." })
    .max(32, { message: "Username must be at most 32 letters long." }),
  birthDate: z
    .date()
    .min(new Date("1930-01-01"), { message: "Date must be after 1930." })
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 10)), {
      message: "You must be at least 10 years old."
    }),
  height: z.coerce
    .number()
    .min(100, { message: "Insert a valid height." })
    .max(250, { message: "Insert a valid height." })
});

export function FinishRegistration({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const mutation = useFinishRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      birthDate: undefined,
      height: undefined
    },
    mode: "onSubmit"
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      mutation.mutateAsync(data);
      form.reset();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Finish your registration!</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (err) => {
                console.log(err);
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  */}
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height in cm</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="example 180"
                        autoComplete="off"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        max={250}
                        maxLength={3}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
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
                            new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            }).format(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          fromYear={1930}
                          toYear={new Date().getFullYear() - 10}
                          selected={field.value}
                          onSelect={field.onChange}
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
