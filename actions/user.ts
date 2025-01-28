"use server";

import { User, UserRole } from "@prisma/client";
import { getUserById } from "@/data/User";
import { prisma } from "@/lib/db";
import { ActionResponse } from "@/types";

export async function getAllUser(): Promise<ActionResponse<User[]>> {
  try {
    const allUsers = await prisma.user.findMany();
    if (!allUsers) return { status: "ERROR", error: "users not found" };

    return {
      status: "SUCCESS",
      success: "Successfully fetching user",
      data: allUsers,
    };
  } catch {
    return { status: "ERROR", error: "Something went wrong" };
  }
}

export async function updateUserRole(
  id: string,
  newRole: UserRole,
): Promise<ActionResponse<User>> {
  try {
    // check if user exist or not
    const user = await getUserById(id);

    // handle if error
    if (!user) return { status: "ERROR", error: "User doesn't exist" };

    // update the role
    const updatedUser = await prisma.user.update({
      data: {
        ...user,
        role: newRole,
      },
      where: {
        id,
      },
    });

    return {
      status: "SUCCESS",
      success: "Success updating new role",
      data: updatedUser,
    };
  } catch {
    return { status: "ERROR", error: "users not found" };
  }
}

export async function deleteManyUserByID(
  ids: string[],
): Promise<ActionResponse<never>> {
  try {
    // Check if users exist or not
    const users = await prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (users.length === 0) {
      return { status: "ERROR", error: "Users do not exist" };
    }

    // Check for foreign key constraints (e.g., articles related to the users)
    const usersWithArticles = await prisma.article.findMany({
      where: {
        authorId: { in: ids },
      },
      select: {
        authorId: true,
      },
    });

    if (usersWithArticles.length > 0) {
      return {
        status: "ERROR",
        error: "Tidak bisa menghapus user yang memiliki artikel.",
      };
    }

    // Delete users in parallel
    const deletePromises = ids.map((id) =>
      prisma.user.delete({
        where: { id },
      }),
    );

    await Promise.all(deletePromises);

    return { status: "SUCCESS", success: "Successfully deleted users" };
  } catch (err: unknown) {
    // @ts-expect-error the error object here could be anything
    if (err.code && err.code === "P2003") {
      return {
        status: "ERROR",
        error: "Tidak bisa menghapus user yang memiliki artikel.",
      };
    }
    // @ts-expect-error should be okay
    return { status: "ERROR", error: err.toString() };
  }
}
