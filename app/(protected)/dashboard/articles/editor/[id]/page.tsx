import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NewArticleForm from "@/components/forms/NewArticleForm";
import { getArticleById } from "@/actions/articleAction";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const { status, data } = await getArticleById(id);

  if (status === "ERROR" || !data) {
    return notFound();
  }

  if (data.status === "PUBLISHED") {
    return (
      <div className={"size-full pt-12"}>
        <Card>
          <CardHeader className={"flex w-full flex-row justify-between"}>
            <h2 className={"text-xl font-medium"}>Membuat Artikel Baru</h2>
            <div>{data.status}</div>
          </CardHeader>
          <CardContent>
            <p>
              Tidak bisa mengedit artikel dengan status PUBLISH. Silahkan ubah
              ke DRAFT atau ARCHIVED.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader className={"flex w-full flex-row justify-between"}>
          <h2 className={"text-xl font-medium"}>Membuat Artikel Baru</h2>
          <div>{data.status}</div>
        </CardHeader>
        <CardContent>
          <NewArticleForm initialArticle={data} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
