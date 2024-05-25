import React from "react";
import { useState, useEffect } from "react";
import {
  Link,
  Text,
  Tag,
  Button,
  Box,
  Flex,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";

const PositionItem = ({ position }) => {
  const [localStoragePositions, setLocalStoragePositions] = useState(() => {
    const savedPositions = localStorage.getItem("positions");
    return savedPositions ? JSON.parse(savedPositions) : [];
  });

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(localStoragePositions));
  }, [localStoragePositions]);

  const savePositionToLocalStorage = (event) => {
    event.stopPropagation();
    event.preventDefault();

    // get positions from local storage and add clicked position
    const savedPositions = JSON.parse(localStorage.getItem("positions"));

    // Add properties for tracker
    const newPosition = {
      ...position,
      referral: false,
      tailoredResume: false,
      coverLetter: false,
      date: new Date().toLocaleDateString(), // This will set the current date in the local date format
      status: "Applied"
    };

    // add to local storage by trigerring use effect above
    const updatedPositions = [...savedPositions, newPosition];
    setLocalStoragePositions(updatedPositions);
  };

  const truncateJobTitle = (title) => {
    return title.length > 28 ? `${title.slice(0, 28)}...` : title;
  };

  const isPositionTracked = () => {
    return localStoragePositions.some((pos) => pos.jobURL === position.jobURL);
  };

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
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box>
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
          {truncateJobTitle(position.jobTitle)}
        </Link>
      </Box>

      <Flex height={"25px"}>
        <Tag
          ml="2"
          color={"green.600"}
          borderRadius="full"
          border={"1px solid"}
          borderColor={"green.600"}
          backgroundColor={"transparent"}
          px="3"
          py="1"
          fontSize="sm"
          boxShadow="sm"
        >
          {position.postTime}
        </Tag>
        <Tag
          ml="2"
          color={"green.600"}
          borderRadius="full"
          border={"1px solid"}
          borderColor={"green.600"}
          backgroundColor={"transparent"}
          px="3"
          py="1"
          fontSize="sm"
          boxShadow="sm"
        >
          {position.experience} years experience
        </Tag>
        <Tag
          ml="2"
          color={"green.600"}
          borderRadius="full"
          border={"1px solid"}
          borderColor={"green.600"}
          backgroundColor={"transparent"}
          px="3"
          py="1"
          fontSize="sm"
          boxShadow="sm"
        >
          {position.jobLocation}
        </Tag>
        {/* <Tag
          ml="2"
          color={"green.600"}
          borderRadius="full"
          border={"1px solid"}
          borderColor={"green.600"}
          backgroundColor={"transparent"}
          px="3"
          py="1"
          fontSize="sm"
          boxShadow="sm"
        >
          {position.jobLevel}
        </Tag> */}
      </Flex>

      <Box>
        {isPositionTracked() ? (
          <Tooltip
            label="This position is already being tracked"
            aria-label="Tracking tooltip"
          >
            <IconButton
              icon={<CheckIcon />}
              colorScheme="green"
              size="sm"
              isDisabled
              zIndex={"2"}
            />
          </Tooltip>
        ) : (
          <Tooltip label="Add to tracker" aria-label="Add to tracker tooltip">
            <IconButton
              icon={<AddIcon />}
              colorScheme="blue"
              size="sm"
              onClick={savePositionToLocalStorage}
              zIndex={"2"}
            />
          </Tooltip>
        )}
      </Box>
    </Link>
  );
};

export default PositionItem;
