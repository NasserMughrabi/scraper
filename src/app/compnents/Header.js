import React from "react";
import { Box, Text, Button, Spinner, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Header = ({ api, setData, title }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrape = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/${api}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (api == "search-utah-jobs") {
          const companiesMap = convertToMap(data);
          setData(companiesMap);
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  const gradient = pickGradient(title);
  return (
    <>
      <Box
        color="white"
        bgGradient={gradient}
        p={4}
        mt={10}
        mb={5}
        fontSize="2xl"
        fontWeight="bold"
        shadow="md"
        textAlign="center"
        width={"100vw"}
      >
        {title}
      </Box>
      <Box mb={5}>
        {loading ? (
          <Flex>
            <Text
              fontSize="md"
              fontWeight="bold"
              // textTransform="uppercase"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              color={"white"}
              pr={2}
            >
              Scraping... This might take a few minutes
            </Text>
            <Spinner color="red.700" />
          </Flex>
        ) : (
          <Button onClick={scrape}>Start Scrape</Button>
        )}
      </Box>
    </>
  );
};

const pickGradient = (title) => {
  if (title.toLowerCase().includes("utah")) {
    return "linear(to-r, red.700, red.900)";
  } else if (title.toLowerCase().includes("google")) {
    return "linear(to-r, red.700, yellow.700, green.700, blue.700)";
  } else {
    return "linear(to-r, blue.700, blue.900)";
  }
};

const convertToMap = (data) => {
  const companiesMap = {};
  for (const company of data) {
    const companyName = company.companyName;
    const jobTitle = company.jobTitle;
    const jobURL = company.jobURL;
    console.log(companyName, jobTitle);
    if (companiesMap[companyName]) {
      companiesMap[companyName].push({ jobTitle, jobURL });
    } else {
      companiesMap[companyName] = [{ jobTitle, jobURL }];
    }
  }
  return companiesMap;
};

export default Header;
