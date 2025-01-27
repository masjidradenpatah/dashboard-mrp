import React, { Suspense } from "react";
import NewPasswordForm from "@/components/forms/NewPasswordForm";

const Page = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
};
export default Page;
