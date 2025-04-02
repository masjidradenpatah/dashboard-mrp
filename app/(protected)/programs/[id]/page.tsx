import React from "react";
import { notFound } from "next/navigation";
import { getProgramByIdAction } from "@/actions/programActions";
import ProgramFull from "@/components/ProgramFull";

const Page = async ({params}:{params: Promise<{id: string}>}) => {
  const programId = (await params).id;
  const { status, data: program, error } = await getProgramByIdAction(programId);

  if (status === "ERROR" || !program) {
    console.log(error);
    return notFound();
  }

  return (
    <div
      className={"flex size-full flex-col items-center overflow-hidden py-32"}
    >
      <ProgramFull program={program} className={""} />
    </div>
  );
};
export default Page;
