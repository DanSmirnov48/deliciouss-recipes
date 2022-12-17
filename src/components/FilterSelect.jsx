import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from 'react-select/animated';
import { components } from "react-select";

const FilterSelect = ({values}) => {
  const animatedComponents = makeAnimated();
  
  const createOption = (label) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1).replace(/\W/g, ""),
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const defaultOptions = [
    createOption("Milk"),
    createOption("Egg"),
    createOption("Peanut"),
    createOption("Soy"),
    createOption("Wheat"),
    createOption("Fish"),
  ];
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState([]);

  useEffect(() => {

    values(value)
  }, [options, value, values, setValue]);


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

  const handleCreate = (inputValue) => {
    const newOption = createOption(inputValue);
    setOptions((prev) => [...prev, newOption]);
    setValue((prev) => [...prev, newOption]);
  };

  return (
    <CreatableSelect
      options={options}
      placeholder="Ingredients to ingnore. Type to add more!"
      isMulti
      closeMenuOnSelect={false}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      value={value}
      isClearable
      components={animatedComponents}
      // components={{
      //   Option,
        
      // }}
      allowSelectAll={true}
    />
  );
};

export default FilterSelect;
