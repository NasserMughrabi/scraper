"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import LinkedIn from "../compnents/sources/LinkedIn";
import Navbar from "../compnents/Navbar";

const page = () => {
  return (
    <Box>
      <Navbar />
      <LinkedIn />
    </Box>
  );
};

export default page;
