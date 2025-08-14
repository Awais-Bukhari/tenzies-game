import React from "react";

export default function Die({ value, isHeld, holdDice }) {
  const pipPositions = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [25, 75], [75, 25], [75, 75]],
    5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
    6: [[25, 25], [25, 50], [25, 75], [75, 25], [75, 50], [75, 75]]
  };

  return (
    <div
      className={`die-face ${isHeld ? "held" : ""}`}
      onClick={holdDice}
    >
      {pipPositions[value].map((pos, i) => (
        <span
          key={i}
          className="pip"
          style={{ left: `${pos[0]}%`, top: `${pos[1]}%` }}
        ></span>
      ))}
    </div>
  );
}
