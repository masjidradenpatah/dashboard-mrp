"use client";
import React, { ChangeEvent, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import z from "zod";
import { newArticleSchema } from "@/schemas/ArticleSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Article } from "@prisma/client";
import {
  deleteManyArticlesByID,
  updateArticleById,
} from "@/actions/articleAction";
import AdvancedEditor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { LoaderCircle, Send, Trash } from "lucide-react";
import { generateJSON } from "@tiptap/html";
import { defaultExtensions } from "@/components/editor/TailwindEditorExtensions";
import { slashCommand } from "@/components/editor/TailwindEditorSlashCommands";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const articleField = ["content", "title", "category", "slug"] as const;
type ArticleFields = (typeof articleField)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const articleCategory = ["FIQIH", "AKIDAH", "PENDIDIKAN", "NOT_SET"] as const;
type ArticleCategory = (typeof articleCategory)[number];

const NewArticleForm = ({ initialArticle }: { initialArticle: Article }) => {
  const [, startTransition] = useTransition();
  const output = useMemo(() => {
    const extensions = [...defaultExtensions, slashCommand];
    return generateJSON(initialArticle.content, [...extensions]);
  }, [initialArticle.content]);

  const router = useRouter();

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newArticleSchema>>({
    resolver: zodResolver(newArticleSchema),
    defaultValues: {
      ...initialArticle,
    },
  });

  const title = form.watch("title");
  const slug = form.watch("slug");

  function onDraft() {
    //  Hanya akan update status menjadi draft
    startTransition(async () => {
      const newArticle: Article = {
        ...initialArticle,
        id: initialArticle.id,
        title: form.getValues("title"),
        slug: form.getValues("slug"),
        category: form.getValues("category") as ArticleCategory,
        content: form.getValues("content"),

        status: "DRAFT",
      };
      await updateArticleById(newArticle);
    });
  }

  function onArchived() {
    startTransition(async () => {
      const newArticle: Article = {
        ...initialArticle,
        id: initialArticle.id,
        title: form.getValues("title"),
        slug: form.getValues("slug"),
        category: form.getValues("category") as ArticleCategory,
        content: form.getValues("content"),

        status: "ARCHIVED",
      };

      await updateArticleById(newArticle);
    });
  }

  function onPublish() {
    setShowDialog(true);
    startTransition(async () => {
      const newArticle: Article = {
        ...initialArticle,
        id: initialArticle.id,
        title: form.getValues("title"),
        slug: form.getValues("slug"),
        category: form.getValues("category") as ArticleCategory,
        content: form.getValues("content"),

        status: "PUBLISHED",
      };

      await updateArticleById(newArticle);
    });
    setShowDialog(false);
    router.push("/dashboard/articles");
  }

  function onUpdate(value: string) {
    form.setValue("content", value);
    form.trigger("content");

    startTransition(async () => {
      const newArticle: Article = {
        ...initialArticle,
        id: initialArticle.id,
        title: form.getValues("title"),
        slug: form.getValues("slug"),
        category: form.getValues("category") as ArticleCategory,
        content: value,
      };
      await updateArticleById(newArticle);
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const name = event.target.name as ArticleFields;
    const value = event.target.value as ArticleFields;
    form.setValue(name, value);
    form.trigger(name);
    debouncedUpdates(name, value);
  }

  function categoryChange(value: string) {
    form.setValue("category", value);
    debouncedUpdates("category", value);
  }

  const debouncedUpdates = useDebouncedCallback(
    async (name: ArticleFields, value: string) => {
      form.setValue(name, value);
      await form.trigger(name);
      onUpdate(form.getValues("content"));
    },
    500,
  );

  return (
    <div
      // onSubmit={form.handleSubmit(onSubmit)}
      className={"flex flex-col gap-4"}
      // onChange={onChange}
    >
      {showDialog && (
        <Dialog open={showDialog}>
          <DialogContent>
            <DialogTitle className={"sr-only"}>Loading</DialogTitle>
            <span>Loading </span>
            <LoaderCircle className={"animate-spin"}></LoaderCircle>
          </DialogContent>
        </Dialog>
      )}
      <div className="flex w-full gap-8">
        <div className={"w-full space-y-2"}>
          <label htmlFor="title" className={"text-sm font-medium"}>
            Title
          </label>
          <Input
            type="text"
            placeholder="Judul artikel"
            value={title}
            onChange={handleChange}
            name={"title"}
          />
        </div>

        <div className={"w-full space-y-2"}>
          <label htmlFor="title" className={"text-sm font-medium"}>
            Slug
          </label>
          <Input
            type="text"
            placeholder="slug"
            value={slug}
            onChange={handleChange}
            name={"slug"}
          />
        </div>
      </div>

      <div className={"space-y-2"}>
        <label htmlFor="title" className={"text-sm font-medium"}>
          Category
        </label>
        <Select onValueChange={categoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"PENDIDIKAN"}>Pendidikan</SelectItem>
            <SelectItem value={"FIQIH"}>Fiqih</SelectItem>
            <SelectItem value={"AKIDAH"}>Akidah</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AdvancedEditor initialData={output as JSONContent} onUpdate={onUpdate} />
      <div className="flex justify-between gap-4">
        <DeleteArticle id={initialArticle.id} />
        <Button
          className={""}
          variant={"outline"}
          disabled={initialArticle.status === "ARCHIVED"}
          onClick={onArchived}
        >
          Archived
        </Button>
        <Button
          disabled={initialArticle.status === "DRAFT"}
          className={""}
          variant={"outline"}
          onClick={onDraft}
        >
          Draft
        </Button>
        <Button className={"grow"} value={"PUBLISH"} onClick={onPublish}>
          PUBLISH
          <Send />
        </Button>
      </div>
    </div>
  );
};
export default NewArticleForm;

const DeleteArticle = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isPending, startTrasition] = useTransition();

  function handleDelete() {
    startTrasition(async () => {
      const response = await deleteManyArticlesByID([id]);
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else if (response.success) {
        toast({
          title: "Succes",
          description: response.success,
        });
      }
    });
    router.push("/dashboard/articles");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={""} variant={"destructive"}>
          Delete
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        {!isPending ? (
          <>
            Are you sure you want to delete this article. You can&apos;t restore
            it.
            <div className="flex gap-4">
              <DialogClose className={"h-auto w-full border px-4"}>
                Cancel{" "}
              </DialogClose>
              <Button
                className={"w-full"}
                variant={"destructive"}
                onClick={handleDelete}
              >
                Delete Anyway <Trash />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex min-h-48 items-center justify-center gap-2">
            <span>Deleting your article</span>
            <LoaderCircle className={"animate-spin"}></LoaderCircle>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
