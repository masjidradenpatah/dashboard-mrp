"use client"
import React, { useTransition } from "react";
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent, SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ProgramCoverUpload
  from "@/app/(protected)/dashboard/admin/manage/programs/new-program/_components/program-cover-upload";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { newProgramSchema } from "@/schemas/ProgramSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgramType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { createNewProgram } from "@/actions/programActions";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle, LogIn } from "lucide-react";

const NewProgramForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof newProgramSchema>>({
    resolver: zodResolver(newProgramSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "", // TODO
      type: "DAILY",
      customUrl: ""
    }
  });

  async function onSubmit(values: z.infer<typeof newProgramSchema>) {
    const validatedFields = newProgramSchema.safeParse(values)
    if(!validatedFields.success) {
      return;
    }
    startTransition(async function() {
      const programtype: ProgramType = values.type as ProgramType;
      const programId = `${values.title}-${new Date().getFullYear()}-${uuidv4()}`;

      const response = await createNewProgram({
        image: values.image,
        title: values.title,
        content: values.content,
        customeUrl: values.customUrl,
        description: values.content,
        id: programId,
        type: programtype
      });

      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive"
        });
      } else if (response.success) {
        toast({
          title: "Success",
          description: response.success
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className={"text-right"}>Title</FormLabel>
              <FormControl>
                <Input
                  className={"w-full  "}
                  placeholder="judul program"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className={"text-right"}>Type</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className={" "}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="ANNUALY">Annualy</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className={"text-right"}>Content</FormLabel>
              <FormControl>
                {/*TODO: Change this using NOVEL*/}
                <Textarea
                  {...field}
                  placeholder="Masukkan penjelasan tentang program"
                  className={"w-full  "}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customUrl"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className={"text-right"}>Custom Url</FormLabel>
              <FormControl>
                <Input
                  placeholder="url"
                  {...field}
                  className={"w-full  "} />
              </FormControl>
              <FormDescription className={" "}>
                Leave it empty if using default url
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className=" ">
              <FormLabel className={"text-right"}>Image</FormLabel>
              <FormControl>
                <ProgramCoverUpload
                  onFileChange={(filepath)=> { form.setValue('image', filepath || '')}}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isPending ? (
          <>
            <span>Loading </span>
            <LoaderCircle className={"animate-spin"}></LoaderCircle>
          </>
        ) : (
          <>
            <Button type="submit">Save changes</Button>
          </>
        )}
      </form>
    </Form>
  );
};
export default NewProgramForm;
