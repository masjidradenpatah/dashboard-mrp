import React from "react";
import { DataTable } from "@/components/Table/TableData";
import { columns } from "@/app/(protected)/dashboard/admin/manage/programs/column";
import {
  deleteManyProgramsByID,
  getAllPrograms,
} from "@/actions/programActions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Page = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
          <h2 className={"text-xl font-medium"}>Manage Program</h2>
        </CardHeader>
        <CardContent>
          <DataTable
            queryKey={"all programs"}
            queryAction={getAllPrograms}
            columns={columns}
            filterBy={"title"}
            deleteFNAction={deleteManyProgramsByID}
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
