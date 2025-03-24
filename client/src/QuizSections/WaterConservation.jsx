import React, { useState, useEffect } from "react";
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarGroup, SidebarTrigger } from "../Components/ui/sidebar";
import { Button } from "../Components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { useQuiz } from "../Context/QuizContext";
import { useNavigate } from "react-router-dom";

const questions = [
  { id: 1, question: "What is the main goal of water conservation?", options: ["Increase water pollution", "Reduce water wastage", "Use more water", "Drain water into the ocean"], answer: "Reduce water wastage" },

  { id: 2, question: "Which of the following is a simple way to conserve water at home?", options: ["Leaving taps open", "Fixing leaks", "Using more detergent", "Taking long showers"], answer: "Fixing leaks" },

  { id: 3, question: "Which method helps in reducing water loss in agriculture?", options: ["Flood irrigation", "Drip irrigation", "Overwatering crops", "Using excess fertilizers"], answer: "Drip irrigation" },

  { id: 4, question: "What is an effective way to conserve water in industries?", options: ["Dumping waste into rivers", "Recycling wastewater", "Using fresh water for all processes", "Running taps continuously"], answer: "Recycling wastewater" },

  { id: 5, question: "Which of the following household appliances can help in water conservation?", options: ["Regular showerheads", "Low-flow toilets", "Leaking taps", "Open drains"], answer: "Low-flow toilets" },

  { id: 6, question: "Which practice is NOT considered water conservation?", options: ["Watering plants in the early morning", "Using rainwater for gardening", "Leaving sprinklers on all day", "Collecting runoff water"], answer: "Leaving sprinklers on all day" },

  { id: 7, question: "How can planting trees help in water conservation?", options: ["Increasing water runoff", "Reducing soil erosion and retaining groundwater", "Blocking rainfall", "Consuming all available water"], answer: "Reducing soil erosion and retaining groundwater" },

  { id: 8, question: "Which of these is a government initiative for water conservation?", options: ["Rainwater harvesting schemes", "Dumping industrial waste into rivers", "Building more dams to waste water", "Encouraging groundwater overuse"], answer: "Rainwater harvesting schemes" },

  { id: 9, question: "What is greywater recycling?", options: ["Reusing water from sinks, showers, and washing machines", "Collecting rainwater", "Purifying seawater", "Draining used water into rivers"], answer: "Reusing water from sinks, showers, and washing machines" },

  { id: 10, question: "What is the best way to reduce water usage in gardening?", options: ["Watering plants at noon", "Using a drip irrigation system", "Overwatering plants", "Removing soil cover"], answer: "Using a drip irrigation system" }
];


export default function WaterConservation() {

  const sectionId = "waterconservation";  // 🔹 Unique identifier for this quiz section

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const usermail = user?.email || "Unknown User";

  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const {
    score, setScore,
    currentQuestion, setCurrentQuestion,
    answeredQuestions, setAnsweredQuestions,
    selectedOption, setSelectedOption,
  } = useQuiz();

  // Ensure `currentQuestion` and `answeredQuestions` exist for this section
  const sectionCurrentQuestion = currentQuestion[sectionId] ?? 0;
  const sectionAnsweredQuestions = answeredQuestions[sectionId] || [];

  // Persist state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
    localStorage.setItem("score", JSON.stringify(score));
  }, [currentQuestion, answeredQuestions, score]);

  // Function to confirm answer and update score
  const handleConfirmAnswer = () => {
    if (selectedOption === questions[sectionCurrentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setIsAnswerConfirmed(true);
  };

  // Function to move to the next question

  const handleNextQuestion = () => {
    // Store the answered question
    setAnsweredQuestions((prev) => ({
      ...prev,
      [sectionId]: [...sectionAnsweredQuestions, sectionCurrentQuestion],
    }));

    setIsAnswerConfirmed(false);
    setSelectedOption(null);

    if (sectionCurrentQuestion + 1 < questions.length) {
      // Move to the next question
      setCurrentQuestion((prev) => ({
        ...prev,
        [sectionId]: sectionCurrentQuestion + 1,
      }));
    } else {
      // 🔹 Mark quiz as completed
      setCurrentQuestion((prev) => ({
        ...prev,
        [sectionId]: questions.length, // Prevents further questions
      }));

      // 🔹 Store completion in localStorage
      localStorage.setItem(`quizCompleted_${sectionId}`, "true");

      setTimeout(() => {
        updateUserScore(score);
        navigate("/");  // Redirect to the main page or results page
      }, 5000);
    }
  };

  // 🌊 Water Ripple Effect
  const handleMouseMove = (e) => {
    const newRipple = {
      id: Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  const updateUserScore = async (newScore) => {
    if (!usermail) return;

    try {
      const response = await fetch("https://aqua-sense.onrender.com/api/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: usermail,
          score: newScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update score");
      }
      console.log("Score updated successfully!");
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };


  return (
    <>
      <SidebarProvider>
        <div className="relative flex h-screen w-full bg-gradient-to-r from-blue-100 to-cyan-200 overflow-hidden" onMouseMove={handleMouseMove}>
          {/* Water Ripple Effects */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          ))}

          {/* Sidebar */}
          <Sidebar className="bg-gradient-to-b from-indigo-400 to-blue-500 text-white flex flex-col h-screen rounded-r-3xl shadow-lg">
            <SidebarHeader className="p-4 text-center">
              <h2 className="text-2xl font-bold text-black">🌊 Water Conservation</h2>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-hidden p-3">
              <SidebarGroup>
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => index === sectionCurrentQuestion ? setCurrentQuestion(prev => ({ ...prev, [sectionId]: index })) : null}
                    className={`w-full text-left py-3  px-5 mb-5 flex items-center space-x-3 rounded-lg transition-all text-base font-semibold shadow-md
        ${index === sectionCurrentQuestion ? "bg-yellow-400 text-black scale-105 shadow-lg" :
                        (Array.isArray(sectionAnsweredQuestions) && sectionAnsweredQuestions.includes(index))
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-gray-400 text-gray-900 cursor-not-allowed"}`}
                    disabled={Array.isArray(sectionAnsweredQuestions) && sectionAnsweredQuestions.includes(index)}
                  >
                    {index === sectionCurrentQuestion ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    <span>Question {index + 1}</span>
                  </button>
                ))}
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Question Content */}
          <main className="flex-1 flex flex-col justify-center items-center p-8 text-center bg-blue-100">
            <div className="max-w-3xl p-8 bg-white shadow-2xl rounded-3xl w-full flex flex-col justify-between h-[75vh] border-4 border-yellow-400">
              {sectionCurrentQuestion < questions.length ? (
                <h1 className="text-3xl font-bold text-blue-700">
                  {questions[sectionCurrentQuestion]?.question || "Loading..."}
                </h1>
              ) : (
                <h1 className="text-3xl font-bold text-green-600 animate-bounce">
                  🎉 Congratulations! You have completed the quiz! 🎉
                </h1>
              )}

              <div className="flex flex-col space-y-4 w-[400px] justify-center mx-auto">
                {questions[sectionCurrentQuestion] ? (
                  questions[sectionCurrentQuestion].options.map((option) => {
                    let btnClass = "bg-blue-500 text-white hover:bg-blue-700 scale-105 transition-all";

                    if (isAnswerConfirmed) {
                      if (option === questions[sectionCurrentQuestion].answer) {
                        btnClass = "bg-green-400 text-white scale-105 shadow-md";
                      } else if (option === selectedOption) {
                        btnClass = "bg-red-500 text-white scale-105 shadow-md";
                      } else {
                        btnClass = "bg-gray-400 text-white opacity-70";
                      }
                    } else if (selectedOption === option) {
                      btnClass = "bg-blue-700 text-white scale-110 shadow-lg";
                    }

                    return (
                      <Button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`w-full py-3 text-lg rounded-2xl font-semibold transition-all ${btnClass}`}
                        disabled={isAnswerConfirmed}
                      >
                        {option}
                      </Button>
                    );
                  })
                ) : (
                  <p className="text-red-500 text-lg font-semibold">⚠️ No question found!</p>
                )}
              </div>

              {/* Confirm & Next Buttons */}
              <div className="flex justify-between items-center w-full mt-5">
                <Button
                  onClick={handleConfirmAnswer}
                  className={`py-3 px-6 text-base rounded-xl font-semibold transition-all shadow-md ${selectedOption ? "bg-green-600 text-white hover:bg-green-700 scale-105" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                  disabled={!selectedOption || isAnswerConfirmed}
                >
                  Confirm
                </Button>

                {isAnswerConfirmed && (
                  <Button
                    onClick={handleNextQuestion}
                    className="py-3 px-6 text-base bg-yellow-500 text-white rounded-xl font-semibold transition-all shadow-md hover:bg-yellow-600 scale-105"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </main>
          <footer className="bg-transparent hover:bg-transparent absolute bottom-3 right-3 animate-bounce">
            <SidebarTrigger className="hover:bg-transparent" />
          </footer>
        </div>
      </SidebarProvider>

      {/* CSS for Ripple Effect */}
      <style>{`
          .ripple {
            width: 40px;
            height: 40px;
            background: rgba(173, 216, 230, 0.4);
            border-radius: 50%;
            position: absolute;
            opacity: 0.8;
            animation: ripple-effect 1s ease-out forwards;
          }
  
          @keyframes ripple-effect {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            50% {
              transform: scale(2);
              opacity: 0.4;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }
        `}</style>
    </>
  );
}
