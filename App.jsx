import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      stopTimer();
    }
  }, [dice]);

  React.useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  function startTimer() {
    if (!isRunning && !tenzies) {
      setIsRunning(true);
    }
  }

  function stopTimer() {
    setIsRunning(false);
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice =>
        oldDice.map(die => (die.isHeld ? die : generateNewDie()))
      );
      startTimer();
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setTimer(0);
      setIsRunning(false);
    }
  }

  function holdDice(id) {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
    startTimer();
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="timer">⏱ {timer}s</p>
      <p className="instructions">
        {tenzies
          ? "🎉 Congratulations! You have won the game. Please click on New Game to start."
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
