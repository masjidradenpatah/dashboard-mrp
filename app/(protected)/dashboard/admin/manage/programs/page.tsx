import React from "react";
import { DataTable } from "@/components/Table/TableData";
import { columns } from "@/app/(protected)/dashboard/admin/manage/programs/column";
import {
  deleteManyProgramsByID,
  getAllPrograms,
} from "@/actions/programActions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
          <div className={'flex justify-between'}>
            <h2 className={"text-xl  font-medium"}>Manage Program</h2>
            <Button className={"w-fit"} asChild>
              <Link href={"/dashboard/admin/manage/programs/new-program"}>
                Add New Program <CirclePlus />
              </Link>
            </Button>
          </div>
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
