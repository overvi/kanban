import { z } from "zod";

export const schemaPatch = z.object({
  title: z.string().min(1, { message: "Title is Required" }).optional(),
  columns: z
    .array(
      z.object({
        title: z.string().min(1, { message: "You at least nead one column" }),
        id: z.number().optional(),
      })
    )
    .min(1),
});

export const schemaTask = z.object({
  title: z.string().min(1, { message: "The title is Required" }),
  description: z.string().min(1, { message: "The Description is Required" }),
  columnId: z.number().optional(),
  subTasks: z
    .array(z.object({ title: z.string(), id: z.number().optional() }))
    .optional(),
});

export const schemaPost = z.object({
  title: z.string(),
  columns: z.array(z.object({ title: z.string() })),
});

export const schmeaColumn = z.object({
  title: z.string().optional(),
  columns: z.array(z.object({ title: z.string() })),
});

export type schemaPatch = z.infer<typeof schemaPatch>;
export type schemaTask = z.infer<typeof schemaTask>;
export type schemaPost = z.infer<typeof schemaPost>;
export type schemaColumn = z.infer<typeof schmeaColumn>;
