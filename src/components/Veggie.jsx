import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { SPOONACULAR_API_KEY } from "../utils";

export default function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      console.log(data);
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  return (
    <>
      <Wrapper>
        <h3>Vegeterian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
            breakpoints: {
              1600: { perPage: 3, gap: '1rem' },
              1300: { perPage: 2, gap: '1rem' },
              768 : { perPage: 1, gap: '1rem', arrows: true}
            }
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"./recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;

  @media (max-width: 1300px) {
    h3{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 768px) {
    h3{
      margin: 0;
    }
  }

  @media (max-width: 400px) {
    h3{
      font-size: 1.6rem;
    }
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
    font-family: 'Poppins', sans-serif;
    color: white;
    font-weight: 500;
    letter-spacing: .07rem;
    font-size: 1.4rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;

// Thin            100     
// Extra Light     200
// Light           300
// Regular         400
// Medium          500
// Semi-Bold       600
// Bold            700
// Extra-Bold      800
// Black           900