import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import { RAPID_API_KEY } from "../utils";
import styled from "styled-components";

const Nutrition = () => {
  const [nutrition, setNutrition] = useState({});
  const params = useParams();
  const searched = params.name;

  useEffect(() => {
    searched && getSearched(searched);
  }, [searched]);

  const getSearched = async (name) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
      },
    };

    const res = await fetch(
      `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${name}`,
      options
    );
    const nutrition = await res.json();
    if (nutrition.items.length > 0) {
      setNutrition(nutrition.items[0]);
    } else {
      setNutrition(null);
    }
  };

  return (
    <>
      <Search navTo={"/nutrition/"} />
      <Container>
        {nutrition !== null ? (
          <div>
            <h3>Food : {nutrition.name}</h3>
            {/* prettier-ignore */}
            <ul>
            <li>Serving size: {nutrition.serving_size_g} g</li>
            <li>Calories per serving: {nutrition.calories}</li>
            <li>Sugar content per serving: {nutrition.sugar_g} g</li>
            <li>Total fat content per serving: {nutrition.fat_total_g} g</li>
            <li>Saturated fat content per serving: {nutrition.fat_saturated_g}g</li>
            <li>Protein content per serving: {nutrition.protein_g}g</li>
            <li>Total carbohydrates per serving: {nutrition.carbohydrates_total_g}g</li>
            <li>Fiber per serving: {nutrition.fiber_g}g</li>
            <li>Sodium per serving: {nutrition.sodium_mg}mg</li>
            <li>Potassium per serving: {nutrition.potassium_mg}mg</li>
            <li>Cholesterol per serving:{nutrition.cholesterol_mg}mg</li>
          </ul>
          </div>
        ) : (
          <div className="no-results">
            <p>
              Did not find any results for <strong>{params.name}</strong>!
            </p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Nutrition;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: auto;
  margin: auto;
  flex-direction: column;

  ul {
    list-style: none;
    line-height: 2rem;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    
  }
`;
