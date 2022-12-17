import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../Menu.scss";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Menu() {
  const [menu, setMenu] = useState();

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    const list = localStorage.getItem("menu");
    list && setMenu(JSON.parse(list));
  };

  const deleteItem = (id) => {
    var storedMenu = JSON.parse(localStorage.getItem("menu"));
    let list = storedMenu.filter((item) => item.id !== id);
    setMenu(list);
    list.length != 0
      ? localStorage.setItem("menu", JSON.stringify(list))
      : localStorage.removeItem("menu");
  };

  return (
    <motion.div
      className="container"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {menu === null || menu === undefined ? (
        <Container>Menu is empty</Container>
      ) : (
        <div className="wrap">
          {menu &&
            menu.map((recipe) => {
              return (
                <figure className="image-block" key={recipe.id}>
                  {/* <h1>{recipe.title}</h1> */}

                  <img src={recipe.image} alt={recipe.title} />
                  <figcaption>
                    <h3>{recipe.title}</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis, doloremque nisi reprehenderit eos consectetur
                      laboriosam expedita ut temporibus explicabo nostrum sunt
                      dicta dolorem laborum esse unde repudiandae nam optio
                      tempore.
                    </p>

                    <div className="btn-group">
                      <Link to={`/recipe/${recipe.id}`}>
                        <button>Details</button>
                      </Link>
                      <button
                        style={{ backgroundColor: "#eb003b" }}
                        onClick={() => deleteItem(recipe.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
        </div>
      )}
    </motion.div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 20vh;
  margin: auto;
  /* background-color: red; */
  font-size: 1.5rem;
  font-weight: 400;
`