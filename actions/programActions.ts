"use server";
import { prisma } from "@/lib/db";
import {
  Prisma,
  Program,
  ProgramExecution,
  ProgramStatus
} from "@prisma/client";
import { ActionResponse } from "@/types";
import { prismaErrorChecker } from "@/lib/prismaErrorChecker";

export async function createNewProgram(input: Prisma.ProgramCreateInput) : Promise<ActionResponse<Program>> {
  try {
    const newProgram = await prisma.program.create({ data: input });

    return {
      status: "SUCCESS",
      success: "Successfully creating new program",
      data: newProgram
    }
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

export async function createNewUpcomingProgram(input: Prisma.ProgramExecutionCreateWithoutProgramInput, programId: string) : Promise<ActionResponse<ProgramExecution>> {
  try {
    const newUpcomingProgram = await prisma.programExecution.create({
      data: {
        ...input,
        program: {
          connect: {
            id: programId
          }
        }
      },
      include : {
        program: true
      }
    });

    return {
      status: "SUCCESS",
      success: "Successfully creating a new upcoming program",
      data: newUpcomingProgram
    }
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

export async function getAllPrograms(): Promise<ActionResponse<Program[]>> {
  try {
    // Check if users exist or not
    const programs = await prisma.program.findMany();

    if (programs.length === 0) {
      return { status: "ERROR", error: "Programs do not exist" };
    }

    return {
      status: "SUCCESS",
      success: "Successfully fetching all programs",
      data: programs,
    };
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

export async function deleteManyProgramsByID(
  ids: string[],
): Promise<ActionResponse<never>> {
  try {
    // Check if users exist or not
    const programs = await prisma.program.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (programs.length === 0) {
      return { status: "ERROR", error: "Programs do not exist" };
    }

    // Delete programs in parallel
    const deletePromises = ids.map((id) =>
      prisma.program.delete({
        where: { id },
      }),
    );

    await Promise.all(deletePromises);

    // TODO
    // also delete the image in imagekit

    return { status: "SUCCESS", success: "Successfully deleted programs" };
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

export async function getAllUpcomingProgram(): Promise<
  ActionResponse<ProgramExecution[]>
> {
  // return prisma.programExecution.findMany();
  try {
    const programExecutions: ProgramExecution[] =
      await prisma.programExecution.findMany();

    if (programExecutions.length === 0) {
      return { status: "ERROR", error: "Programs do not exist" };
    }

    return {
      status: "SUCCESS",
      success: "Successfully get all upcoming program",
      data: programExecutions,
    };
  } catch {
    // handle if error
    return { status: "ERROR", error: "Something went wrong" };
  }
}

export async function getFirstUpcomingProgram(): Promise<
  ActionResponse<ProgramExecution[]>
> {
  // return prisma.programExecution.findMany();
  try {
    //  bagaimana cara query hanya ambil show order  yang tidak null saja
    const programExecutions: ProgramExecution[] = await prisma.programExecution.findMany({
      where: {
        showOrder: { not: null } // Hanya ambil yang showOrder-nya tidak null
      },
      orderBy: {
        showOrder: 'asc' // Opsional: urutkan berdasarkan showOrder
      },
      take: 3 // Batasi hasil
    });

    return {
      status: "SUCCESS",
      success: "Successfully get all upcoming program",
      data: programExecutions,
    };
  } catch {
    // handle if error
    return { status: "ERROR", error: "Something went wrong" };
  }
}

export async function deleteManyUpcomingProgramByID(
  ids: string[],
): Promise<ActionResponse<never>> {
  try {
    // Check if upcoming program exist or not
    const upcomingPrograms = await prisma.programExecution.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (upcomingPrograms.length === 0) {
      return { status: "ERROR", error: "Upcoming programs do not exist" };
    }

    // Delete upcomingPrograms in parallel
    const deletePromises = ids.map((id) =>
      prisma.user.delete({
        where: { id },
      }),
    );

    await Promise.all(deletePromises);

    return { status: "SUCCESS", success: "Successfully deleted programs" };
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

export async function updateUpcomingProgramStatus(
  id: string,
  newStatus: ProgramStatus,
): Promise<ActionResponse<ProgramExecution>> {
  try {
    // check if user exist or not
    const upcomingProgram = await prisma.programExecution.findUnique({
      where: { id },
    });

    // handle if error
    if (!upcomingProgram)
      return { status: "ERROR", error: "Upcoming program doesn't exist" };

    // update the role
    const updatedProgram = await prisma.programExecution.update({
      data: {
        ...upcomingProgram,
        status: newStatus,
      },
      where: {
        id,
      },
    });

    return {
      status: "SUCCESS",
      success: "Success updating new status",
      data: updatedProgram,
    };
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

type ProgramExecutionWithProgram = ProgramExecution & {
  program: Program;
};
export const getUpcomingPrograms = async (
  numberItem?: number | "all",
): Promise<ActionResponse<ProgramExecutionWithProgram[]>> => {
  const now = new Date();

  try {
    const programs = await prisma.programExecution.findMany({
      where: {
        status: "UPCOMING",
        date: {
          gt: now, // Hanya ambil program dengan tanggal lebih besar dari sekarang
        },
      },
      orderBy: {
        showOrder: "asc", // Urutkan berdasarkan tanggal terdekat
      },
      take: numberItem === "all" ? undefined : numberItem || 3, // Batasi jumlah hasil
      include: {
        program: true, // Sertakan informasi program jika diperlukan
      },
    });

    return {
      status: "SUCCESS",
      success: "Success get upcoming program",
      data: programs,
    };
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
};

export const getProgramGroupByType = async (
  type: "ALL" | "DAILY" | "ANNUALY" = "ALL",
  numberItem: "all" | number = 3,
): Promise<ActionResponse<Program[]>> => {
  try {
    const programs = await prisma.program.findMany({
      where: type === "ALL" ? undefined : { type },
      take: numberItem === "all" ? undefined : numberItem || 3,
    });

    return {
      status: "SUCCESS",
      success: `Success get ${type} program`,
      data: programs,
    };

    // return programs as Program[];
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
};

export const getProgramByIdAction = async (
  programId: string,
): Promise<ActionResponse<Program & { programExecution: ProgramExecution[] }>> => {
  try {
    const program = await prisma.program.findUnique({
      where: { id: programId },
      include: {
        programExecution: true // This will include all program executions
      }
    });

    if (!program) return { status: "ERROR", error: `Program with id (${programId})  not found` };

    return {
      status: "SUCCESS",
      success: "Success get program by ID",
      data: program,
    };
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
};


export async function updateProgrambyId(programId:string, input: Prisma.ProgramUpdateInput) : Promise<ActionResponse<Program>> {
  try {

    const updatedProgram = await prisma.program.update({where: {id: programId}, data: input });

    return {
      status: "SUCCESS",
      success: `Successfully updating program ${updatedProgram.title}`,
      data: updatedProgram
    }
  } catch (err) {
    const {error} = prismaErrorChecker(err);
    return {
      status: "ERROR", error
    }
  }
}

export async function updateManyUpcomingProgram(
  updates: { id: string; data: Prisma.ProgramExecutionUpdateInput }[]
): Promise<ActionResponse<ProgramExecution[]>> {
  try {
    const results = await prisma.$transaction(
      updates.map(update =>
        prisma.programExecution.update({
          where: { id: update.id },
          data: update.data
        })
      )
    );

    return {
      status: "SUCCESS",
      success: `Successfully updated ${results.length} upcoming program`,
      data: results
    };
  } catch (err) {
    const { error } = prismaErrorChecker(err);
    return { status: "ERROR", error };
  }
}