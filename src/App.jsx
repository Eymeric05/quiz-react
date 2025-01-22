import React, { useReducer, useEffect } from "react";
import "./App.css";
import { quizReducer, initialState } from "./quizReducer";

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, timeLeft, score, isComplete } = state;

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      dispatch({ type: "NEXT_QUESTION" });
    }
  }, [timeLeft, isComplete]);

  const handleAnswer = (answer) => {
    dispatch({ type: "ANSWER_QUESTION", payload: answer });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="App">
      {isComplete ? (
        <div className="result">
          <h1>Quiz terminé !</h1>
          <p>Votre score est de : {score} / {questions.length}</p>
          <button onClick={handleReset}>Recommencer</button>
        </div>
      ) : (
        <div className="quiz">
          <h1>Quiz</h1>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="info">
            <p>Temps restant : {timeLeft}s</p>
            <p>Score actuel : {score}</p>
          </div>
        </div>
      )}
    </div>
  );
}
