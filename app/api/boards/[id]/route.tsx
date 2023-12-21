import { NextRequest, NextResponse } from "next/server";
import { schemaColumn, schemaPatch, schmeaColumn } from "../../validation";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const target = await prisma?.board.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!target) return NextResponse.json("The board not find", { status: 400 });

  if (body.columnId) {
    const column = await prisma?.column.findUnique({
      where: { id: body.columnId },
      include: {
        tasks: {
          include: {
            subTasks: true,
          },
        },
      },
    });

    for (const task of column?.tasks!) {
      for (const subTask of task.subTasks) {
        await prisma?.subTask.delete({
          where: { id: subTask.id },
        });
      }
    }

    // Delete tasks
    await prisma?.task.deleteMany({
      where: { columnId: column?.id! },
    });

    // Delete the column
    await prisma?.column.delete({
      where: { id: body.columnId },
    });

    return NextResponse.json(column, { status: 200 });
  }

  const board = await prisma?.board.findUnique({
    where: { id: parseInt(params.id) },
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

  for (const column of board?.columns!) {
    for (const task of column.tasks) {
      for (const subTask of task.subTasks) {
        await prisma?.subTask.delete({
          where: { id: subTask.id },
        });
      }
    }
  }

  for (const column of board?.columns!) {
    await prisma?.task.deleteMany({
      where: { columnId: column.id },
    });
  }

  await prisma?.column.deleteMany({
    where: { boardId: parseInt(params.id) },
  });

  // Finally, delete the board
  await prisma?.board.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(board, { status: 200 });
}
// Delete subtasks in each task

export async function PATCH(request: NextRequest, { params }: Props) {
  const body: schemaPatch = await request.json();
  const validation = schemaPatch.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const target = await prisma?.board.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!target) return NextResponse.json("The board not find", { status: 400 });

  const updatedBoard = await prisma?.board.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
    },
  });

  const updateColumn = async (id: number, title: string) => {
    const updatedColumn = await prisma?.column.updateMany({
      where: { id },
      data: {
        title,
      },
    });
    return updatedColumn;
  };

  const results = await Promise.all(
    body.columns.map((column) => updateColumn(column.id || 0, column.title))
  );

  return NextResponse.json({ updatedBoard, results }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: Props) {
  const data = await prisma?.board.findUnique({
    where: { id: parseInt(params.id) },

    include: {
      columns: {
        include: {
          tasks: true,
        },
      },
    },
  });

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest, { params }: Props) {
  const body: schemaColumn = await request.json();
  const validation = schmeaColumn.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const target = await prisma?.board.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!target)
    return NextResponse.json("The Board does not exist", { status: 404 });

  const newColumn = await prisma?.column.createMany({
    data: body.columns.map((column) => ({
      title: column.title,
      boardId: parseInt(params.id),
    })),
  });

  return NextResponse.json(newColumn, { status: 201 });
}
