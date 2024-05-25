"use client";
import React from "react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import UTCompanies from "../compnents/UTCompanies";
import Navbar from "../compnents/Navbar";
import LinkedIn from "../compnents/LinkedIn";
import Google from "../compnents/Google";
import Indeed from "../compnents/Indeed";
import Tracker from "../compnents/Tracker";
const Main = () => {
  return (
    <>
      <Navbar />
      <UTCompanies />
    </>
  );
};

export default Main;
