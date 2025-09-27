import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLogin } from "@/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid E-mail."
  }),
  password: z.string()
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login({
      email: values.email,
      password: values.password
    });
  };

  if (isPending) {
    <Skeleton>
      <h1 className="alert">Loading</h1>
    </Skeleton>;
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="E-mail" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <Button type="submit">
              <p>Login</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
