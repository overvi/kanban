import { Prisma } from "@prisma/client";

const BoardFull = Prisma.validator<Prisma.BoardArgs>()({
  include: {
    columns: {
      include: {
        tasks: {
          include: {
            subTasks: true,
          },
        },
      },
    },
  },
});

const TaskFull = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    subTasks: true,
  },
});

export type BoardFull = Prisma.BoardGetPayload<typeof BoardFull>;
export type TaskFull = Prisma.TaskGetPayload<typeof TaskFull>;
