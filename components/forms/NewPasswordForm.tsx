"use client";
import React, { useState } from "react";

import { useSearchParams } from "next/navigation";
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
import { newPasswordSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordAction } from "@/actions/auth";
import { FeedbackMessage } from "@/components/FeedbackMessage";

const NewPasswordForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const token = searchParams.get("token");

  async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    if (!token) {
      setError("Token is missing");
      return;
    }

    const response = await newPasswordAction(values, token);
    if (response.error) setError(response.error);
    else if (response.success) setSuccess(response.sucess);
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
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

            <Button type="submit" className={"w-full"}>
              Reset Password
            </Button>
            {error && <FeedbackMessage type={"error"} message={error} />}
            {success && <FeedbackMessage type={"success"} message={success} />}
          </form>
        </Form>
      </div>
    </>
  );
};
export default NewPasswordForm;
