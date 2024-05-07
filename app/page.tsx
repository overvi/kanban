import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import Board from "./Management/Board";
import SideBar from "./Management/SideBar";
import Todos from "./Management/Todos";
import ChooseLogo from "./components/Nav/ChooseLogo";
import Scroll from "./helpers/Scroll";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();
  const boards = await prisma.board.findMany({
    where: userId ? { userId } : undefined,
    include: {
      columns: {
        include: {
          tasks: {
            orderBy: { order: "asc" },
            include: {
              subTasks: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <Box className="flex">
        <ChooseLogo />
        <Todos boards={boards} />
      </Box>
      <Scroll>
        <SideBar boards={boards} />
        <Board boards={boards} />
      </Scroll>
    </>
  );
}

export const dynamic = "force-dynamic";
