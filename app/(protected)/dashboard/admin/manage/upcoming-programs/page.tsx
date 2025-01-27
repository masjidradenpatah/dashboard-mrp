import React from "react";
import { DataTable } from "@/components/Table/TableData";
import { columns } from "@/app/(protected)/dashboard/admin/manage/upcoming-programs/upcoming-program-column";
import {
  deleteManyUpcomingProgramByID,
  getAllUpcomingProgram,
} from "@/actions/programActions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Page = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
          <h2 className={"text-xl font-medium"}>Manage Upcoming Program</h2>
        </CardHeader>
        <CardContent>
          <DataTable
            queryKey={"all Upcoming Program"}
            queryAction={getAllUpcomingProgram}
            columns={columns}
            deleteFNAction={deleteManyUpcomingProgramByID}
            filterBy={"status"}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
