export const initialState = {
    questions: [
      { id: 1, question: "Quelle est la capitale de la France ?", options: ["Paris", "Londres", "Berlin", "Rome"], correctAnswer: "Paris" },
      { id: 2, question: "Combien font 5 × 6 ?", options: ["30", "25", "20", "35"], correctAnswer: "30" },
      { id: 3, question: "Quel est le plus grand océan du monde ?", options: ["Pacifique", "Atlantique", "Arctique", "Indien"], correctAnswer: "Pacifique" },
      { id: 4, question: "Qui a peint la Joconde ?", options: ["Vincent van Gogh", "Pablo Picasso", "Léonard de Vinci", "Claude Monet"], correctAnswer: "Léonard de Vinci" },
      { id: 5, question: "Quelle planète est la plus proche du soleil ?", options: ["Mars", "Vénus", "Mercure", "Jupiter"], correctAnswer: "Mercure" },
    ],
    currentQuestion: 0,
    score: 0,
    timeLeft: 30, 
    isComplete: false,
  };
  
  export function quizReducer(state, action) {
    switch (action.type) {
      case "ANSWER_QUESTION":
        const isCorrect = state.questions[state.currentQuestion].correctAnswer === action.payload;
        return state.currentQuestion + 1 === state.questions.length
          ? { ...state, score: isCorrect ? state.score + 1 : state.score, isComplete: true }
          : {
              ...state,
              score: isCorrect ? state.score + 1 : state.score,
              currentQuestion: state.currentQuestion + 1,
              timeLeft: 30,
            };
  
      case "TICK":
        return {
          ...state,
          timeLeft: state.timeLeft - 1,
        };
  
      case "NEXT_QUESTION":
        return state.currentQuestion + 1 === state.questions.length
          ? { ...state, isComplete: true }
          : { ...state, currentQuestion: state.currentQuestion + 1, timeLeft: 30 };
  
      case "RESET":
        return initialState;
  
      default:
        return state;
    }
  }
  