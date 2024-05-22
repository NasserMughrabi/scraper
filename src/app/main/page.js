"use client";
import React from "react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Companies from "../compnents/Companies";
import Navbar from "../compnents/Navbar";
import LinkedIn from "../compnents/LinkedIn";
import Google from "../compnents/Google";
import Indeed from "../compnents/Indeed";
const Main = () => {
  const [component, setComponent] = useState("utah companies");

  const componentDisplay = () => {
    if (component.toLowerCase() === "utah companies") {
      return <Companies />;
    } else if (component === "linkedin listings") {
      return <LinkedIn />;
    } else if (component === "indeed listings") {
      return <Indeed />;
    } else if (component === "google jobs") {
      return <Google />;
    }
  };

  return (
    <Box>
      <Navbar setComponent={setComponent} />
      {componentDisplay()}
    </Box>
  );
};

export default Main;
