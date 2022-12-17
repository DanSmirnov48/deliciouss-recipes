import React from "react";
import Home from "./Home";
import Menu from "./Menu";
import Nutrition from "./Nutrition";
import ShoppingList from "./ShoppingList";
import { Route, Routes, useLocation } from "react-router-dom";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

export default function Pages() {
  const location = useLocation();
  return (
    <MainContainer>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} /> 
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/recipe/:name" element={<Recipe />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/:name" element={<Nutrition />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shopping-list" element={<ShoppingList/>} />
        </Routes>
      </AnimatePresence>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin: 0 20%;

  @media (max-width: 1700px) {
    margin: 0 15%;
  }

  @media (max-width: 1300px) {
    margin: 0 10%;
  }

  @media (max-width: 768px) {
    margin: 0 5%;
  }
`