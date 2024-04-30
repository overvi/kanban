import { z } from "zod";

export const schemaPatch = z.object({
  title: z
    .string()
    .min(1, { message: "Title is Required" })
    .max(10, "The Maximum is 10 Char")
    .optional(),
  columns: z
    .array(
      z.object({
        title: z
          .string()
          .max(25, "The Maximum is 25 Char")
          .min(1, { message: "You at least nead one column" }),
        id: z.string().optional(),
      })
    )
    .min(1),
});

export const schemaTask = z.object({
  title: z
    .string()
    .max(23, "maximum chracter is 23")
    .min(1, { message: "The title is Required" }),
  description: z
    .string()
    .max(23, "maximum chracter is 23")
    .min(1, { message: "The Description is Required" }),
  columnId: z.string().optional(),
  subTasks: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, "title is required")
          .max(50, "maximum chracter is 50"),
        id: z.string().optional(),
      })
    )
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
