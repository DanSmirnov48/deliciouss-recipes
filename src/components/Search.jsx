import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search({navTo='/searched/'}) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(navTo + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0rem 15rem;

  div {
    width: 100%;
    position: relative;
    margin-top: 4rem;
  }

  input {
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #595959, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }


  @media (max-width: 1300px) {
    margin: 0rem 10rem;
  }

  @media (max-width: 768px) {
    margin: 0rem 1rem;
  }
`;
