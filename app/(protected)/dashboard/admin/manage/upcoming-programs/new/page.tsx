import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NewUpcomingProgramForm
  from "@/app/(protected)/dashboard/admin/manage/upcoming-programs/new/_components/new-upcoming-program-form";

const Page = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
          <h2 className={"text-xl  font-medium"}>New Upcoming Program</h2>
        </CardHeader>
        <CardContent>
          <NewUpcomingProgramForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
