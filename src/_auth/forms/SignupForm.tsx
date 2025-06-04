"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(2).max(50),
})
const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form} >
      <form className="space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField 
          control={form.control}
          name="username"
          render={({ field })} => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SignupForm;