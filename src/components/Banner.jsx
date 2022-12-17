import styled from "styled-components";
import image from "../images/cooking6.jpg";

const Banner = () => {
  return (
    <Image>
      <Gradient />
      <img src={image} />
      <div>
        <h2>Simple and deliciouss</h2>
      </div>
    </Image>
  );
};

const Image = styled.div`
  width: 100%;
  position: relative;
  height: 35vh;
  margin-top: 4rem;
  /* background-color: red; */

  img {
    max-width: 100%;
    height: 35vh;
    overflow: hidden;
    object-fit: cover;
    border-radius: 1rem;
    width: 100%;
    background-size: cover;
  }
  div {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    h2 {
      font-family: "Poppins", sans-serif;
      color: white;
      font-weight: 500;
      font-size: 3.2rem;
      letter-spacing: 1.2rem;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }

  @media (max-width: 1300px) {
    height: 25vh;
    img {
      height: 25vh;
    }

    div {
      h2 {
        font-size: 2rem;
        font-weight: 700;
      }
    }
  }

  @media (max-width: 768px) {
    div {
      h2 {
        margin: auto 8rem;
        font-size: 2.5rem;
        font-weight: 700;
      }
    }
  }

  @media (max-width: 400px) {
    height: 20vh;
    img {
      height: 20vh;
    }
    div {
      h2 {
        margin: auto 4rem;
        font-size: 1.8rem;
        font-weight: 700;
        letter-spacing: .5rem;
      }
    }
  }
`;

const Gradient = styled.div`
  border-radius: 1rem;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
`;

export default Banner;

// Thin            100
// Extra Light     200
// Light           300
// Regular         400
// Medium          500
// Semi-Bold       600
// Bold            700
// Extra-Bold      800
// Black           900
