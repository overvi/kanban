import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const deletedSubTask = await prisma?.subTask.delete({
    where: { id: body.subTaskId },
  });

  return NextResponse.json(deletedSubTask, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body: { taskId: number; subTasks: [{ title: string }] } =
    await request.json();

  const targetTask = await prisma?.task.findUnique({
    where: { id: body.taskId },
  });

  const newSubTask = await prisma?.subTask.createMany({
    data: body.subTasks.map((subTask) => ({
      title: subTask.title,
      completed: false,
      taskId: targetTask?.id!,
    })),
  });

  return NextResponse.json(newSubTask, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const body: {
    title: string;
    description: string;
    taskId: number;
    subTasks: { id: number; title: string }[];
  } = await request.json();

  const targetTask = await prisma?.task.findUnique({
    where: { id: body.taskId },
  });

  const updateTask = await prisma?.task.update({
    where: { id: targetTask?.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  const update = async (title: string, id: number) => {
    const updatedSubTask = await prisma?.subTask.updateMany({
      where: { id },
      data: {
        title,
      },
    });

    return updatedSubTask;
  };

  const results = await Promise.all(
    body.subTasks.map((subTask) => update(subTask.title, subTask.id || 0))
  );

  return NextResponse.json({ results, updateTask }, { status: 200 });
}
