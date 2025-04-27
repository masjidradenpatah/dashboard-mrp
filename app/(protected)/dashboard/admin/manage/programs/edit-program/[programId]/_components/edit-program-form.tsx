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
import ImageUpload
  from "@/components/globals/image-upload";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { programSchema } from "@/schemas/ProgramSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgramType } from "@prisma/client";
import {  updateProgrambyId } from "@/actions/programActions";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditProgramForm = (params:{
  programId:string;
  title?:string;
  content?: string;
  image?: string;
  type?: ProgramType;
  customUrl?: string;
  imagePath:string
  description?: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "", // TODO
      type: "DAILY",
      customUrl: "",
      description: "",
      ...params
    }
  });

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          '  w-full !py-2 !px-3' +
          ' focus:outline-none  rounded-md border border-input',
      },
    },
    content: params.content,
    injectCSS: false
  })

  async function onSubmit(values: z.infer<typeof programSchema>) {
    const validatedFields = programSchema.safeParse(values)
    if(!validatedFields.success || !editor) {
      return;
    }
    startTransition(async function() {
      const programtype: ProgramType = values.type as ProgramType;

      const response = await updateProgrambyId(params.programId,{
        image: values.image,
        title: values.title,
        content: editor.getHTML(),
        customeUrl: values.customUrl,
        description: editor.getHTML(),
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
    router.push('/dashboard/admin/manage/programs');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className=" ">
              <FormLabel className={"text-right"}>Image</FormLabel>
              <FormControl>
                <ImageUpload
                  onFileChange={(fileId)=> { form.setValue('image', fileId || '')}}
                  folder={'/programs'}
                  defaultImage={params.image ? { fileId: params.image, filePath: params.imagePath }: undefined}
                />
              </FormControl>
              {!form.getValues('image')?
                <FormDescription>It's recommended to use image with 1080 x 1080px resolution or 1:1 aspect ratio</FormDescription>
                :
                 null }

            </FormItem>
          )}
        />
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
                {/*<Textarea*/}
                {/*  {...field}*/}
                {/*  placeholder="Masukkan penjelasan tentang program"*/}
                {/*  className={"w-full  "}*/}
                {/*/>*/}
                <div>
                  <div className="flex">

                <Button variant={'ghost'} onClick={(e) => {
                  e.preventDefault()
                  if(editor)
                    editor.chain().focus().toggleBold().run()
                }}>Bold</Button>
                    <Button variant={'ghost'} onClick={(e) => {
                      e.preventDefault()
                      if(editor)
                        editor.chain().focus().toggleItalic().run()
                    }}
                            className={editor?.isFocused && editor?.isActive('italic') ? 'bg-blue-700' : ''}
                    >Italic</Button>
                  </div>
                <EditorContent editor={editor}></EditorContent>
                </div>
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

        {isPending  ? (
          <div className={cn(buttonVariants({variant: 'default'}), 'bg-primary/50 hover:bg-primary/50 active:bg-primary/40')}>
            <span>Loading </span>
            <LoaderCircle className={"animate-spin"}></LoaderCircle>
          </div>
        ) : (
          <>
            <Button type="submit">Save changes</Button>
          </>
        )}
      </form>
    </Form>
  );
};
export default EditProgramForm;
