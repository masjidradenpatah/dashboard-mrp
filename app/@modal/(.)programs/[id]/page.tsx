import React from "react";
import { getProgramByIdAction } from "@/actions/programActions";
import ProgramPreview from "@/components/ProgramPreview";
import Modal from "@/components/Modal";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const { status, data: program } = await getProgramByIdAction(id);

  if (!program || status === "ERROR") {
    throw new Error("Program doesn't exist");
  }

  return (
    <Modal
      modalTitle={"Program Masjid Raden Patah"}
      className={"container overflow-visible xl:max-w-screen-lg"}
      // fullUrl={  `/programs/full/${program.id}`}
      fullUrl={
        program.customeUrl ? program.customeUrl : `/programs/full/${program.id}`
      }
    >
      <ProgramPreview program={program} className={""} />
    </Modal>
  );
};
export default Page;
