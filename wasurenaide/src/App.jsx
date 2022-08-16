import React, { useState, useEffect } from "react";
import Card from "./components/Card";

import "./App.css";

import CardOne from "./assets/arrow.svg";
import CardTwo from "./assets/ruby.svg";
import CardThree from "./assets/diamond.svg";
import CardFour from "./assets/potion.svg";
import CardFive from "./assets/sword.svg";
import CardSix from "./assets/shield.svg";
import CardSeven from "./assets/spear.svg";
import CardEight from "./assets/boot.svg";

const cardImages = [
  { src: CardOne, matched: false },
  { src: CardTwo, matched: false },
  { src: CardThree, matched: false },
  { src: CardFour, matched: false },
  { src: CardFive, matched: false },
  { src: CardSix, matched: false },
  { src: CardSeven, matched: false },
  { src: CardEight, matched: false },
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle card selection
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increment turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start game on page load
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Wasurenaide</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
