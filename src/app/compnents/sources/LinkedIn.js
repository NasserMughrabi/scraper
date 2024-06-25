"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Box, Text, VStack, Link, Flex, Button } from "@chakra-ui/react";
import Header from "../Header";
import PositionItem from "../PositionItem";

const LinkedIn = () => {
  const [filter, setFilter] = useState("utah");
  const [linkedinData, setLinkedinData] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPositions = localStorage.getItem("utahLinkedinPositions");
      if (savedPositions) {
        setLinkedinData(JSON.parse(savedPositions));
      }
    }
  }, []);

  return (
    <>
      <VStack
        height={"100vh"}
        align="center"
        mx="auto"
        backgroundColor={"#1c1c21"}
        py={10}
        overflowY={"auto"}
        pb={20}
      >
        <Header
          api={"search-linkedin-utah-jobs"}
          setData={setLinkedinData}
          title={"LinkedIn Utah Listings"}
        />
        <Header
          api={"search-linkedin-usa-jobs"}
          setData={setLinkedinData}
          title={"LinkedIn USA Listings"}
        />
        <Flex justifyContent="center" w="100vw" p={4}>
          <Button
            onClick={() => setFilter("utah")}
            colorScheme={filter === "utah" ? "blue" : "gray"}
            w={"35%"}
            borderRadius={0}
          >
            Utah Filter
          </Button>
          <Button
            onClick={() => setFilter("usa")}
            colorScheme={filter === "usa" ? "blue" : "gray"}
            w={"35%"}
            borderRadius={0}
          >
            USA Filter
          </Button>
        </Flex>
        {filter == "utah" ? (
          <>
            {linkedinData
              .filter((position) => {
                return (
                  position.jobLocation.toLowerCase().includes("ut") ||
                  position.jobLocation.toLowerCase().includes("utah")
                );
              })
              .sort((a, b) => a.companyName.localeCompare(b.companyName))
              .map((position, index) => (
                <PositionItem key={index} position={position} />
              ))}
          </>
        ) : (
          <>
            {linkedinData
              .filter((position) => {
                return !(
                  position.jobLocation.toLowerCase().includes("ut") ||
                  position.jobLocation.toLowerCase().includes("utah")
                );
              })
              .map((position, index) => (
                <PositionItem key={index} position={position} />
              ))}
          </>
        )}
      </VStack>
    </>
  );
};

export default LinkedIn;
