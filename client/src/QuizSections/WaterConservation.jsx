import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarGroup } from "../Components/ui/sidebar";
import { Button } from "../Components/ui/button";
import { Lock, Unlock } from "lucide-react";

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


export default function WaterConservation
  () {

  const user = JSON.parse(localStorage.getItem("user"));
  const usermail = user.email;
  // console.log(user.email);


  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return parseInt(localStorage.getItem("currentQuestion")) || 0;
  });

  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("answeredQuestions")) || [];
  });

  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem("score")) || 0;
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
    localStorage.setItem("score", score);
  }, [currentQuestion, answeredQuestions, score]);


  useEffect(() => {
    if (answeredQuestions.length === questions.length) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2500);
    }
  }, [answeredQuestions]);

  const handleConfirmAnswer = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      const newScore = score + 1; // ✅ Correctly calculate the new score
      setScore(newScore);
      updateUserScore(newScore);  // ✅ Update score immediately in DB
    }
    setIsAnswerConfirmed(true);
  };

  const handleNextQuestion = () => {
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    setIsAnswerConfirmed(false);
    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
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
      const response = await fetch("http://localhost:5000/api/update-score", {
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
      {isExploding && (
        <ConfettiExplosion
          particleCount={500}
          colors={["#B2EBF2", "#81D4FA", "#4FC3F7", "#29B6F6"]}
          width={2000}
          zIndex={100}
          force={0.9}
          duration={3000}
        />
      )}

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
          <Sidebar className="w-80 bg-gradient-to-b from-indigo-400 to-blue-500 text-white flex flex-col h-screen rounded-r-3xl shadow-lg">
            <SidebarHeader className="p-6 text-center">
              <h2 className="text-3xl font-extrabold text-black">🌊 Water Conservation</h2>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-hidden p-4">
              <SidebarGroup>
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => index === currentQuestion ? setCurrentQuestion(index) : null}
                    className={`w-full text-left py-3 px-5 mb-4 flex items-center space-x-4 rounded-xl transition-all text-lg font-bold shadow-md
                    ${index === currentQuestion ? "bg-yellow-400 text-black scale-105 shadow-lg" :
                        answeredQuestions.includes(index) ? "bg-green-500 text-white cursor-not-allowed" : "bg-gray-400 text-gray-900 cursor-not-allowed"}
                  `}
                    disabled={answeredQuestions.includes(index)}
                  >
                    {index === currentQuestion ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    <span>Question {index + 1}</span>
                  </button>

                ))}
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Question Content */}
          <main className="flex-1 flex flex-col justify-center items-center p-10 text-center bg-blue-100">
            <div className="max-w-3xl p-10 bg-white shadow-2xl rounded-3xl w-full flex flex-col justify-between h-[80vh] border-4 border-yellow-400">
              <h1 className="text-4xl font-extrabold text-center text-blue-700">{questions[currentQuestion].question}</h1>

              <div className="flex flex-col space-y-6 w-[450px] justify-center mx-auto">
                {questions[currentQuestion].options.map((option) => {
                  let btnClass = "bg-blue-500 text-white hover:bg-blue-700 scale-105 transition-all";
                  if (isAnswerConfirmed) {
                    if (option === questions[currentQuestion].answer) {
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
                    <Button key={option} onClick={() => setSelectedOption(option)} className={`w-full py-5 text-xl rounded-3xl font-bold transition-all ${btnClass}`} disabled={isAnswerConfirmed}>
                      {option}
                    </Button>
                  );
                })}
              </div>
              {/* Confirm & Next Buttons */}
              <div className="flex justify-between items-center w-full mt-6">
                <Button
                  onClick={handleConfirmAnswer}
                  className={`py-4 px-8 text-lg rounded-2xl font-bold transition-all shadow-lg ${selectedOption ? "bg-green-600 text-white hover:bg-green-700 scale-105" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                  disabled={!selectedOption || isAnswerConfirmed}
                >
                  Confirm
                </Button>

                {isAnswerConfirmed && (
                  <Button
                    onClick={handleNextQuestion}
                    className="py-4 px-8 text-lg bg-yellow-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:bg-yellow-600 scale-105"
                  >
                    Next Question
                  </Button>
                )}
              </div>

            </div>

          </main>
        </div>
      </SidebarProvider>

      {/* CSS for Ripple Effect */}
      <style jsx>{`
        .ripple {
          width: 10px;
          height: 10px;
          background: rgba(173, 216, 230, 0.4);
          border-radius: 50%;
          position: absolute;
          opacity: 0.6;
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
