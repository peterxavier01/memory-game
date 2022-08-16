import React from "react";

import Cover from "../assets/question.svg";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleSelection = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="card-front" />
        <img
          src={Cover}
          alt="card cover"
          className="card-cover"
          onClick={handleSelection}
        />
      </div>
    </div>
  );
};

export default Card;
