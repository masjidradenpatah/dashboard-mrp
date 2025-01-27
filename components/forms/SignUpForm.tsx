"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { signUpSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "@/actions/auth";
import GoogleSignIn from "@/components/GoogleSignIn";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle, LogIn } from "lucide-react";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    startTransition(async function () {
      const response = await signUpAction(values);
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
        <p
          className={
            "mb-12 text-center text-3xl font-semibold text-muted-foreground"
          }
        >
          Selamat Datang di{" "}
          <span className={"text-nowrap text-primary"}>
            {" "}
            Masjid Raden Patah
          </span>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password Confirmation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
        <p>Or Sign Up With</p>
        <GoogleSignIn />
      </div>
    </>
  );
};
export default SignUpForm;
