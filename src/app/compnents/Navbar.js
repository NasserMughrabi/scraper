import { Box, Flex, Button, HStack } from "@chakra-ui/react";
import React from "react";

const Navbar = ({ setComponent }) => {
  return (
    // <Flex
    //   as="nav"
    //   align="center"
    //   justify="space-between"
    //   wrap="wrap"
    //   padding="1rem"
    //   bg="blue.600"  // Example background color
    //   color="white"
    //   shadow="sm"
    //   width="full"
    // >
    <HStack
      spacing={5}
      bg="blue.600"
      color="white"
      shadow="sm"
      width="full"
      cursor="pointer"
      p={"4px"}
    >
      <Box
        p={2}
        borderRadius="md"
        _hover={{ bg: "blue.700" }}
        onClick={() => setComponent("utah companies")}
      >
        Utah Companies
      </Box>
      <Box
        p={2}
        borderRadius="md"
        _hover={{ bg: "blue.700" }}
        onClick={() => setComponent("linkedin listings")}
      >
        LinkedIn Listings
      </Box>
      <Box
        p={2}
        borderRadius="md"
        _hover={{ bg: "blue.700" }}
        onClick={() => setComponent("indeed listings")}
      >
        Indeed Listings
      </Box>
      <Box
        p={2}
        borderRadius="md"
        _hover={{ bg: "blue.700" }}
        onClick={() => setComponent("google jobs")}
      >
        Google Jobs
      </Box>
    </HStack>
    // </Flex>
  );
};

export default Navbar;
