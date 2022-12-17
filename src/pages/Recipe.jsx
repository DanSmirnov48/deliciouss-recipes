import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Rating from "../components/Rating";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiTimerFill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../reviews.css";
import { SPOONACULAR_API_KEY, JSON_API } from "../utils";

export default function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("ingredients");
  const [img, setImg] = useState();
  const [inMenu, setInMenu] = useState();
  const [reviews, setReviews] = useState();
  const [reviewRating, setReviewRating] = useState();
  const [reviewComment, setReviewComment] = useState();
  const navigate = useNavigate();
  let params = useParams();
  var recipeId = details.id;

  useEffect(() => {
    fetcedDetails();
    fetchImage();
    isCurrItemInMenu();
    const getReviews = async () => {
      setReviews(await fetchReviews(recipeId));
    };

    getReviews();
   
  }, [params.name, inMenu, recipeId]);

  async function fetcedDetails() {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    const detailData = await data.json();
    localStorage.setItem("saved", JSON.stringify(detailData));
    setDetails(detailData);
  }

  async function fetchImage() {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/nutritionLabel.png?apiKey=${SPOONACULAR_API_KEY}`
    );

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  }

  //---------------------REVIEW----------------------------------------------
  const addtoReview = async (review) => {
    await fetch(`${JSON_API}/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(review),
    });
    setReviews(await fetchReviews(recipeId))
  };

  async function fetchReviews(id = 1) {
    const res = await fetch(`${JSON_API}/reviews/?recipe=${id}`);
    const data = await res.json();
    return data.length > 0 ? data : null;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!reviewRating) {
      alert("Please add rating");
      return;
    }
    addtoReview({
      rating: reviewRating,
      comment: reviewComment ? reviewComment : "",
      recipe: recipeId,
    });

    setReviewComment("");
  };

  //---------------------MENU--------------------------------------------------------------------

  const addToMenu = () => {
    var existingEntries = JSON.parse(localStorage.getItem("menu"));
    if (existingEntries !== null) {
      existingEntries.push(details);
      setInMenu(true);
      localStorage.setItem("menu", JSON.stringify(existingEntries));
    } else {
      existingEntries = [];
      existingEntries.push(details);
      localStorage.setItem("menu", JSON.stringify(existingEntries));
      setInMenu(true);
    }
  };

  const removeFrommenu = () => {
    var storedMenu = JSON.parse(localStorage.getItem("menu"));
    var filtered = storedMenu.filter((el) => el.id !== parseInt(params.name));
    // var filtered = storedMenu.filter(function (el) {
    //   return el.id !== parseInt(params.name);
    // });
    setInMenu(false);
    filtered.length !== 0
      ? localStorage.setItem("menu", JSON.stringify(filtered))
      : localStorage.removeItem("menu");
  };

  function isCurrItemInMenu() {
    var storedMenu = JSON.parse(localStorage.getItem("menu"));
    if (storedMenu === undefined || storedMenu === null) {
      setInMenu(false);
    } else {
      let res = storedMenu.find((item) => item.id === parseInt(params.name));
      var found = res !== undefined ? true : false;
      setInMenu(found);
    }
  }

  //---------------------SHOPPING-LIST--------------------------------------------------------------------

  const addToShoppingList = () => {

    const check = localStorage.getItem('list');
    if(check){
      let newArr = [...JSON.parse(check)];
      details.extendedIngredients.map((item) => {
        if (item.nameClean !== null) {
          newArr.push({ originalName: item.nameClean });
        }
      });
      localStorage.setItem("list", JSON.stringify(newArr));
      console.log(newArr)
    }else{
      let arr = [];
      details.extendedIngredients.map((item) => {
        if (item.nameClean !== null) {
          arr.push({ originalName: item.nameClean });
        }
      });
      localStorage.setItem("list", JSON.stringify(arr));
      console.log(arr);
    }
  };

  return (
    <>
      <Button onClick={() => navigate(-1)}>Go back</Button>

      <TopSection>
        <section className="image-section">
          <img src={details.image} alt="" />

          <div className="multi-button">
            <button onClick={inMenu ? removeFrommenu : addToMenu}>
              {inMenu ? "Remove from Menu" : "Add to Menu"}
            </button>
            <button onClick={addToShoppingList}>Add to Shopping List</button>
          </div>
        </section>
        <section className="info-section">
          <h2>{details.title}</h2>
          <h3 dangerouslySetInnerHTML={{ __html: details.summary }} />
          <div className="diets">
            {details.diets && <h4>Diets : </h4>}
            {details.diets &&
              details.diets.map((item, index) => {
                return (
                  <div key={index}>
                    <p>{item}</p>
                  </div>
                );
              })}
          </div>
          <div>
            <section>
              <AiOutlineClockCircle />
              <h4>Ready Time</h4>
              <p>{details.readyInMinutes} mim</p>
            </section>
            <section>
              <RiTimerFill />
              <h4>Cook Time</h4>
              <p>20 min</p>
            </section>
            <section>
              <MdPeopleAlt />
              <h4>Servings</h4>
              <p>{details.servings}</p>
            </section>
          </div>
        </section>
      </TopSection>

      <BottomSection>
        <Instructions>
          <h3>Instructions</h3>
          {details.analyzedInstructions !== undefined && (
            details.analyzedInstructions[0].steps.map((item) => {
              return (
                <div key={item.number}>
                  <div>
                    <span>{`Step ${item.number}`}</span>
                    <hr className="line"></hr>
                  </div>
                  <p>{item.step}</p>
                </div>
              );
            })
          )}
        </Instructions>
        <Ingredients>
          <div className="multi-button">
            <button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => {
                setActiveTab("ingredients");
              }}
            >
              Ingredients
            </button>
            <button
              className={activeTab === "nutrition" ? "active" : ""}
              onClick={() => {
                setActiveTab("nutrition");
              }}
            >
              Nutrition
            </button>
          </div>
          {activeTab === "ingredients" &&
            details.extendedIngredients &&
            details.extendedIngredients.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.original}</p>
                  <hr className="line"></hr>
                </div>
              );
            })}
          {activeTab === "nutrition" && (
            <div className="nutrition">
               {/* {fetchImage()} */}
              <img src={img} alt="" />
            </div>
          )}
        </Ingredients>
      </BottomSection>

      <ReviewSection>
        <div className="rating">
          <h4>
            {"How would you rate"} <i>{details.title} ?</i>
          </h4>
          <Rating setReviewRating={setReviewRating} enabled={true} />

          <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
              <textarea
                rows="3"
                type="text"
                placeholder="Add any comment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
        {reviews ? (
          <Splide
            options={{
              perPage: 1,
              arrows: true,
              pagination: true,
              drag: "free",
              gap: "5rem",
              breakpoints: {
                768: { pagination: false },
                400: { gap: '0', arrows: false },
              },
            }}
          >
            {reviews &&
              reviews.map((review) => {
                return (
                  <SplideSlide key={review.id}>
                    <div id="content">
                      <div className="testimonial">
                        <blockquote>
                          <h4>{review.comment}</h4>
                          <Rating value={review.rating} />
                        </blockquote>
                      </div>
                    </div>
                  </SplideSlide>
                );
              })}
          </Splide>
        ) : (
          <>
            <h1>No reviews yet</h1>
          </>
        )}
      </ReviewSection>
    </>
  );
}

const Button = styled.button`
  align-items: center;
  background-color: white;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  margin-top: 3.5rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  /* :after {
    background-color: #683ef0;
    border-radius: 8px;
    content: "";
    display: block;
    height: 48px;
    left: 0;
    width: 100%;
    position: absolute;
    top: -2px;
    transform: translate(8px, 8px);
    transition: transform 0.2s ease-out;
    z-index: -1;
  }

  :hover:after {
    transform: translate(0, 0);
  }

  :active {
    background-color: #ffdeda;
    outline: 0;
  }

  :hover {
    outline: 0;
  } */
`;

const TopSection = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;

  .active {
    background: linear-gradient(35deg, #595959, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .image-section {
    width: 40%;
    img {
      width: 95%;
      border-radius: 1rem;
      margin: 2rem 0;
      display: flex;
      overflow: hidden;
      object-fit: cover;
      background-size: cover;
      -webkit-box-shadow: 16px 13px 8px -7px rgba(73, 73, 73, 1);
      -moz-box-shadow: 16px 13px 8px -7px rgba(73, 73, 73, 1);
      box-shadow: 16px 13px 8px -7px rgba(73, 73, 73, 1);
    }

    .multi-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 95%;

      button {
        flex: 1;
        -moz-appearance: none;
        -webkit-appearance: none;
        position: relative;
        padding: 1rem 2rem;
        border: 2px solid #f2f2f2;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.8rem;
        letter-spacing: 1px;
        box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
        color: #645cff;
        background: transparent;
        overflow: hidden;
        cursor: pointer;

        &::before,
        &::after {
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          bottom: 0;
        }

        &::after {
          height: 0;
          background-color: #645cff;
          transition: height 0.5s ease;
          z-index: -1;
        }

        &::before {
          background-color: #fff;
          height: 100%;
          z-index: -2;
        }

        &:hover {
          color: #fff;
          transition: 0.1s ease;

          &::after {
            height: 100%;
          }
        }

        &:nth-of-type(1) {
          border-radius: 10px 0 0 10px;
        }

        &:nth-of-type(2) {
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }

  .info-section {
    width: 60%;
    /* background-color: green; */
    padding: 0 0 0 2rem;
    h2 {
      color: #494949;
      font-weight: 200;
      font-size: 2.5rem;
    }
    h3 {
      color: #494949;
      font-size: 1.1rem;
      line-height: 1.6;
      font-weight: 400;
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      justify-content: space-around;
      section {
        justify-content: center;
        padding: 1.5rem;
        h4 {
          font-weight: 400;
        }
        p {
          width: 100%;
          justify-content: center;
          display: flex;
          align-self: center;
          color: #645cff;
          font-weight: 450;
        }
        svg {
          /* margin-left: 1.5rem; */
          font-size: 2rem;
          color: #494949;
          width: 100%;
        }
      }
    }
    .diets {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 1rem;

      h4 {
        margin-right: 0.5rem;
        font-size: 1.1rem;
        font-weight: 500;
      }

      p {
        background: #645cff;
        border-radius: 0.25rem;
        color: white;
        padding: 0.25rem 1rem;
        /* margin: 0 0.5rem; */
        text-transform: capitalize;
        margin: 0 0.6rem 0 0;
      }
    }
  }

  @media (max-width: 1700px) {
    .image-section {
      .multi-button {
        button {
          font-weight: 500;
          padding: 1rem 1rem;
          font-size: 0.9rem;
        }
      }
    }

    .info-section {
      h2 {
        font-size: 1.5rem;
        font-weight: 500;
      }
      h3 {
        font-size: 1rem;
      }

      .diets {
        h4 {
          font-size: 1rem;
        }
      }

      div {
        section {
          svg {
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  @media (max-width: 1300px) {
    .image-section {
      .multi-button {
        button {
          font-weight: 500;
          padding: 1rem 0.2rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .image-section {
      width: 100%;
      img {
        width: 100%;
        height: 25vh;
        overflow: hidden;
        object-fit: cover;
        border-radius: 1rem;
        background-size: cover;
      }
      .multi-button {
        width: 100%;
        button {
          font-size: 1.2rem;
          padding: 0.8rem 1rem;
        }
      }
    }

    .info-section {
      width: 100%;

      h2 {
        margin-top: 2rem;
        font-size: 1.8rem;
      }
      .diets {
        h4 {
          font-size: 1.3rem;
        }
        p {
          padding: 0.25rem 1rem;
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 400px) {
    .image-section {
      .multi-button {
        flex-direction: column;
        width: 100%;
        button {
          width: 100%;
          font-size: 1.2rem;
          padding: 0.8rem 1rem;
        }
      }
    }

    .info-section {
      width: 100%;

      h2 {
        margin-top: 2rem;
        font-size: 1.8rem;
      }
      .diets {
        h4 {
          font-size: 1.3rem;
        }
        p {
          padding: 0.25rem 1rem;
          font-size: 1rem;
        }
      }
    }
  }
`;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Instructions = styled.div`
  width: 60%;

  h3 {
    margin: 0;
  }

  div {
    display: inline;
    align-items: center;
    justify-content: center;
    span {
      padding-right: 0.6rem;
      color: #683ef0;
      font-weight: 400;
      font-size: 1.3rem;
    }
    .line {
      width: 80%;
      height: 0;
      margin: 3px;
      display: inline-block;
      opacity: 0.5;
    }
  }
  p {
    font-size: 1.1rem;
    font-weight: 200;
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }
  @media (max-width: 1700px) {
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 768px) {
    width: 100%;
    p {
      font-size: 1.1rem;
      font-weight: 400;
    }
  }
`;

const Ingredients = styled.div`
  width: 35%;
  height: auto;
  h3 {
    margin: 0;
  }

  .line {
    width: 100%;
    margin: 0.4rem 0;
    opacity: 0.2;
  }
  p {
    font-size: 1rem;
    font-weight: 200;
    line-height: 1.7;
    margin-top: 0.2rem;
  }
  .multi-button {
    margin: 0 0 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;

    .active {
      color: white;
      background-color: #645cff;
    }

    button {
      flex: 1;
      -moz-appearance: none;
      -webkit-appearance: none;
      position: relative;
      padding: 1rem 2rem;
      border: 2px solid #f2f2f2;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.8em;
      letter-spacing: 1px;
      box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
      color: #645cff;
      background: transparent;
      overflow: hidden;
      cursor: pointer;

      &::before,
      &::after {
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        bottom: 0;
      }

      &::after {
        height: 0;
        background-color: #645cff;
        transition: height 0.5s ease;
        z-index: -1;
      }

      &::before {
        background-color: #fff;
        height: 100%;
        z-index: -2;
      }

      &:hover {
        color: #fff;
        transition: 0.1s ease;

        &::after {
          height: 100%;
        }
      }

      &:nth-of-type(1) {
        border-radius: 10px 0 0 10px;
      }

      &:nth-of-type(2) {
        border-radius: 0 10px 10px 0;
      }
    }
  }

  .nutrition {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
  }

  @media (max-width: 1700px) {
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 768px) {
    margin-top: 2rem;
    width: 100%;
    height: auto;
    p {
      font-size: 1.1rem;
      font-weight: 400;
    }
  }
`;

const ReviewSection = styled.div`
  margin: 3rem 0 5rem 0;

  .rating {
    /* background-color: red; */
    margin: 4rem 0;
    display: block;
    padding: 1.5rem 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 1rem;

    h4 {
      font-size: 1rem;
      font-weight: 300;
      padding-bottom: 1rem;
      i {
        font-weight: 500;
        margin-right: 1rem;
      }
    }

    .form-control textarea {
      width: 100%;
      height: 80px;
      padding: 0.5rem;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      background-color: #f8f8f8;
      font-size: 16px;
      resize: none;
    }

    .btn {
      appearance: none;
      background-color: #494949;
      border: 1px solid rgba(27, 31, 35, 0.15);
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      display: block;
      font-size: 14px;
      font-weight: 400;
      padding: 6px 16px;
      margin: 0.5rem 0;
      position: relative;
      text-align: center;
      text-decoration: none;
    }
  }

  @media (max-width: 1700px) {
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 400px) {
  }
`;
