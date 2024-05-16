"use client";
import React, { useState } from "react";
import { Box, Text, VStack, useDisclosure, IconButton } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

const CompanyItem = ({ company }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
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
        textTransform="uppercase"
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
      {isOpen && (
        <Text fontSize="md" mt="2">
          {company}
        </Text>
      )}
    </Box>
  );
};

const Companies = () => {
  const companies = [
    "Sorenson Communications",
    "Cox Enterprise",
    "Pluralsight",
    "Vivint",
    "Qualtrics",
    "Domo",
  ];

  return (
    <VStack align="center" mx="auto" backgroundColor={"#1c1c21"} py={10}>
      {companies.map((company, index) => (
        <CompanyItem key={index} company={company} />
      ))}
    </VStack>
  );
};

export default Companies;
