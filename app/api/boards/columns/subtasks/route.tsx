import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { subtask: string } }
) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const targetSubTask = await prisma?.subTask.findUnique({
    where: { id: body.subTaskId },
  });

  if (!targetSubTask) return NextResponse.json("This subTask does not exist");

  const patchedSubTask = await prisma?.subTask.update({
    where: { id: targetSubTask.id },
    data: {
      completed: body.completed,
    },
  });

  return NextResponse.json(patchedSubTask, { status: 200 });
}
