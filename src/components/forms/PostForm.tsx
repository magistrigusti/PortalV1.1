import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Button,
//   Input,
//   Textarea,
// } from "@/components/ui";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FileUploader from "../shared/FileUploader";

const form = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function handleSubmit () {
  console.log(handleSubmit)
}

function onSubmit(values: z.infer<typeof form>) {
  console.log(values)
}

const PostForm = () => {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-9 w-full max-w-5xl"
        onSubmit={() => (onSubmit)}
      >
        <FormField 
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem> 
              <FormLabel className="shad-form_label">
                Caption
              </FormLabel>

              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar"
                {...field} 
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Photos
              </FormLabel>

              <FormControl>
                <FileUploader />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Location
              </FormLabel>

              <FormControl>
                <Input type="text" className="shad-input" />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>

              <FormControl>
                <Input className="shad-input"
                placeholder="allod, hero, game"
                type="text"
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button className="shad-button_dark_4" type="button">
            Cancel
          </Button>

          <Button className="shad-button_primary whitesspace-nowrap" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm;