"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction } from "@/actions/auth";
import GoogleSignIn from "@/components/GoogleSignIn";
import { LoaderCircle, LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    startTransition(async function () {
      const response = await signInAction(values);
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
  }
  return (
    <>
      <div className={"flex w-full flex-col items-center justify-center"}>
        <p className={"mb-12 text-3xl font-semibold text-primary"}>
          Masjid Raden Patah
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className={"w-full text-lg"}
            >
              {isPending ? (
                <>
                  <span>Loading </span>
                  <LoaderCircle className={"animate-spin"}></LoaderCircle>
                </>
              ) : (
                <>
                  Sign In <LogIn className={"size-full text-white"}></LogIn>
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div
        className={
          "flex flex-col items-center justify-center gap-4 text-lg text-muted-foreground"
        }
      >
        <p>Or Sign In With</p>
        <GoogleSignIn />
        <p>Forgot Password?</p>
      </div>
    </>
  );
};
export default SignInForm;
