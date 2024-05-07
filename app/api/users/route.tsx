import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await clerkClient.users.getUserList();
  return NextResponse.json(users.data, { status: 200 });
}
