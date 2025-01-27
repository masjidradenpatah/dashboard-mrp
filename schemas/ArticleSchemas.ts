import z from "zod";

export const newArticleSchema = z.object({
  title: z.string().min(3),
  slug: z.string(),
  category: z.string(),
  content: z.string(),
});
