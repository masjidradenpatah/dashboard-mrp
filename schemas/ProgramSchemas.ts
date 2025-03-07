import z from "zod";
import {ProgramType} from '@prisma/client'

export const newProgramSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }), // Must be non-empty
  content: z.string().min(1, { message: "Content is required" }), // Must be non-empty
  image: z.string().min(1, { message: "Image is required" }), // Must be non-empty
  type: z.string().min(1, { message: "Type is required" }), // Must be non-empty
  customUrl: z.string().optional(), // Optional, can be empty or undefined
});