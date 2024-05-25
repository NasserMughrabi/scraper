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
  Tooltip,
  VStack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Select,
  Input,
  CloseButton,
} from "@chakra-ui/react";
// import { CheckIcon, CheckSquareIcon } from "@chakra-ui/icons";
import { CheckIcon, CheckCircleIcon } from "@chakra-ui/icons";

const Tracker = () => {
  // Get the to-be tracked positions from local storage
  const [localStoragePositions, setLocalStoragePositions] = useState(() => {
    const savedPositions = localStorage.getItem("positions");
    return savedPositions ? JSON.parse(savedPositions) : [];
  });

  const [referral, setReferral] = useState(false);
  const [tailoredResume, setTailoredResume] = useState(false);

  const truncateJobTitle = (title) => {
    return title.length > 28 ? `${title.slice(0, 28)}...` : title;
  };

  const truncateCompanyName = (name) => {
    return name.length > 10 ? `${name.slice(0, 10)}...` : name;
  };

  const updatePositionField = (index, field, value) => {
    const updatedPositions = localStoragePositions.map((position, posIndex) => {
      if (index === posIndex) {
        return { ...position, [field]: value };
      }
      return position;
    });
    setLocalStoragePositions(updatedPositions);
    localStorage.setItem("positions", JSON.stringify(updatedPositions));
  };

  const deletePosition = (index) => {
    const updatedPositions = localStoragePositions.filter(
      (_, posIndex) => index !== posIndex
    );
    setLocalStoragePositions(updatedPositions);
    localStorage.setItem("positions", JSON.stringify(updatedPositions));
  };

  return (
    <VStack
      height={"100vh"}
      align="center"
      mx="auto"
      backgroundColor={"#1c1c21"}
      py={10}
      overflowY={"auto"}
      w={"100vw"}
    >
      <TableContainer
        color={"gray.100"}
        width={"92vw"}
        mt={10}
        backgroundColor={"#1e1e1e"}
        border="2px solid #515151"
        p={4}
        overflowY={"auto"}
      >
        <Table variant="simple" colorScheme="blue">
          <TableCaption>
            {localStoragePositions.length} Tracked Jobs
          </TableCaption>
          <Thead>
            <Tr>
              <Th color={"white"}>Company</Th>
              <Th color={"white"}>Position</Th>
              <Th color={"white"}>Date</Th>
              <Th color={"white"}>Referral</Th>
              <Th color={"white"}>Tailored Resume</Th>
              <Th color={"white"}>Cover Letter</Th>
              <Th color={"white"}>Status</Th>
              <Th color={"white"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {localStoragePositions.map((position, index) => (
              // <TrackerItem key={index} position={position} />
              <Tr
                key={index}
                backgroundColor={position.status == "Offer" ? "green.800" : ""}
              >
                <Td>{truncateCompanyName(position.companyName)}</Td>
                <Td>
                  <Link
                    href={position.jobURL}
                    isExternal
                    fontSize="md"
                    mt="2"
                    mr={"10"}
                    color={"blue.300"}
                    textDecoration={"underline"}
                  >
                    {truncateJobTitle(position.jobTitle)}
                  </Link>
                </Td>
                <Td>
                  {position.date}
                  {/* <CheckBtn check={true} /> */}
                </Td>
                <Td>
                  <MarkItem
                    value={position.referral}
                    onUpdate={() =>
                      updatePositionField(index, "referral", !position.referral)
                    }
                  />
                </Td>
                <Td>
                  <MarkItem
                    value={position.tailoredResume}
                    onUpdate={() =>
                      updatePositionField(
                        index,
                        "tailoredResume",
                        !position.tailoredResume
                      )
                    }
                  />
                </Td>
                <Td>
                  <MarkItem
                    value={position.coverLetter}
                    onUpdate={() =>
                      updatePositionField(
                        index,
                        "coverLetter",
                        !position.coverLetter
                      )
                    }
                  />
                </Td>
                <Td>
                  <MarkItem
                    type="status"
                    value={position.status}
                    onUpdate={(newStatus) =>
                      updatePositionField(index, "status", newStatus)
                    }
                  />
                </Td>
                <Td>
                  <CloseButton
                    colorScheme="red"
                    _hover={{ backgroundColor: "#E53E3E", color: "white" }}
                    onClick={() => deletePosition(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <AddPosition
          localStoragePositions={localStoragePositions}
          setLocalStoragePositions={setLocalStoragePositions}
        />
      </TableContainer>
    </VStack>
  );
};

const MarkItem = ({ type, value, onUpdate }) => {
  if (type === "status") {
    return (
      <Select
        colorScheme="blue"
        size="sm"
        value={value}
        onChange={(e) => onUpdate(e.target.value)}
        variant="filled"
        bg="#1e1e1e"
        color="white"
        borderColor="#515151"
        _hover={{ borderColor: "blue.500" }}
        _focus={{ borderColor: "blue.500" }}
        width={"150px"}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
        <option value="Email Rejected">Email Rejected</option>
      </Select>
    );
  }

  return (
    <Box>
      {value ? (
        <IconButton
          icon={<CheckIcon />}
          colorScheme="green"
          size="sm"
          zIndex={"2"}
          onClick={onUpdate}
        />
      ) : (
        <IconButton
          colorScheme="#1e1e1e"
          size="sm"
          onClick={onUpdate}
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
          zIndex={"2"}
        />
      )}
    </Box>
  );
};

const AddPosition = ({ localStoragePositions, setLocalStoragePositions }) => {
  const [newPosition, setNewPosition] = useState({
    companyName: "",
    jobTitle: "",
    jobURL: "",
    date: new Date().toLocaleDateString(),
    referral: false,
    tailoredResume: false,
    coverLetter: false,
    status: "Applied",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPosition({ ...newPosition, [name]: value });
  };

  const handleAddPosition = () => {
    const updatedPositions = [...localStoragePositions, newPosition];
    setLocalStoragePositions(updatedPositions);
    localStorage.setItem("positions", JSON.stringify(updatedPositions));
    setNewPosition({
      companyName: "",
      jobTitle: "",
      jobURL: "",
      date: new Date().toLocaleDateString(),
      referral: false,
      tailoredResume: false,
      coverLetter: false,
      status: "Applied",
    });
  };

  return (
    <Flex width={"100%"} mt={5} mb={4} justifyContent={"space-evenly"}>
      <Input
        placeholder="Company Name"
        name="companyName"
        value={newPosition.companyName}
        width={"auto"}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Job Title"
        name="jobTitle"
        value={newPosition.jobTitle}
        width={"auto"}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Job URL"
        name="jobURL"
        value={newPosition.jobURL}
        width={"auto"}
        onChange={handleInputChange}
      />
      <Button colorScheme="blue" onClick={handleAddPosition}>
        Add Position
      </Button>
    </Flex>
  );
};

export default Tracker;
