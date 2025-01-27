import React, { Suspense } from "react";
import NewVerificationForm from "@/components/forms/NewVerificationForm";

const Page = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
};
export default Page;
