import React from "react";
import Navbar from "./navbar.js";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MyCard from "./card.js";

function Design() {
  return (
    <>
      <Navbar />
      <MyCard />
    </>
  );
}

export default Design;
