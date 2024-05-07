import { NextRequest, NextResponse } from "next/server";
import { schemaTask } from "../../validation";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body: schemaTask = await request.json();
  const validation = schemaTask.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const target = await prisma?.column.findUnique({
    where: { id: body.columnId },
    include: {
      tasks: true,
    },
  });

  if (!target) {
    return NextResponse.json("The Column not found", { status: 400 });
  }

  const calculateOrders = () => {
    return target.tasks.length + 1;
  };

  const newTask = await prisma?.task.create({
    data: {
      title: body.title,
      description: body.description,
      columnId: body.columnId!,
      order: calculateOrders(),
    },
  });

  if (body.subTasks) {
    const newSubTask = await prisma?.subTask.createMany({
      data: body.subTasks.map((a) => ({
        completed: false,
        taskId: newTask?.id!,
        title: a.title,
      })),
    });
    return NextResponse.json({ newTask, newSubTask }, { status: 201 });
  }

  return NextResponse.json(newTask, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body: { taskId: string; columnId: string; taskOrder: string[] } =
    await request.json();
  const target = await prisma?.column.findUnique({
    where: { id: body.columnId },
    include: {
      tasks: true,
    },
  });

  if (!target) {
    return NextResponse.json("The Column not found", { status: 400 });
  }

  const updateTasks = async (order: number) => {
    const updatedOrders = await prisma?.task.updateMany({
      where: { id: body.taskOrder[order] },
      data: {
        order: order,
      },
    });

    return updatedOrders;
  };

  const results = await Promise.all(
    target.tasks.map((task) => updateTasks(body.taskOrder.indexOf(task.id)))
  );

  return NextResponse.json(results, { status: 200 });
}
