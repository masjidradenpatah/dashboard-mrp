import React from "react";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createNewBlankArticle } from "@/actions/articleAction";
import { Article } from "@prisma/client";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) return null;

  // Create new article here
  const { status, data } = await createNewBlankArticle(session.user.id);

  if (status === "ERROR") {
    return (
      <div className={"size-full pt-12"}>
        <Card>
          <CardHeader className={"flex w-full flex-row justify-between"}>
            <h2 className={"text-xl font-medium"}>Membuat Artikel Baru</h2>
          </CardHeader>
          <CardContent>
            <p>Sorry failed to create new article. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    const blankArticle = data as Article;
    redirect(`/dashboard/articles/editor/${blankArticle.id}`);
  }
};
export default Page;
