"use client";
import React, { useState, useEffect } from "react";
import { Box, Text, VStack, useDisclosure, IconButton } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import JobStatus from "./JobStatus";

const companies = [
  "Qualtrics",
  "Domo",
  "Fusion",
  "BambooHR",
  "Sorenson",
  "Cox",
  "Pluralsight",
  "Vivint",
];

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
          {positions.map((company, index) => (
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
                <Text fontSize="md" mt="2" mr={"10"}>
                  {company}
                </Text>
                {/* <JobStatus /> */}
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

const Companies = () => {
  const [data, setData] = useState(null);
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
        const companiesMap = convertToMap(data);
        setData(companiesMap);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // return <div>{JSON.stringify(data)}</div>;
  return (
    <VStack align="center" mx="auto" backgroundColor={"#1c1c21"} py={10}>
      {companies.map((company, index) => {
        console.log(company, data[company], "here");
        const positions = data[company];
        console.log(positions);
        return (
          <CompanyItem key={index} company={company} positions={positions} />
        );
      })}
    </VStack>
  );
};

const convertToMap = (data) => {
  const companiesMap = {};
  for (const company of data) {
    const companyName = company.companyName;
    const jobTitle = company.jobTitle;
    console.log(companyName, jobTitle);
    if (companiesMap[companyName]) {
      companiesMap[companyName].push(jobTitle);
    } else {
      companiesMap[companyName] = [jobTitle];
    }
  }
  return companiesMap;
};

export default Companies;
