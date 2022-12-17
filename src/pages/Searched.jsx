import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/Search";
import { useCookies } from "react-cookie";
import Select from "../components/Select";
import FilterSelect from "../components/FilterSelect";
import { SPOONACULAR_API_KEY } from "../utils";

export default function Searched() {
  const [serachedRecepies, setSerachedRecepies] = useState([]);
  const [serachedRecepiesNo, setSerachedRecepiesNo] = useState();
  const [diet] = useCookies(["diet"]);
  const [values, setValues] = useState();
  let params = useParams();
  let diets = [];
  let ignoredIngredients = [];

  useEffect(() => {
    values !== undefined &&
      Object.values(values).map((item) => ignoredIngredients.push(item.value));
    diet.diet !== undefined &&
      Object.values(diet.diet).forEach((item) => diets.push(item.value));

    getSearched(params.search);
    diets = [];
  }, [params.search, diet, values]);

  const getSearched = async (name) => {
    // prettier-ignore
    let str1 = ignoredIngredients.length > 0 ? `&excludeIngredients=${ignoredIngredients.join(',')}` : ''
    let str2 = diets.length > 0 ? `&diet=${diets.join(",")}` : "";
    // prettier-ignore
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        SPOONACULAR_API_KEY
        }&query=${name
        }${str1
        }${str2
        }&addRecipeInformation=true&number=12`
    );
    if (data.status === 402) {
      alert("API limit reached");
    } else {
      const recipes = await data.json();
      setSerachedRecepies(recipes.results);
      setSerachedRecepiesNo(recipes.totalResults);
    }
  };

  return (
    <>
      <Search />
      {/* prettier-ignore */}
      <Filter>
        <section className="left"></section>
        <section className="right">
          <div className="diets"><Select /></div>
          <div className="filter"><FilterSelect values={setValues} /></div>
        </section>
      </Filter>
      {serachedRecepiesNo !== undefined && serachedRecepies !== undefined ? (
        <Grid>
          {serachedRecepies &&
            serachedRecepies.map((item) => {
              return (
                <Card key={item.id}>
                  <Link to={"/recipe/" + item.id} c>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                    <div>
                      <p>Cook: {item.readyInMinutes} min</p>
                      <span>|</span>
                      <p>For: {item.servings} people</p>
                    </div>
                  </Link>
                </Card>
              );
            })}
        </Grid>
      ) : (
        <NoResults>
          <p>
            We did not find any reciepies for <strong>{params.search}</strong>.
            Please try again!
          </p>
        </NoResults>
      )}
    </>
  );
}

const Grid = styled.div`
  margin: 0.5rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-column-gap: 1.5rem;
  grid-row-gap: 2rem;
`;

const Card = styled.div`
  /* background-color: red; */
  img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: 16px 13px 8px -7px rgba(73, 73, 73, 0.7);
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: left;
    color: #494949;
    margin-left: 0.7rem;
    margin-top: 0.5rem;
  }
  div {
    margin-left: 0.7rem;
    align-items: center;
    display: flex;
  }
  p {
    font-size: 0.9rem;
  }
  span {
    font-weight: 500;
    margin: 0 0.5rem;
  }
`;

const Filter = styled.div`
  width: 100%;
  height: 7vh;
  margin: 0.5rem auto;
  /* background-color: red; */
  display: flex;

  .left {
    width: 40%;
    height: 100%;
    display: flex;
    /* background: rgba(51, 170, 51, 0.2); */
  }

  .right {
    width: 60%;
    height: 100%;
    display: flex;
    /* background-color: #ff05051c; */
    justify-content: flex-end;
    align-items: center;

    .diets {
      width: 16rem;
      margin: auto 0.5rem;
    }

    .filter {
      width: 25rem;
      margin: auto 0.5rem;
    }
  }

  @media (max-width: 1700px) {
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;

    .right {
      width: 100%;
      flex-direction: column;
      align-items: flex-end;

      .diets {
        width: 60%;
        margin: 0.5rem 0;
      }
      .filter {
        width: 60%;
        margin: 0.5rem 0;
      }
    }
  }
  @media (max-width: 400px) {
    .right {
      .diets, .filter {
        width: 100%;
      }
    }
  }
`;



const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  width: 80%;
  height: 15vh;
  /* background-color: red; */
  p {
    font-size: 1.5rem;
  }
`;
