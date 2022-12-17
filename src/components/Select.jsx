import React, { useEffect } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { useCookies } from "react-cookie";

export default function Select() {
  const [diet, setDiet] = useCookies(["diet"]);

  useEffect(() => {
    setDiets();
  }, [setDiet]);

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const setDiets = (val) => {
    if (val) {
      var arr = [];
      for (const [key, value] of Object.entries(val)) {
        arr.push(value);
      }

      setDiet("diet", arr, {
        expires: new Date("01 01 2030"),
      });
      // setSelected(arr)
    }
  };

  const options = [
    { value: "gluten-free", label: "Gluten Free" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
  ];

  return (
    <ReactSelect
      value={diet ? diet.diet : null}
      options={options}
      placeholder="My diets"
      isMulti
      closeMenuOnSelect={true}
      hideSelectedOptions={false}
      onChange={(choice) => setDiets(choice)}
      components={{
        Option,
      }}
      allowSelectAll={true}
    />
  );
}