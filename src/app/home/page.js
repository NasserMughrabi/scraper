"use client";
import React from "react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import UTCompanies from "../compnents/sources/UTCompanies";
import Navbar from "../compnents/Navbar";
import LinkedIn from "../compnents/sources/LinkedIn";
import Google from "../compnents/sources/Google";
import Indeed from "../compnents/sources/Indeed";
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
