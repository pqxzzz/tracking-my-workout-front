import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRegister } from "@/hooks/useAuth";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid E-mail." }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { mutate, isPending, isError, error, isSuccess, data } = useRegister();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ email: values.email, password: values.password });
  };

  return (
    <div className="py-5">
      <Form {...form}>
        {" "}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={"E-mail"} autoComplete="off" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5 flex-col md:flex-row  items-center">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input {...field} placeholder={"password"} type={"password"} />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-between">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input {...field} placeholder={"password"} type={"password"} />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-5 items-center justify-center mt-10">
            <Button type="submit">
              <p>Create Account</p>
            </Button>

            <Button variant={"link"} type="button" disabled={isPending}>
              <p>Already have an account</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
