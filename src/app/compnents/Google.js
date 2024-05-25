"use client";
import React from "react";
import { useState } from "react";
import { Box, Text, VStack, Link } from "@chakra-ui/react";
import Header from "./Header";
import PositionItem from "./PositionItem";

const Google = () => {
  const [googleData, setGoogleData] = useState([]);
  return (
    <VStack
      height={"100vh"}
      align="center"
      mx="auto"
      backgroundColor={"#1c1c21"}
      py={10}
      overflowY={"auto"}
    >
      <Header api={"search-utah-jobs"} setData={setGoogleData} title={"Google Jobs"} />
      {googleData.map((position, index) => (
        <PositionItem key={index} position={position} />
      ))}
    </VStack>
  );
};

export default Google;
