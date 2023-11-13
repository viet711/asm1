import React, { useState } from "react";
import Card from "./Card";
import { cardsData } from "../cards";

function Game() {
  const [cardsState, setCardsState] = useState(cardsData);
  const [firstCard, setFirstCard] = useState(null);
  const [secondClick, setSecondClick] = useState(false);
  const [wait, setWait] = useState(false);
 

  const resetGame = () => {
    setCardsState(cardsData.map((card) => ({ ...card, isFlipped: false, passed: false })));
    setFirstCard(null); // reset trạng thái về null
    setSecondClick(false); // reset onclick trạng thái về false
    setWait(false); // reset onclick 
  };



  const checker = (card) => {
    if (card.name === firstCard.name) {
      console.log("abc");
      card.passed = true;
      firstCard.passed = true;
      changeCardStatusHandler(card);
      changeCardStatusHandler(firstCard);
    } else {
      setWait(true);
      setTimeout(() => {
        changeCardStatusHandler(card);
        changeCardStatusHandler(firstCard);
        setWait(false);
      }, 1500);
    }
  };

  const changeCardStatusHandler = (clickedCard) => {
    if (!clickedCard.passed) {
      clickedCard.isFlipped = !clickedCard.isFlipped;
      const index = cardsState.findIndex((card) => card.id === clickedCard.id);
      const newState = [...cardsState];
      newState.splice(index, 1, clickedCard);
      setCardsState(newState);
    }
  };

  const handleClick = (e, clickedCard) => {
    if (wait) {
      return;
    }
    if (!secondClick) {
      setFirstCard(clickedCard);
      setSecondClick(true);
      changeCardStatusHandler(clickedCard);
    } else {
      setSecondClick(false);
      changeCardStatusHandler(clickedCard);
      checker(clickedCard);
      setFirstCard(null);
    }
  };

  return (
    <section className="memory-game">
            <button className="w-7 h-3 mb-8" onClick  ={resetGame}>Reset</button>

      {cardsState?.map((card) => (
        <Card key={card.id} card={card} onClick={(e) => handleClick(e, card)} />
      ))}
    </section>
  );
}

export default Game;
