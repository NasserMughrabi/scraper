"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  useDisclosure,
  IconButton,
  Link,
} from "@chakra-ui/react";

const Google = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/start-job-search")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // const parsedData = JSON.stringify(data)
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <VStack
      height={"100vh"}
      align="center"
      mx="auto"
      backgroundColor={"#1c1c21"}
      py={10}
      overflowY={"auto"}
    >
      <Box
        color="white"
        bgGradient="linear(to-r, red.700, yellow.700, green.700, blue.700)" // Using a gradient background
        p={4}
        m={4}
        fontSize="2xl"
        fontWeight="bold"
        shadow="md"
        textAlign="center"
        width={"full"}
      >
        Google Jobs
      </Box>
      {data.map((position, index) => (
        <PositionItem key={index} position={position} />
      ))}
    </VStack>
  );
};

const PositionItem = ({ position }) => {
  return (
    <Link
      color="white"
      backgroundColor="#1e1e1e"
      _hover={{
        backgroundColor: "#515151",
        borderColor: "#1e1e1e",
      }}
      _active={{
        backgroundColor: "#333",
        borderColor: "#333",
      }}
      border="2px solid #515151"
      borderRadius="5px"
      width={"70vw"}
      padding="0.3rem 1.5rem"
      transition="background-color 0.3s ease, color 0.3s ease, border 0.3s ease"
      cursor="pointer"
      href={position.jobURL}
      isExternal
    >
      <Text
        fontSize="md"
        fontWeight="bold"
        // textTransform="uppercase"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
      >
        {position.companyName}
      </Text>
      <Link href={position.jobURL} isExternal fontSize="md" mt="2" mr={"10"}>
        {position.jobTitle}
      </Link>
    </Link>
  );
};

export default Google;
