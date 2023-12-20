import { Board } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { CreateBoard } from "../components/Modals/Modals";
import Nav from "../components/Nav/Nav";
import ToggleSideBar from "../helpers/ToggleSideBar";

const SideBar = ({ boards }: { boards: Board[] }) => {
  return (
    <>
      <Flex className="border-r z-10 hidden fixed overflow-auto overflow-x-hidden h-[calc(100vh-6.31rem)] border-borders-100  md:flex flex-col justify-between mb-5 nav bg-gray-2  px-7">
        <Nav boards={boards}>
          <ToggleSideBar />
        </Nav>
      </Flex>
      <CreateBoard />
    </>
  );
};

export default SideBar;
