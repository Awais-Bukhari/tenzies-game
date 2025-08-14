import { useState, useEffect } from "react";
import "./Timer.css";

export default function Timer({ isRunning, resetSignal }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setTime(0);
  }, [resetSignal]);

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  return (
    <div className="timer">
      ⏱ {formatTime(time)}
    </div>
  );
}
