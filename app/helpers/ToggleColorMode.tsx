import { Box, Flex } from "@radix-ui/themes";
import { FaMoon } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import Switch from "./Switch";

const ToggleColorMode = () => {
  return (
    <Box className="bg-gray-3 rounded-md  ">
      <Flex className="p-3">
        <Flex className="flex m-auto items-center w-fit gap-2">
          <WiDaySunny size="30" />
          <Switch />
          <FaMoon size="21" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ToggleColorMode;
