import React from "react";
import { DataTable } from "@/components/Table/TableData";
import { columns } from "@/app/(protected)/dashboard/admin/manage/articles/articles-column";
import { deleteManyArticlesByID, getAllArticle } from "@/actions/articleAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Page = async () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
          <h2 className={"text-xl font-medium"}>Manage Article</h2>
        </CardHeader>
        <CardContent>
          <DataTable
            queryKey={"all article"}
            queryAction={getAllArticle}
            columns={columns}
            filterBy={"title"}
            deleteFNAction={deleteManyArticlesByID}
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
