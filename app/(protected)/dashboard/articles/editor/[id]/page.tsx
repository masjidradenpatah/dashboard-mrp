import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NewArticleForm from "@/components/forms/NewArticleForm";

const Page = async ({}: { params: Promise<{ id: string }> }) => {
  // const id = (await params).id;

  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader className={"flex w-full flex-row justify-between"}>
          <h2 className={"text-xl font-medium"}>Membuat Artikel Baru</h2>
        </CardHeader>
        <CardContent>
          <NewArticleForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
