import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { schemaPost } from "../validation";

interface Props {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: Props) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body: schemaPost = await request.json();
  const validation = schemaPost.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newBoard = await prisma?.board.create({
    data: {
      title: body.title,
      userId: session.userId!,

      columns: {
        createMany: {
          data: body.columns.map((column) => ({
            title: column.title,
          })),
        },
      },
    },
  });

  return NextResponse.json({ newBoard }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { userId } = auth();
  const data = await prisma?.board.findMany({
    where: { userId: userId || "" },
    include: {
      columns: true,
    },
  });

  return NextResponse.json(data, { status: 200 });
}
