"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/auth";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FeedbackMessage } from "@/components/FeedbackMessage";

const NewVerificationForm = () => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: null as string | null,
    successMessage: null as string | null,
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleEmailVerification = useCallback(async () => {
    if (!token) {
      setState({
        isLoading: false,
        errorMessage: "Token is missing",
        successMessage: null,
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      errorMessage: null,
      successMessage: null,
    }));

    try {
      const response = await verifyEmail(token);

      if (response.error) {
        setState({
          isLoading: false,
          errorMessage: response.error,
          successMessage: null,
        });
      } else if (response.success) {
        setState({
          isLoading: false,
          errorMessage: null,
          successMessage: response.success,
        });
      }
    } catch {
      setState({
        isLoading: false,
        errorMessage: "An unexpected error occurred. Please try again later.",
        successMessage: null,
      });
    }
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleEmailVerification().then((_) => {});
  }, [handleEmailVerification]);

  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <div className="text-center text-3xl font-semibold text-primary">
        Confirm Your Email
      </div>

      {state.isLoading && (
        <FeedbackMessage message="Confirming your email" type="loading" />
      )}

      {state.errorMessage && (
        <>
          <FeedbackMessage message={state.errorMessage} type="error" />
          <Button
            className="w-full text-lg text-muted-foreground"
            asChild
            variant="link"
          >
            <Link href="/">
              <House />
              Back to Home
            </Link>
          </Button>
        </>
      )}

      {state.successMessage && (
        <FeedbackMessage message={state.successMessage} type="success" />
      )}
    </div>
  );
};

export default NewVerificationForm;
