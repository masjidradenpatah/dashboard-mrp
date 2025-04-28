import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NewProgramForm
  from "@/app/(protected)/dashboard/admin/manage/programs/new-program/_components/new-program-form";

const Page = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
            <h2 className={"text-xl  font-medium"}>New Program</h2>
        </CardHeader>
        <CardContent>
          <NewProgramForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
