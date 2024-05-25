import React from "react";
import {
  Box,
  Text,
  Button,
  Spinner,
  Flex,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  utahCompaniesPreScrapedData,
  linkedinPreScrapedData,
} from "../PreScrapedData";

const Header = ({ api, setData, title }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const scrape = () => {
    setShowDisclaimer(true);
    setLoading(true);
    if (process.env.NEXT_PUBLIC_REACT_APP_ENV === "production") {
      // Use pre-scraped data if in production
      if (api == "search-utah-jobs") {
        saveDataToLocalStorage("utah", utahCompaniesPreScrapedData);
        setData(utahCompaniesPreScrapedData);
      } else {
        saveDataToLocalStorage("linkedin", linkedinPreScrapedData);
        setData(linkedinPreScrapedData);
      }
      setLoading(false);
      setError(null);
      return;
    }

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
          // console.log(companiesMap);
          saveDataToLocalStorage("utah", companiesMap);
          setData(companiesMap);
        } else {
          // console.log(data);
          saveDataToLocalStorage("linkedin", data);
          setData(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("api error: ", error);
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
      {showDisclaimer && (
        <Box display={"flex"}>
          <Alert status="info">
            <AlertIcon />
            Disclaimer: The data displayed was pre-scraped on May 25, 2024, to
            minimize hosting costs.
          </Alert>
          <CloseButton
            color={"white"}
            onClick={() => setShowDisclaimer(false)}
          />
        </Box>
      )}

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
              Scraping... This may take a few minutes
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
    const { companyName, jobTitle, jobURL } = company;
    if (!companiesMap[companyName]) {
      companiesMap[companyName] = [];
    }
    companiesMap[companyName].push({ jobTitle, jobURL });
  }
  return companiesMap;
};

const saveDataToLocalStorage = (filter, data) => {
  if (typeof window !== "undefined") {
    if (filter == "utah") {
      localStorage.setItem("utahCompaniesPositions", JSON.stringify(data));
      return;
    }
    localStorage.setItem("utahLinkedinPositions", JSON.stringify(data));
  }
};

export default Header;
