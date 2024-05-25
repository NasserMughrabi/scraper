"use client";
import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  useDisclosure,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Header from "./Header";

const companies = [
  "Qualtrics",
  "Domo",
  "Fusion",
  "BambooHR",
  "Sorenson",
  "Cox",
  "Pluralsight",
  "Vivint",
  "Nice",
  "Pattern",
  "CHG Healthcare",
  "Select Health",
  "Zions Bancorporation",
  "Utah Transit Authority",
];

const UTCompanies = () => {
  const [utahData, setUtahData] = useState({});

  return (
    <VStack
      height={"100vh"}
      overflowY={"auto"}
      align="center"
      mx="auto"
      backgroundColor={"#1c1c21"}
      py={10}
    >
      <Header api={"search-utah-jobs"} setData={setUtahData} title={"Utah Companies"} />
      {companies.sort().map((company, index) => {
        let positions = utahData[company];
        if (!positions) {
          positions = [{ jobTitle: "None Available" }];
        }
        return (
          <CompanyItem key={index} company={company} positions={positions} />
        );
      })}
    </VStack>
  );
};

const CompanyItem = ({ company, positions }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <VStack spacing={0}>
      <Box
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
        onClick={onToggle}
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
          {company}
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            aria-label={isOpen ? "Collapse" : "Expand"}
            color={"white"}
            backgroundColor={"transparent"}
          />
        </Text>
      </Box>
      {isOpen && (
        <VStack spacing={0}>
          {positions.map((position, index) => (
            <Box
              key={index}
              color={"white"}
              backgroundColor={"transparent"}
              border="1px solid #515151"
              borderTop={"0.5px"}
              width={"70vw"}
              padding={"10px"}
              _hover={{
                backgroundColor: "#515151",
                borderColor: "#1e1e1e",
              }}
              _active={{
                backgroundColor: "#333",
                borderColor: "#333",
              }}
              transition="background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease"
              cursor={"pointer"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Link
                  href={position.jobURL}
                  isExternal
                  fontSize="md"
                  mt="2"
                  mr={"10"}
                >
                  {position.jobTitle}
                </Link>
                {/* <JobStatus /> */}
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default UTCompanies;
