import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ setReviewRating=null, value, enabled=false }) {
  const stars = Array(5).fill(0);
  const [currVal, setCurrVal] = useState(0);
  const [hoverVal, setHoverVal] = useState(undefined);

  useEffect(() => {
    value && setCurrVal(value)
  },[value, setCurrVal, currVal])

  const handleClick = (val) => {
    setCurrVal(val);
    setReviewRating(val)
  };

  const handleMouseOver = (val) => {
    setHoverVal(val);
  };

  const handleMouseLeave = (val) => {
    setHoverVal(undefined);
  };

  const colors = {
    orange: "#FFBA5A",
    gray: "#a9a9a9",
  };

  return (
    <>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            style={{
              marginRight: 3,
              cursor: enabled ? 'pointer' : 'default',
            }}
            color={(hoverVal || currVal) > index ? colors.orange : colors.gray}
            onClick={() => enabled && (handleClick(index + 1))}
            onMouseOver={() => enabled && (handleMouseOver(index + 1))}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </>
  );
}
