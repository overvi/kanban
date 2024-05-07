import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const targetTask = await prisma?.task.findUnique({
    where: { id: body.taskId },
  });

  if (!targetTask) {
    return NextResponse.json("This task does not exist", { status: 400 });
  }
  const updatedTask = await prisma?.task.update({
    where: { id: targetTask.id },
    data: {
      columnId: body.columnId,
      title: body.title,
      description: body.description,
    },
  });

  // const updatedVersion = async (id: number, title: string) => {
  //   const updateSubTask = await prisma?.subTask.updateMany({
  //     where: { id },
  //     data: {
  //       title,
  //     },
  //   });
  //   return updateSubTask;
  // };

  return NextResponse.json({ updatedTask }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const targetTask = await prisma?.task.findUnique({
    where: { id: body.taskId },
  });

  if (!targetTask) {
    return NextResponse.json("This task does not exist", { status: 400 });
  }

  const deleteSubTask = await prisma?.subTask.deleteMany({
    where: { taskId: targetTask.id },
  });

  const deletedTask = await prisma?.task.delete({
    where: { id: targetTask.id },
  });

  return NextResponse.json({ deleteSubTask, deletedTask }, { status: 200 });
}
