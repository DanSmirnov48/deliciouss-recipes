import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    const list = localStorage.getItem("list");
    list && setShoppingList(JSON.parse(list));
  }, []);

  const deleteItem = (name) => {
    let list = shoppingList.filter((item) => item.originalName !== name);
    localStorage.setItem("list", JSON.stringify(list));
    setShoppingList(list);
  };

  const addItem = (e) => {
    e.preventDefault();
    let obj = { originalName: item };
    let newArr = [...shoppingList];
    newArr.push(obj);
    setShoppingList((current) => [...current, obj]);
    localStorage.setItem("list", JSON.stringify(newArr));
    setItem("");
  };

  const removeAll = () => {
    localStorage.removeItem('list')
    setShoppingList([])
  }

  return (
    <>
      <ListSection>
        <form onSubmit={addItem}>
          <h1>Add an item</h1>
          <fieldset>
            <dl>
              <dt>
                {" "}
                <label>Item name</label>
              </dt>
              <dd>
                <input
                  type="text"
                  name="item_name"
                  id="item_name"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </dd>
            </dl>
            <input type="submit" value="Add" />
          </fieldset>
        </form>
        <h1>Groceries</h1>
        {shoppingList.length > 0 ? (
          <>
            <ul>
              {shoppingList &&
                shoppingList.map((item, index) => (
                  <li key={index}>
                    <h3>{item.originalName}</h3>
                    <FaTimes
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deleteItem(item.originalName)}
                    />
                  </li>
                ))}
            </ul>
            <button onClick={removeAll}>Clear all</button>
          </>
        ) : (
          <h3>Shopping List is empty</h3>
        )}
      </ListSection>
    </>
  );
}

const ListSection = styled.div`
  ul,
  ol {
    list-style: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code {
    font-size: 1em;
  }
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  form,
  body,
  html,
  p,
  blockquote,
  fieldset,
  input,
  dl,
  dt,
  dd,
  figure,
  figcaption {
    margin: 0;
    padding: 0;
  }
  a img,
  :link img,
  :visited img,
  fieldset {
    border: none;
  }

  max-width: 400px;
  margin: 5rem auto;
  padding: 20px;
  border: 6px solid #683ef0;
  border-radius: 10px;
  background: #ffffff;
  box-sizing: border-box;

  form h1 {
    font-size: 24px;
    padding: 0 0 15px 0;
  }

  dt {
    padding: 0 0 5px 0;
  }
  dd {
    padding: 0 0 15px 0;
  }

  input, button {
    width: 100%;
    font-size: 20px;
    padding: 5px;
    border: 1px solid #cccccc;
    border-radius: 10px;
    box-sizing: border-box;
  }

  input[type="submit"], button {
    padding: 10px 0;
    color: #ffffff;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background: #683ef0;
  }


  fieldset {
    padding-bottom: 25px;
  }

  li {
    list-style: disc inside;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 0 1rem;
  }

  h1 {
    font-size: 32px;
    text-align: center;
    padding: 15px 0;
  }

  @media (max-width: 1700px) {
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 768px) {
    max-width: 600px;
    margin: 5rem auto;
    padding: 20px;

    form h1 {
      font-size: 2rem;
      padding: 0 0 15px 0;
    }

    dt {
      padding: 0 0 5px 0;
      font-size: 1.2rem;
    }

    li {
      margin: 1rem 1rem;
      h3 {
        font-size: 1.5rem;
      }
      svg {
        margin-right: 2rem;
        font-size: 2rem;
      }
    }
  }
`;
