import React from "react";
import { getProgramByIdAction } from "@/actions/programActions";
import { notFound } from "next/navigation";
import ProgramFull from "@/components/ProgramFull";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const { status, data: program } = await getProgramByIdAction(id);

  if (status === "ERROR" || !program) {
    return notFound();
  }

  return (
    <div
      className={"mt-32 flex size-full flex-col items-center overflow-hidden"}
    >
      <ProgramFull program={program} className={""} />
    </div>
  );
};
export default Page;
