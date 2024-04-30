import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const targetColumn = await prisma?.column.findUnique({
    where: { id: params.slug },
  });
  const tasks = await prisma?.task.findMany({
    where: { columnId: targetColumn?.id },
    include: {
      subTasks: true,
    },
  });

  return NextResponse.json(tasks, { status: 200 });
}
