import { createContext, useContext, useState, useEffect } from "react";

// Create a context
const QuizContext = createContext();

// Provide state globally
export const QuizProvider = ({ children }) => {
  // Retrieve and parse localStorage safely
  const getFromLocalStorage = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  // Store user details
  const [user, setUser] = useState(() => getFromLocalStorage("user", null));

  // Store user score
  const [score, setScore] = useState(() => getFromLocalStorage("score", 0));

  // Store answered questions per section (object)
  const [answeredQuestions, setAnsweredQuestions] = useState(() =>
    getFromLocalStorage("answeredQuestions", {})
  );

  // Store current question index per section
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    getFromLocalStorage("currentQuestion", {})
  );

  // Store selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
  }, [user, score, answeredQuestions, currentQuestion]);

  return (
    <QuizContext.Provider
      value={{
        user,
        setUser,
        score,
        setScore,
        answeredQuestions,
        setAnsweredQuestions,
        currentQuestion,
        setCurrentQuestion,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use context
export const useQuiz = () => useContext(QuizContext);
