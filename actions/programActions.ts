"use server";
// import { Program, ProgramExecution } from "@/types/Program";
import { prisma } from "@/lib/db";
import { Program, ProgramExecution, ProgramStatus } from "@prisma/client";
import { ActionResponse } from "@/types";

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
  } catch {
    // handle if error
    return { status: "ERROR", error: "Something went wrong" };
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
      prisma.user.delete({
        where: { id },
      }),
    );

    await Promise.all(deletePromises);

    return { status: "SUCCESS", success: "Successfully deleted programs" };
  } catch {
    // handle if error
    return { status: "ERROR", error: "Something went wrong" };
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
  } catch {
    // handle if error
    return { status: "ERROR", error: "Something went wrong" };
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
  } catch {
    // handle if error
    return { status: "ERROR", error: "Something went wrong" };
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
        date: "asc", // Urutkan berdasarkan tanggal terdekat
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
  } catch {
    return { status: "ERROR", success: "Something went wrong" };
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
  } catch {
    return { status: "ERROR", error: "Something went wrong" };
  }
};

export const getProgramByIdAction = async (
  programId: string,
): Promise<ActionResponse<Program>> => {
  try {
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) return { status: "ERROR", error: "Program not found" };

    return {
      status: "SUCCESS",
      success: "Success get program by ID",
      data: program,
    };
  } catch {
    return { status: "ERROR", error: "Something went wrong" };
  }
};
