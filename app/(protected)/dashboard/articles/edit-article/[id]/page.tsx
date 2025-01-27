import React from "react";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getArticleById } from "@/actions/articleAction";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id;

  const session = await auth();
  if (!session) return null;

  // Get existing article from database here
  const { status, data } = await getArticleById(articleId);

  if (status === "ERROR" || data === undefined) {
    return (
      <div className={"size-full pt-12"}>
        <Card>
          <CardHeader className={"flex w-full flex-row justify-between"}>
            <h2 className={"text-xl font-medium"}>Mengedit Artikel</h2>
          </CardHeader>
          <CardContent>
            <p>Sorry failed to create new article. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (data.authorId !== session.user.id) {
    return (
      <div className={"size-full pt-12"}>
        <Card>
          <CardHeader className={"flex w-full flex-row justify-between"}>
            <h2 className={"text-xl font-medium"}>Mengedit Artikel</h2>
          </CardHeader>
          <CardContent>
            <p>You&apos;re not allowed to edit this article.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (data.status === "PUBLISHED") {
    return (
      <div className={"size-full pt-12"}>
        <Card>
          <CardHeader className={"flex w-full flex-row justify-between"}>
            <h2 className={"text-xl font-medium"}>Mengedit Artikel</h2>
          </CardHeader>
          <CardContent>
            <p>
              Can&apos;t edit published article. Make it DRAFT or ARCHIVED
              first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // buat salinan article baru

  return redirect(`/dashboard/articles/editor/${data.id}`);
};
export default Page;
