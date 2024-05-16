import React from "react";
import { Box } from "@chakra-ui/react";
import Companies from "../compnents/Companies"
import Navbar from "../compnents/Navbar"
const Main = () => {
  return (
    <Box>
      <Navbar />
      <Companies />
    </Box>
  );
};

export default Main;
