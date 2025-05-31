import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/jaddu.png", matched: false },
  { src: "/img/dhoni.png", matched: false },
  { src: "/img/ruthuraj.png", matched: false },
  { src: "/img/pathirana.png", matched: false },
  { src: "/img/rachin.png", matched: false },
  { src: "/img/aswin.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setGameOver(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          );
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    if (allMatched) {
      setGameOver(true);
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory Match</h1>
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <button onClick={shuffleCards}>New Game</button>
        </div>
      )}

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      {!gameOver && <p>Turns: {turns}</p>}
    </div>
  );
}

export default App;
