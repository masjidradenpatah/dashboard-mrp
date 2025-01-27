"use client";
import React, { useState } from "react";
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
import { resetPasswordSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordAction } from "@/actions/auth";
import { FeedbackMessage } from "@/components/FeedbackMessage";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const response = await resetPasswordAction(values);
    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      setSuccess(response.success);
    }
  }

  return (
    <>
      <div
        className={
          "mx-auto flex w-full max-w-[460px] flex-col items-center justify-center gap-8"
        }
      >
        <p
          className={
            "mb-4 text-center text-3xl font-semibold text-muted-foreground"
          }
        >
          Reset Password
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription />
                </FormItem>
              )}
            />
            {error && <FeedbackMessage type={"error"} message={error} />}
            {success && <FeedbackMessage type={"success"} message={success} />}
            <Button type="submit" className={"w-full"}>
              Submit
            </Button>
          </form>
        </Form>
        <Button asChild={true} variant={"link"}>
          <Link href={"/signIn"}>Back to signIn</Link>
        </Button>
      </div>
    </>
  );
};
export default ResetPasswordForm;
