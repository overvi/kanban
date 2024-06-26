import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const deletedSubTask = await prisma?.subTask.delete({
    where: { id: body.subTaskId },
  });

  return NextResponse.json(deletedSubTask, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body: { taskId: string; subTasks: [{ title: string }] } =
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
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body: {
    title: string;
    description: string;
    taskId: string;
    subTasks: { id: string; title: string }[];
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
  const update = async (title: string, id: string) => {
    const updatedSubTask = await prisma?.subTask.updateMany({
      where: { id },
      data: {
        title,
      },
    });

    return updatedSubTask;
  };

  const results = await Promise.all(
    body.subTasks.map((subTask) => update(subTask.title, subTask.id || ""))
  );

  return NextResponse.json({ results, updateTask }, { status: 200 });
}
