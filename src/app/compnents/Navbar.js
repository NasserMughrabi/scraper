import { Box, Flex, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const navs = [
  ["utah", "Utah Companies"],
  ["linkedin", "Linkedin Listings"],
  ["indeed", "Indeed Listings"],
  ["google", "Google Jobs"],
  ["tracker", "Job Tracker"],
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <HStack
      spacing={5}
      bg="blue.600"
      color="white"
      shadow="sm"
      width="full"
      cursor="pointer"
      p={"4px"}
      position={"absolute"}
      zIndex={1}
    >
      {navs.map((nav, index) => {
        const isActive = pathname === `/${nav[0]}`;
        return (
          <Box
            key={index}
            p={2}
            borderRadius="md"
            bg={isActive ? "blue.700" : undefined}
            _hover={{ bg: "blue.700" }}
            onClick={() => router.push(`/${nav[0]}`)}
          >
            {nav[1]}
          </Box>
        );
      })}
    </HStack>
  );
};

export default Navbar;
