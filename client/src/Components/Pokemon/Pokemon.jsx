import React from "react";

export default function Pokemon({ name, image, types }) {
  return (
    <div>
      <h3>{name}</h3>
      <h4>
        {types &&
          types.map((type, index) => {
            return <span key={index}>{type.name}</span>;
          })}
      </h4>
      <img src={image} alt="Pokemon" width="" height="" />
    </div>
  );
}
