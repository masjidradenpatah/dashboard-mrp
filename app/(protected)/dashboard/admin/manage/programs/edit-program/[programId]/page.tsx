import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getProgramByIdAction } from "@/actions/programActions";
import { notFound } from "next/navigation";
import EditProgramForm from "./_components/edit-program-form";
import {
  getImagePathById
} from "@/actions/deleteImageAction";

const EditProgramPage = async ({params}:{params: Promise<{programId: string}>}) => {
  const programId = (await params).programId;
  const { status, data: program, error } = await getProgramByIdAction(programId);

  if (status === "ERROR" || !program) {
    console.log(error);
    return notFound();
  }
  let imagePath : string  = ''
  try {
    imagePath = await getImagePathById(program.image) // todo

  }  catch  {

  }


  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader>
          <h2 className={"text-xl  font-medium"}>Edit Program</h2>
        </CardHeader>
        <CardContent>
          {/*  form here*/}
          <EditProgramForm {...program} imagePath={imagePath} programId={program.id} />
        </CardContent>
      </Card>
    </div>
  );
};
export default EditProgramPage;
