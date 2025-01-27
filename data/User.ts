import {prisma} from '@/lib/db'
import { User } from "@prisma/client";


export async function getUserByEmail(email:string) {
  const user : User | null = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return user;
}

export async function getUserById(id:string) {
  const user : User | null = await prisma.user.findUnique({
    where: {
      id
    }
  });
  return user;
}