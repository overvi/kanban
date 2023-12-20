import { Box, Container, Text } from "@radix-ui/themes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingBase = () => {
  const howManyRows = [1, 2, 3];
  return (
    <>
      <Container>
        {howManyRows.map((row) => (
          <Box key={row}>
            <SkeletonTheme>
              <Box className="flex gap-4 items-center">
                <Skeleton circle width="3rem" height="3rem" />
                <Skeleton containerClassName="ml-4 h-4 w-[16.5rem] h-4 " />
              </Box>
              <Box className="flex gap-10 items-center p-2">
                <Skeleton
                  containerClassName="space-y-2"
                  count={1}
                  width="20rem"
                  height="6rem"
                  borderRadius="5%"
                />
              </Box>
            </SkeletonTheme>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default LoadingBase;

export const ToggleColorButton = () => {
  return (
    <>
      <Skeleton height="24px" containerClassName="px-2" width="68px" />
    </>
  );
};
